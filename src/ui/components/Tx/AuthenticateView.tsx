import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button, Caption, useTheme, Subheading} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {SecureKeychain} from 'src/service/SecureKeychain';
import globalStyles, {standardPadding} from '@ui/styles';
import {useKeyring} from '@polkadotApi/useKeyring';
import {SignCredentials} from '@polkadotApi/types';

type Props = {
  address: string;
  onAuthenticate: (credentials: SignCredentials) => void;
};

export function AuthenticateView({onAuthenticate, address}: Props) {
  const {colors} = useTheme();
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const {verifyCredentials} = useKeyring();

  useEffect(() => {
    (async () => {
      const credentials = await SecureKeychain.getPasswordByServiceId(address);
      if (credentials) {
        setPassword(credentials.password);
      }
    })();
  }, [address]);

  const onPressUnlock = async () => {
    const credentials = {address, password};
    const {valid} = await verifyCredentials(credentials);
    if (valid) {
      setIsValid(true);
      onAuthenticate(credentials);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>{`Unlock account`}</Subheading>
      <TextInput
        dense
        mode="outlined"
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isValid === false ? <Caption style={{color: colors.error}}>{`Incorrect password`}</Caption> : null}
      <Padder scale={1} />
      <Button onPress={onPressUnlock} mode="contained" icon="lock">
        Unlock
      </Button>
      <Padder scale={1} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 3,
    marginBottom: standardPadding * 2,
  },
});
