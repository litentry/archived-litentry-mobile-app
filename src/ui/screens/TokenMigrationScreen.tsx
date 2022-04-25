import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import LottieView from 'lottie-react-native';
import {stringShorten} from '@polkadot/util';
import {useWeb3Wallet} from 'context/Web3WalletContext';
import {useNetwork} from 'context/NetworkContext';
import {SelectAccount} from '@ui/components/SelectAccount';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Text, Card, Button, Subheading, Title, Icon, TextInput, useBottomSheet, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import Animated, {SharedValue, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

function WalletConnectButton({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3182CE',
        borderRadius: 8,
        height: 45,
      }}>
      <Subheading style={{color: '#3182CE'}}>{title}</Subheading>
      <Image
        source={require('../../image/walletconnect-logo.png')}
        resizeMode="contain"
        style={{height: 25, width: 25, marginLeft: standardPadding}}
      />
    </TouchableOpacity>
  );
}

enum Step {
  RequestPermission = 1,
  RequestTransfer = 2,
  Completed = 3,
}

const stepsInitialState = {
  [Step.RequestPermission]: {
    active: true,
    done: false,
  },
  [Step.RequestTransfer]: {
    active: false,
    done: false,
  },
  [Step.Completed]: {
    active: false,
  },
};

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

  const initialStep = Step.RequestPermission;
  const [currentStep, setNextStep] = React.useState<Step>(initialStep);
  const stepsState = useSharedValue(stepsInitialState);

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

  if (txHash) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Your tokens have been successfully migrated.</Text>
        <Text>View transaction {txHash} on Etherscan.io</Text>
      </View>
    );
  }

  const renderPreviewButton = () => {
    if (currentStep === Step.RequestPermission) {
      return (
        <Button
          loading={isRequestingPermission}
          mode="contained"
          onPress={() => {
            setIsRequestingPermission(true);
            setTimeout(() => {
              setNextStep(Step.RequestTransfer);
              stepsState.value = {
                ...stepsState.value,
                [Step.RequestPermission]: {
                  active: false,
                  done: true,
                },
                [Step.RequestTransfer]: {
                  active: true,
                  done: false,
                },
              };
              setIsRequestingPermission(false);
            }, 2000);
          }}>
          Request permission
        </Button>
      );
    }
    if (currentStep === Step.RequestTransfer) {
      return (
        <Button
          loading={isRequestingTransfer}
          mode="contained"
          onPress={() => {
            setIsRequestingTransfer(true);
            setTimeout(() => {
              setNextStep(Step.Completed);
              stepsState.value = {
                ...stepsState.value,
                [Step.RequestTransfer]: {
                  active: false,
                  done: true,
                },
                [Step.Completed]: {
                  active: true,
                },
              };
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
          setNextStep(1);
          stepsState.value = stepsInitialState;
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
          <PreviewHeader />
          <Padder />
          <TransactionSteps state={stepsState} />
          <Padder scale={2} />
          {currentStep === Step.Completed ? (
            <TransactionCompleted
              txHash={txHash}
              onPress={() => {
                closePreview();
                setNextStep(initialStep);
                stepsState.value = stepsInitialState;
              }}
            />
          ) : (
            <TransactionSummary />
          )}
          <Padder />
          {renderPreviewButton()}
          <Padder scale={2} />
        </Layout>
      </Preview>
    </View>
  );
}

type StepsState = SharedValue<Record<Step, {active: boolean; done?: boolean}>>;

function TransactionSteps({state}: {state: StepsState}) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <StepCircle step={1} state={state} />
      <StepDivider />
      <StepCircle step={2} state={state} />
      <StepDivider />
      <StepCircle step={3} state={state} />
    </View>
  );
}

function StepCircle({step, state}: {step: Step; state: StepsState}) {
  const {colors} = useTheme();
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(state.value[step].active || state.value[step].done ? colors.surface : colors.primary),
    };
  });
  const animatedCircleStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        state.value[step].active || state.value[step].done ? colors.primary : colors.background,
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: 30,
          height: 30,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        },
        animatedCircleStyles,
      ]}>
      {step === Step.Completed ? (
        <Icon name="check" size={18} color={state.value[Step.Completed].active ? colors.surface : colors.primary} />
      ) : state.value[step].done ? (
        <Icon name="check" size={18} color={colors.surface} />
      ) : (
        <Animated.Text style={[{fontWeight: '700'}, animatedTextStyle]}>{step}</Animated.Text>
      )}
    </Animated.View>
  );
}

function StepDivider() {
  const {colors} = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.disabled,
        width: '30%',
      }}
    />
  );
}

function openEtherscan(txHash: string) {
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
    <View
      style={[
        globalStyles.fillCenter,
        {backgroundColor: colors.surface, padding: standardPadding * 2, borderRadius: 10},
      ]}>
      <LottieView
        autoPlay
        style={{width: '50%'}}
        source={require('../../../assets/lottieFiles/success_animation.json')}
        loop={false}
      />
      <Padder />
      <Text>Your tokens have been successfully migrated.</Text>
      <Padder />
      <Button
        icon="open-in-new"
        onPress={() => {
          openEtherscan(txHash);
          onPress();
        }}>
        Etherscan
      </Button>
    </View>
  );
}

function PreviewHeader() {
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

const stepsState = {
  [Step.RequestPermission]: {
    active: true,
    done: false,
  },
  [Step.RequestTransfer]: {
    active: true,
    done: false,
  },
  [Step.Completed]: {
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
