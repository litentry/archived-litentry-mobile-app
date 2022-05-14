import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button, Caption, useTheme, Subheading} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import SubstrateSign from 'react-native-substrate-sign';
import {Account, InternalAccount, useAccounts} from 'context/AccountsContext';
import {SecureKeychain} from 'src/service/SecureKeychain';
import globalStyles, {standardPadding} from '@ui/styles';

type Props = {
  address: string;
  onAuthenticate: (seed: string) => void;
};

function isInternal(a: Account): a is InternalAccount {
  return a.isExternal === false;
}

export function AuthenticateView({onAuthenticate, address}: Props) {
  const {colors} = useTheme();
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const {accounts} = useAccounts();
  const account = accounts[address];
  const encoded = account && isInternal(account) ? account.encoded : null;

  useEffect(() => {
    (async () => {
      const credentials = await SecureKeychain.getPasswordByServiceId(address);
      if (credentials) {
        setPassword(credentials.password);
      }
    })();
  }, [address]);

  const onPressUnlock = async () => {
    if (!encoded) {
      throw new Error('No encoded found');
    }
    try {
      const seed = await SubstrateSign.decryptData(encoded, password);
      setIsValid(true);
      onAuthenticate(seed);
    } catch (e) {
      setIsValid(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <Subheading style={globalStyles.textCenter}>{`Unlock account`}</Subheading>
      <TextInput
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
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 3,
    marginBottom: standardPadding * 2,
  },
});
