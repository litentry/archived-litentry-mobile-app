import React from 'react';
import {View, StyleSheet, Linking, ScrollView, Dimensions} from 'react-native';
import * as yup from 'yup';
import {useWeb3Wallet, TxResult} from 'context/Web3WalletContext';
import {useNetwork} from '@atoms/network';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {SuccessAnimation} from '@ui/components/SuccessAnimation';
import {MessageTeaser} from '@ui/components/MessageTeaser';
import {SelectAccount} from '@ui/components/SelectAccount';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {decimalKeypad} from 'src/utils';
import {Text, Card, Button, Icon, TextInput, useBottomSheet, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {useTransactionWizard, WizardStep} from './TransactionWizard';
import {WalletConnectButton} from './WalletConnectButton';
import {toShortAddress} from 'src/utils/address';

const {height} = Dimensions.get('window');

export function TokenMigrationScreen() {
  const {colors} = useTheme();
  const wallet = useWeb3Wallet();
  const {currentNetwork} = useNetwork();
  const {formatBalance, stringToBn} = useFormatBalance();
  const {TransactionWizard, currentStep, nextStep, resetWizard} = useTransactionWizard();
  const {openBottomSheet: openPreview, closeBottomSheet: closePreview, BottomSheet: Preview} = useBottomSheet();

  const [isRequestingPermission, setIsRequestingPermission] = React.useState(false);
  const [isRequestingTransfer, setIsRequestingTransfer] = React.useState(false);
  const [destinationAddress, setDestinationAddress] = React.useState('');
  const [txHash, setTxHash] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const maxAmount = wallet.isConnected ? wallet.connectedAccount?.balance.lit.toNumber() ?? 0 : 0;

  const retry = React.useCallback(() => {
    setIsRequestingPermission(false);
    setIsRequestingTransfer(false);
    setError(null);
  }, []);

  const requestPermission = React.useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('The wallet must be connected to call this method');
    }
    const ethAddress = wallet.connectedAccount?.address;
    if (!ethAddress) {
      throw new Error('No account connected');
    }

    setIsRequestingPermission(true);

    const result = await Promise.race([wallet.approveForMigration(ethAddress), timeoutPromise]);

    if (result?.ok) {
      wallet.updateAccount(ethAddress);
    }
    if (result?.error) {
      setError(result.error);
      return;
    }
    nextStep(WizardStep.RequestTransfer);
    setIsRequestingPermission(false);
  }, [wallet, nextStep]);

  const requestTransfer = React.useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('The wallet must be connected to call this method');
    }
    const ethAddress = wallet.connectedAccount?.address;

    if (!ethAddress) {
      throw new Error('No account connected');
    }

    setIsRequestingTransfer(true);

    const result = await Promise.race([
      wallet.depositForMigration(ethAddress, Number(amount), destinationAddress),
      timeoutPromise,
    ]);

    if (result?.ok) {
      wallet.updateAccount(ethAddress);
      setTxHash(result.ok);
    }
    if (result?.error) {
      setError(result.error);
      return;
    }
    nextStep(WizardStep.Completed);
    setIsRequestingTransfer(false);
  }, [wallet, nextStep, amount, destinationAddress]);

  const renderPreviewHeader = React.useCallback(() => {
    return (
      <View style={styles.previewHeaderContainer}>
        <Text variant="titleLarge">Transaction summary</Text>
        <View style={globalStyles.rowAlignCenter}>
          <Text>Ethereum</Text>
          <Padder scale={0.5} />
          <Icon name="swap-horizontal" size={25} />
          <Padder scale={0.5} />
          <Text>{currentNetwork.name}</Text>
        </View>
      </View>
    );
  }, [currentNetwork.name]);

  const renderPreviewContent = () => {
    if (!wallet.isConnected) {
      return null;
    }

    return (
      <>
        <TransactionWizard />
        <Padder />
        {currentStep === WizardStep.Completed ? (
          <TransactionCompleted
            txHash={txHash}
            onPress={() => {
              closePreview();
              resetWizard();
            }}
          />
        ) : (
          <View style={[{backgroundColor: colors.surface}, styles.summaryContainer]}>
            <View style={styles.summaryRow}>
              <Text variant="titleMedium">Amount</Text>
              <Text>{formatBalance(stringToBn(amount?.toString()))}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Text variant="titleMedium">Source</Text>
              <Text>{toShortAddress(wallet.connectedAccount?.address ?? '')}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Text variant="titleMedium">Destination</Text>
              <Text>{toShortAddress(destinationAddress)}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Text variant="titleMedium">LIT Balance</Text>
              <Text>{formatBalance(stringToBn(wallet.connectedAccount?.balance.lit.toString() ?? ''))}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Text variant="titleMedium">ETH Balance</Text>
              <Text>{`${wallet.connectedAccount?.balance.eth.toFixed(4)} ETH` ?? ''}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Text variant="titleMedium">New LIT Balance in Ethereum</Text>
              <Text>
                {formatBalance(stringToBn(wallet.connectedAccount?.balance.lit.minus(amount).toString() ?? ''))}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const renderPreviewButton = () => {
    if (error) {
      return null;
    }
    if (currentStep === WizardStep.RequestPermission) {
      return (
        <Button loading={isRequestingPermission} mode="contained" onPress={requestPermission}>
          Request permission
        </Button>
      );
    }
    if (currentStep === WizardStep.RequestTransfer) {
      return (
        <Button loading={isRequestingTransfer} mode="contained" onPress={requestTransfer}>
          Request transfer
        </Button>
      );
    }
    return (
      <Button
        onPress={() => {
          closePreview();
          resetWizard();
        }}>
        Close
      </Button>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView>
        <Card mode="outlined">
          <Card.Title title={`From Ethereum to ${currentNetwork.name}`} subtitle="Via ERC-20 Token Standard" />
          <Card.Content>
            <Text variant="titleMedium">From Account</Text>
            {!wallet.isConnected ? (
              <View style={{marginVertical: standardPadding}}>
                <WalletConnectButton title="Connect Wallet" onPress={() => wallet.connect()} />
              </View>
            ) : (
              <View>
                <TextInput
                  left={<TextInput.Icon name="check-network-outline" color={colors.primary} />}
                  mode="outlined"
                  value={toShortAddress(wallet.connectedAccount?.address ?? '')}
                  editable={false}
                />
                <View style={styles.disconnectWalletContainer}>
                  <Button compact onPress={() => wallet.disconnect()}>
                    Disconnect Wallet
                  </Button>
                </View>
              </View>
            )}
            <Text variant="titleMedium">Destination</Text>
            <SelectAccount onSelect={(selectedAccount) => setDestinationAddress(selectedAccount.account.address)} />
            <Padder scale={0.5} />
            <Text variant="titleMedium">Amount</Text>
            <TextInput
              value={amount}
              mode="outlined"
              keyboardType="decimal-pad"
              placeholder="Enter amount"
              autoComplete="off"
              right={<TextInput.Affix text={formatBalance(stringToBn(amount?.toString()))} />}
              onChangeText={(_amount) => {
                setAmount(decimalKeypad(_amount));
              }}
              error={wallet.isConnected && amount !== '' && !isAmountValid(maxAmount, Number(amount))}
            />
            {wallet.isConnected ? (
              <View style={styles.balance}>
                <Text variant="bodySmall">
                  Balance: {formatBalance(stringToBn(wallet.connectedAccount?.balance.lit.toString() || '0'))}
                </Text>
              </View>
            ) : null}
            <Padder scale={2} />
            <Button
              mode="contained"
              compact
              onPress={openPreview}
              disabled={!wallet.isConnected || !destinationAddress || !isAmountValid(maxAmount, Number(amount))}>
              Preview
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Preview>
        <Layout style={globalStyles.paddedContainer}>
          {error ? (
            <View style={styles.errorMessageContainer}>
              <MessageTeaser title="An error has occurred" msg={error} type="error" />
              <Button onPress={retry}>Close</Button>
            </View>
          ) : (
            <>
              {renderPreviewHeader()}
              <Padder />
              {renderPreviewContent()}
              <Padder />
              {renderPreviewButton()}
              <Padder scale={2} />
            </>
          )}
        </Layout>
      </Preview>
    </View>
  );
}

const timeoutPromise = new Promise<TxResult>((resolve) => {
  setTimeout(() => {
    resolve({error: 'Transaction rejected.'});
  }, 1000 * 60);
});

function isAmountValid(balance: number, amount: number): boolean {
  const amountSchema = yup.number().positive().max(balance);

  return amountSchema.isValidSync(amount);
}

function openOnEtherscan(txHash: string) {
  // TODO: use `https://etherscan.io/tx/${txHash}` when using Ethereum
  const url = `https://rinkeby.etherscan.io/tx/${txHash}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
}

function TransactionCompleted({txHash, onPress}: {txHash: string; onPress: () => void}) {
  const {colors} = useTheme();

  return (
    <View style={[globalStyles.fillCenter, styles.transactionCompletedContainer, {backgroundColor: colors.surface}]}>
      <SuccessAnimation />
      <Padder />
      <Text>Your tokens have been successfully migrated.</Text>
      <Padder />
      <Button
        icon="open-in-new"
        onPress={() => {
          openOnEtherscan(txHash);
          onPress();
        }}>
        Etherscan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  disconnectWalletContainer: {
    alignItems: 'flex-end',
  },
  previewHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryContainer: {
    padding: standardPadding * 2,
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionCompletedContainer: {
    padding: standardPadding * 2,
    borderRadius: 10,
  },
  errorMessageContainer: {
    height: height * 0.3,
    paddingBottom: standardPadding * 2,
  },
  balance: {
    alignItems: 'flex-end',
  },
});
