import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Padder} from '@ui/components/Padder';
import {Account} from '@ui/components/Account/Account';
import type {Account as SubstrateChainAccount} from 'src/api/hooks/useAccount';
import globalStyles from '@ui/styles';
import {Identicon} from '@ui/components/Identicon';

type Props = {
  account: SubstrateChainAccount;
  identiconSize?: number;
  onPress?: () => void;
  children?: React.ReactNode;
  testID?: string;
  name?: string;
};

export function AccountTeaser({account, onPress, children, testID, name, identiconSize = 20}: Props) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={globalStyles.rowAlignCenter} testID={testID}>
        <Identicon value={account.address} size={identiconSize} />
        <Padder scale={0.5} />
        <View>
          <Account account={account} name={name} />
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
}
