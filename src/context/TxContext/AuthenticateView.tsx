import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Icon, IconProps, Layout, Input, Button, Text} from '@ui-kitten/components';
import ModalTitle from 'presentational/ModalTitle';
import Padder from 'presentational/Padder';
import SubstrateSign from 'react-native-substrate-sign';
import {Account, InternalAccount, useAccounts} from 'context/AccountsContext';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.25,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
});

type Props = {
  address: string;
  onAuthenticate: (seed: string) => void;
};

function isInternal(a: Account): a is InternalAccount {
  return a.isExternal === false;
}

export function AuthenticateView({onAuthenticate, address}: Props) {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const {accounts} = useAccounts();
  const encoded = accounts.filter(isInternal).find((a) => a.address === address)?.encoded;

  const onPressUnlock = () => {
    if (!encoded) {
      throw new Error('No encoded found');
    }
    try {
      SubstrateSign.decryptData(encoded, password).then((seed) => {
        setIsValid(true);
        onAuthenticate(seed);
      });
    } catch (e) {
      setIsValid(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <ModalTitle title="Unlock Account" />
      <Input
        placeholder="Enter password"
        secureTextEntry
        value={password}
        status={isValid === false ? 'danger' : 'basic'}
        onChangeText={setPassword}
        accessoryLeft={(props: IconProps) => <Icon {...props} name="lock-outline" />}
        caption={isValid === false ? IncorrectPassword : undefined}
      />
      <Padder scale={1} />
      <Button accessoryRight={(props) => <Icon {...props} name="unlock-outline" />} onPress={onPressUnlock}>
        Unlock
      </Button>
    </Layout>
  );
}

function IncorrectPassword() {
  return (
    <>
      <Padder scale={0.5} />
      <Text category="c2" status="danger">
        Incorrect password
      </Text>
    </>
  );
}
