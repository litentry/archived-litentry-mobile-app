/**
 * referenced from
 * https://github.com/polkadot-js/apps/tree/master/packages/react-params/src/Param
 */

import {Codec, TypeDef} from '@polkadot/types/types';
import {Account} from 'presentational/Account';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import Identicon from '@polkadot/reactnative-identicon';
import Padder from 'presentational/Padder';
import {isU8a, u8aToString} from '@polkadot/util';
import {Balance} from '@polkadot/types/interfaces';
import React from 'react';
import {standardPadding} from 'src/styles';
import {useFormatBalance} from 'src/hook/useFormatBalance';

export interface Param {
  name: string;
  type: TypeDef;
  value?: Codec;
}

export function Params({data}: {data: Param[]}) {
  const formatBalance = useFormatBalance();

  return (
    <View>
      {data.map((p, key) => {
        return (
          <View style={styles.paramRow} key={key}>
            {(() => {
              if (p.type.type === 'AccountId' && p.value) {
                return (
                  <Account id={p.value.toString()} key={key}>
                    {({info, accountId}) => {
                      return (
                        <>
                          <Text>{p.name}: </Text>
                          <Identicon value={accountId} size={20} />
                          <Padder scale={0.3} />
                          <Text>{u8aToString(info?.display.asRaw)}</Text>
                        </>
                      );
                    }}
                  </Account>
                );
              }

              if (p.type.type === 'Bytes' && p.value && isU8a(p.value)) {
                return <Text>{`${p.name}: ${u8aToString(p.value)}`}</Text>;
              }

              if (p.type.type === 'Balance' && p.value) {
                return (
                  <>
                    <Text>{p.name}: </Text>
                    <Text>{formatBalance(p.value as Balance)}</Text>
                  </>
                );
              }

              return <Text>{`${p.name}: ${p.value}`}</Text>;
            })()}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  paramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: standardPadding,
    paddingVertical: standardPadding / 3,
  },
});
