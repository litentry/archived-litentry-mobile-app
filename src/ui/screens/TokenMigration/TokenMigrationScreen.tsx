import React from 'react';
import {View, StyleSheet, Linking, ScrollView, Dimensions} from 'react-native';
import {useWeb3Wallet} from 'context/Web3WalletContext';
import {useNetwork} from 'context/NetworkContext';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {SuccessAnimation} from '@ui/components/SuccessAnimation';
import {MessageTeaser} from '@ui/components/MessageTeaser';
import {SelectAccount} from '@ui/components/SelectAccount';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {decimalKeypad} from 'src/utils';
import {Text, Card, Button, Subheading, Title, Icon, TextInput, useBottomSheet, useTheme} from '@ui/library';
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
    const result = await wallet.approveForMigration(ethAddress);
    if (result?.ok) {
      wallet.updateAccount(ethAddress);
    }
    if (result?.error) {
      setError(result.error);
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
    const result = await wallet.depositForMigration(ethAddress, Number(amount), destinationAddress);
    if (result?.ok) {
      wallet.updateAccount(ethAddress);
      setTxHash(result.ok);
    }
    if (result?.error) {
      setError(result.error);
    }
    nextStep(WizardStep.Completed);
    setIsRequestingTransfer(false);
  }, [wallet, nextStep, amount, destinationAddress]);

  const renderPreviewHeader = React.useCallback(() => {
    return (
      <View style={styles.previewHeaderContainer}>
        <Title>Transaction summary</Title>
        <View style={globalStyles.rowAlignCenter}>
          <Text>Ethereum</Text>
          <Padder scale={0.5} />
          <Icon name="swap-horizontal" size={25} />
          <Padder scale={0.5} />
          <Text>Litmus</Text>
        </View>
      </View>
    );
  }, []);

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
              <Subheading>Amount</Subheading>
              <Text>{formatBalance(stringToBn(amount?.toString()))}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Subheading>Source</Subheading>
              <Text>{toShortAddress(wallet.connectedAccount?.address ?? '')}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Subheading>Destination</Subheading>
              <Text>{toShortAddress(destinationAddress)}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Subheading>LIT Balance</Subheading>
              <Text>{formatBalance(stringToBn(wallet.connectedAccount?.balance.lit.toString() ?? ''))}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Subheading>ETH Balance</Subheading>
              <Text>{`${wallet.connectedAccount?.balance.eth.toFixed(4)} ETH` ?? ''}</Text>
            </View>
            <Padder />
            <View style={styles.summaryRow}>
              <Subheading>New LIT Balance in Ethereum</Subheading>
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
            <Subheading>From Account</Subheading>
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
            <Subheading>Destination</Subheading>
            <SelectAccount onSelect={(selectedAccount) => setDestinationAddress(selectedAccount.account.address)} />
            <Padder scale={0.5} />
            <Subheading>Amount</Subheading>
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
            />
            <Padder scale={2} />
            <Button
              mode="contained"
              compact
              onPress={openPreview}
              disabled={!amount || !destinationAddress || !wallet.isConnected}>
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
});
