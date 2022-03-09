/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * referenced from
 * https://github.com/polkadot-js/apps/tree/master/packages/react-params/src/Param
 */
import {useProposalCallParams} from '@hooks/useProposalCallParams';
import {Balance, Call} from '@polkadot/types/interfaces';
import {isAscii, isHex, isU8a, u8aToHex, u8aToString} from '@polkadot/util';
import {Account} from '@ui/components/Account';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {Padder} from '@ui/components/Padder';
import {Card, Text} from '@ui/library';
import globalStyles from '@ui/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';

export function ProposalCall({call}: {call: Call}) {
  const {formatBalance} = useFormatBalance();
  const data = useProposalCallParams(call);
  const {method, section} = call.registry.findMetaCall(call.callIndex);

  return (
    <Card style={style.container}>
      <Card.Content>
        <Text>{`${method}.${section}():`}</Text>
        <Padder scale={0.5} />
        {data.map((p, key) => {
          return (
            <View key={key} style={style.param}>
              {(() => {
                if ((p.type.type === 'AccountId' || p.type.type === 'MultiAddress') && p.value) {
                  return (
                    <View style={globalStyles.rowAlignCenter}>
                      <Text>{p.name}: </Text>
                      <Account id={p.value.toString()} key={key}>
                        {(identity) => {
                          return identity ? (
                            <AccountInfoInlineTeaser identity={identity} />
                          ) : (
                            <Text>{p.value?.toString()}</Text>
                          );
                        }}
                      </Account>
                    </View>
                  );
                }

                if (p.type.type === 'Bytes' && p.value && isU8a(p.value)) {
                  const v =
                    isU8a(p.value) && isAscii(p.value)
                      ? u8aToString(p.value)
                      : isHex(p.value)
                      ? p.value
                      : u8aToHex(p.value as Uint8Array, 256);

                  return (
                    <View>
                      <Text>{p.name}:</Text>
                      <Text numberOfLines={2} adjustsFontSizeToFit>
                        {v}
                      </Text>
                    </View>
                  );
                }

                if (p.type.type === 'Balance' && p.value) {
                  return <Text>{`${p.name}:${formatBalance(p.value as Balance)}`}</Text>;
                }

                if (p.type.type === 'Call') {
                  return (
                    <View style={globalStyles.rowAlignCenter}>
                      <Text>{p.name}: </Text>
                      <ProposalCall call={p.value as any} />
                    </View>
                  );
                }

                if (p.type.type === 'Vec<Call>' && Array.isArray(p.value)) {
                  return (
                    <View>
                      <Text>{p.name}:</Text>
                      {p.value?.map((_call, index) => {
                        return <ProposalCall call={_call} key={index} />;
                      })}
                    </View>
                  );
                }

                return <Text>{`${p.name}: ${p.value}`}</Text>;
              })()}
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  param: {
    marginTop: 5,
    padding: 5,
    opacity: 0.8,
  },
});
