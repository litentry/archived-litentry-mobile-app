import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {stringShorten} from '@polkadot/util';
import {useWeb3Wallet} from 'context/Web3WalletContext';
import {useNetwork} from 'context/NetworkContext';
import {SuccessAnimation} from '@ui/components/SuccessAnimation';
import {SelectAccount} from '@ui/components/SelectAccount';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Text, Card, Button, Subheading, Title, Icon, TextInput, useBottomSheet, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {useTransactionWizard, WizardStep} from './TransactionWizard';
import {WalletConnectButton} from './WalletConnectButton';

export function TokenMigrationScreen() {
  const wallet = useWeb3Wallet();
  const {currentNetwork} = useNetwork();
  const [isRequestingPermission, setIsRequestingPermission] = React.useState(false);
  const [isRequestingTransfer, setIsRequestingTransfer] = React.useState(false);
  const litmusAddress = '5DkLmfqQDZtDpN2SiEMvVeTJuq8zW7pan2c4LqN3EV6deB64'; // TODO: select address from internal accounts
  const ethAddress = '0x838C543187312cc85592f43a35b03A7aCb8B273a'; // TODO: select address from web3 accounts
  const hasApproved = wallet.isConnected ? wallet.connectedAccount?.approved.isGreaterThan(0) : false;
  const [txHash, setTxHash] = React.useState('');
  const {colors} = useTheme();
  const {TransactionWizard, currentStep, nextStep, resetWizard} = useTransactionWizard();

  const {openBottomSheet: openPreview, closeBottomSheet: closePreview, BottomSheet: Preview} = useBottomSheet();

  const requestPermission = React.useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('The wallet must be connected to call this method');
    }
    setIsRequestingPermission(true);
    const result = await wallet.approveForMigration(ethAddress);
    if (result?.ok) {
      wallet.updateAccount(ethAddress);
    }
    if (result?.error) {
      // TODO: handle error
      console.error(result.error);
    }
    setIsRequestingPermission(false);
  }, [wallet]);

  const requestTransfer = React.useCallback(async () => {
    if (!wallet.isConnected) {
      throw new Error('The wallet must be connected to call this method');
    }
    setIsRequestingTransfer(true);
    const result = await wallet.depositForMigration(ethAddress, 1, litmusAddress);
    if (result?.ok) {
      wallet.updateAccount(ethAddress);
      setTxHash(result.ok);
    }
    if (result?.error) {
      // TODO: handle error
      console.error(result.error);
    }
    setIsRequestingTransfer(false);
  }, [wallet]);

  const renderPreviewHeader = React.useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Title>Transaction summary</Title>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
    return (
      <>
        <TransactionWizard />
        <Padder scale={2} />
        {currentStep === WizardStep.Completed ? (
          <TransactionCompleted
            txHash={txHash}
            onPress={() => {
              closePreview();
              resetWizard();
            }}
          />
        ) : (
          <TransactionSummary />
        )}
      </>
    );
  };

  const renderPreviewButton = () => {
    if (currentStep === WizardStep.RequestPermission) {
      return (
        <Button
          loading={isRequestingPermission}
          mode="contained"
          onPress={() => {
            setIsRequestingPermission(true);
            setTimeout(() => {
              nextStep(WizardStep.RequestTransfer);
              setIsRequestingPermission(false);
            }, 2000);
          }}>
          Request permission
        </Button>
      );
    }
    if (currentStep === WizardStep.RequestTransfer) {
      return (
        <Button
          loading={isRequestingTransfer}
          mode="contained"
          onPress={() => {
            setIsRequestingTransfer(true);
            setTimeout(() => {
              nextStep(WizardStep.Completed);
              setIsRequestingTransfer(false);
            }, 2000);
          }}>
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
                value={stringShorten(wallet.connectedAccount?.address ?? '', 12)}
                disabled
              />
              <Button compact style={{alignSelf: 'flex-end'}} onPress={() => wallet.disconnect()}>
                Disconnect Wallet
              </Button>
            </View>
          )}
          <Subheading>Destination</Subheading>
          <SelectAccount onSelect={(selectedAccount) => console.log(selectedAccount)} />
          <Padder scale={0.5} />
          <Subheading>Amount</Subheading>
          <TextInput value={'10'} mode="outlined" />
          <Padder scale={2} />
          <Button mode="contained" compact onPress={openPreview}>
            Preview
          </Button>
        </Card.Content>
      </Card>

      <Preview>
        <Layout style={globalStyles.paddedContainer}>
          {renderPreviewHeader()}
          <Padder />
          {renderPreviewContent()}
          <Padder />
          {renderPreviewButton()}
          <Padder scale={2} />
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

function TransactionSummary() {
  const {colors} = useTheme();
  return (
    <View style={{backgroundColor: colors.surface, padding: standardPadding * 2, borderRadius: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Subheading>Amount</Subheading>
        <Text> 1 LIT</Text>
      </View>
      <Padder />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Subheading>Source</Subheading>
        <Text>0xBa3cb7dd5C533bB8b4E35c...</Text>
      </View>
      <Padder />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Subheading>Destination</Subheading>
        <Text>0xBa3cb7dd5C533bB8b4E35c...</Text>
      </View>
      <Padder />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Subheading>LIT Balance</Subheading>
        <Text>200</Text>
      </View>
      <Padder />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Subheading>ETH Balance</Subheading>
        <Text>30</Text>
      </View>
      <Padder />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Subheading>New LIT Balance in Ethereum</Subheading>
        <Text>199</Text>
      </View>
    </View>
  );
}

function TransactionCompleted({txHash, onPress}: {txHash: string; onPress: () => void}) {
  const {colors} = useTheme();
  return (
    <View
      style={[
        globalStyles.fillCenter,
        {backgroundColor: colors.surface, padding: standardPadding * 2, borderRadius: 10},
      ]}>
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

const stepsState = {
  [WizardStep.RequestPermission]: {
    active: true,
    done: false,
  },
  [WizardStep.RequestTransfer]: {
    active: true,
    done: false,
  },
  [WizardStep.Completed]: {
    active: true,
    done: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
});
