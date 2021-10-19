import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Icon, IconProps, Layout, Input, Button, Text} from '@ui-kitten/components';
import ModalTitle from 'presentational/ModalTitle';
import Padder from 'presentational/Padder';
import type {KeyringPair} from 'src/types';

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
  keyringPair: KeyringPair;
  onAuthenticate: () => void;
};

export function AuthenticateView({onAuthenticate, keyringPair}: Props) {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>();

  const onPressUnlock = () => {
    try {
      keyringPair.unlock(password);
      setIsValid(true);
      onAuthenticate();
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
