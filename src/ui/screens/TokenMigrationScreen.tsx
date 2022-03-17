import React from 'react';
import {View, Text, Button} from 'react-native';
import {stringToHex} from '@polkadot/util';
import {useWalletConnect} from 'context/WalletConnectProvider';

export function TokenMigrationScreen() {
  const connector = useWalletConnect();
  const message = 'My email is test@email.com';
  const msgParams = [
    stringToHex(message), // Required
    '0x838C543187312cc85592f43a35b03A7aCb8B273a', // Required
  ];

  console.log('Accounts: ', connector.accounts);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Token Migration</Text>
      {!connector.connected ? (
        <Button title="Connect" onPress={() => connector.connect()} />
      ) : (
        <View>
          <Button title="Kill Session" onPress={() => connector.killSession()} />
          <Button
            title="Sign message"
            onPress={() => connector.signPersonalMessage(msgParams).then((result) => console.log(result))}
          />
        </View>
      )}
    </View>
  );
}
