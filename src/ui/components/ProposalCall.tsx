/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * referenced from
 * https://github.com/polkadot-js/apps/tree/master/packages/react-params/src/Param
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Balance, Call} from '@polkadot/types/interfaces';
import {isU8a, u8aToString} from '@polkadot/util';
import {Text} from '@ui-kitten/components';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {Padder} from '@ui/components/Padder';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {Account} from '@ui/components/Account';
import {Card} from '@ui/library';
import {useProposalCallParams} from '@hooks/useProposalCallParams';
import globalStyles from '@ui/styles';

export function ProposalCall({call}: {call: Call}) {
  const formatBalance = useFormatBalance();
  const data = useProposalCallParams(call);
  const {method, section} = call.registry.findMetaCall(call.callIndex);

  return (
    <Card style={style.container}>
      <Card.Content>
        <Text category={'c1'}>{`${method}.${section}():`}</Text>
        <Padder scale={0.5} />
        {data.map((p, key) => {
          return (
            <View key={key}>
              {(() => {
                if ((p.type.type === 'AccountId' || p.type.type === 'MultiAddress') && p.value) {
                  return (
                    <View style={globalStyles.rowAlignCenter}>
                      <Text category="label">{p.name}: </Text>
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
                  return <Text>{`${p.name}: ${u8aToString(p.value)}`}</Text>;
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

                return <Text category="c1">{`${p.name}: ${p.value}`}</Text>;
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
});
