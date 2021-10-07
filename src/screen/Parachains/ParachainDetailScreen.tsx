import React from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {RouteProp} from '@react-navigation/native';
import {ParachainsStackParamList} from 'src/navigation/navigation';
import {Text, Divider, useTheme, ListItem, Icon} from '@ui-kitten/components';
import Padder from 'presentational/Padder';
import {BlockTime} from 'layout/BlockTime';
import {useParachainEvents} from 'src/api/hooks/useParachainEvents';
import {formatNumber, hexToBn} from '@polkadot/util';
import {monofontFamily, standardPadding} from 'src/styles';
import {useParachainValidators} from 'src/api/hooks/useParachainValidators';
import type {AccountId, CoreAssignment, ParaValidatorIndex, GroupIndex} from '@polkadot/types/interfaces';
import {EmptyView} from 'presentational/EmptyView';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'parachainDetail'>;
};

type ParachainValidators =
  | {
      validators: AccountId[];
      assignments: CoreAssignment[] | undefined;
      validatorGroups: ParaValidatorIndex[][];
      validatorIndices: ParaValidatorIndex[] | undefined;
    }
  | undefined;

export interface ValidatorInfo {
  indexActive: ParaValidatorIndex;
  indexValidator: ParaValidatorIndex;
  validatorId: AccountId;
}

function getValidatorInfo(id: string, parachainValidators: ParachainValidators) {
  const assignment = parachainValidators?.assignments?.find(({paraId}) => paraId.eq(id));

  if (!assignment) {
    return undefined;
  }

  return {
    groupIndex: assignment.groupIdx,
    validators: parachainValidators?.validatorGroups[assignment.groupIdx.toNumber()]
      ?.map((indexActive) => [indexActive, parachainValidators?.validatorIndices?.[indexActive.toNumber()]])
      .filter(([, a]) => a)
      .map(([indexActive, indexValidator]) => ({
        indexActive,
        indexValidator,
        validatorId: indexValidator ? parachainValidators.validators[indexValidator?.toNumber()] : undefined,
      })),
  };
}

export function ParachainDetailScreen({route}: ScreenProps) {
  const {id, name, period, blocks} = route.params;
  const theme = useTheme();

  const events = useParachainEvents();
  const {data: parachainValidators} = useParachainValidators();

  const validatorInfo = getValidatorInfo(id, parachainValidators);

  const sections = [
    {
      title: `Val. Group ${validatorInfo?.groupIndex.toNumber() || ''} (${validatorInfo?.validators?.length || ''})`,
      data: validatorInfo?.validators || [],
    },
  ];

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => (
          <>
            <View style={[styles.container, {borderColor: theme['border-basic-color-4']}]}>
              <Padder scale={1} />
              <View style={styles.parachainNameContainer}>
                <Text category="s1" style={styles.text}>
                  {name}
                </Text>
                <Text category="s1" style={styles.text}>{`#${id}`}</Text>
                <Padder scale={1} />
                <View style={styles.eventsContainer}>
                  <View style={styles.event}>
                    <Text style={styles.text}>{`Included`}</Text>
                    {events.lastIncluded[id] ? (
                      <Text style={styles.text}>{formatNumber(events.lastIncluded[id]?.blockNumber)}</Text>
                    ) : null}
                  </View>
                  <View style={styles.event}>
                    <Text style={styles.text}>{`Backed`}</Text>
                    {events.lastBacked[id] ? (
                      <Text style={styles.text}>{formatNumber(events.lastBacked[id]?.blockNumber)}</Text>
                    ) : null}
                  </View>
                </View>
              </View>
              <Padder scale={1} />
              <Divider />
              <View style={styles.leaseInfo}>
                <ListItem
                  disabled
                  title="Lease"
                  accessoryLeft={() => (
                    <Icon name="clock-outline" fill={theme['color-basic-600']} style={styles.icon} />
                  )}
                  accessoryRight={() => (
                    <View style={styles.accessoryRight}>
                      {period ? <Text style={styles.text}>{period}</Text> : null}
                      {blocks ? <BlockTime blockNumber={hexToBn(blocks)} /> : null}
                    </View>
                  )}
                />
                <ListItem
                  disabled
                  title="Lifecycle"
                  accessoryLeft={() => <Icon name="sync-outline" fill={theme['color-basic-600']} style={styles.icon} />}
                  accessoryRight={() => (
                    <View style={styles.accessoryRight}>
                      <Text style={styles.text}>{`Parachain`}</Text>
                    </View>
                  )}
                />
                <Padder scale={1} />
              </View>
            </View>
          </>
        )}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderItem={({item}) => <>{item.validatorId && <Validator accountId={item.validatorId} />}</>}
        renderSectionHeader={({section: {title}}) => (
          <Text category={'s1'} style={styles.header}>
            {title}
          </Text>
        )}
        keyExtractor={(item) => String(item.validatorId?.toString())}
        ListEmptyComponent={EmptyView}
        ItemSeparatorComponent={Divider}
      />
    </SafeView>
  );
}

function Validator({accountId}: {accountId: AccountId}) {
  const {data} = useAccountIdentityInfo(accountId.toString());

  return (
    <ListItem
      disabled
      accessoryLeft={() => <IdentityIcon value={accountId.toString()} size={40} />}
      title={() => (
        <View style={styles.validatorAccountContainer}>{data && <AccountInfoInlineTeaser identity={data} />}</View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  validatorAccountContainer: {
    paddingHorizontal: 10,
  },
  leaseInfo: {
    paddingHorizontal: 10,
  },
  header: {
    padding: standardPadding,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  event: {
    flex: 1,
    alignItems: 'center',
  },
  parachainNameContainer: {
    alignItems: 'center',
  },
  accessoryRight: {
    alignItems: 'flex-end',
  },
  icon: {
    width: 25,
    height: 25,
  },
  text: {
    fontFamily: monofontFamily,
  },
});
