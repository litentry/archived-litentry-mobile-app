import React, {useMemo} from 'react';
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
import type {
  AccountId,
  CoreAssignment,
  ParaValidatorIndex,
  ParaId,
  CandidatePendingAvailability,
} from '@polkadot/types/interfaces';
import {EmptyView} from 'presentational/EmptyView';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import {useParachainInfo} from 'src/api/hooks/useParachainInfo';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'parachainDetail'>;
};

type ParachainValidators = {
  validators: AccountId[];
  assignments?: CoreAssignment[];
  validatorGroups: ParaValidatorIndex[][];
  validatorIndices?: ParaValidatorIndex[];
};

function getValidatorInfo(id: string, parachainValidators?: ParachainValidators) {
  const assignment = parachainValidators?.assignments?.find(({paraId}) => paraId.eq(id));

  if (!assignment) {
    return undefined;
  }

  return {
    groupIndex: assignment.groupIdx,
    validators: parachainValidators?.validatorGroups[assignment.groupIdx.toNumber()]
      ?.map((indexActive) => [indexActive, parachainValidators?.validatorIndices?.[indexActive.toNumber()]])
      .filter(([, a]) => a)
      .map(([, indexValidator]) =>
        indexValidator ? parachainValidators.validators[indexValidator?.toNumber()] : undefined,
      ),
  };
}

function getNonVoters(validators?: AccountId[], pendingAvail?: CandidatePendingAvailability) {
  let list: AccountId[] = [];

  if (validators && pendingAvail) {
    list = pendingAvail.availabilityVotes
      .toHuman()
      .slice(2)
      .replace(/_/g, '')
      .split('')
      .map((c, index) => (c === '0' ? validators[index] : null))
      .filter((v, index): v is AccountId => !!v && index < validators.length);
  }

  return list;
}

export function ParachainDetailScreen({route}: ScreenProps) {
  const {id, name, period, blocks} = route.params;
  const theme = useTheme();

  const events = useParachainEvents();
  const {data: parachainValidators} = useParachainValidators();
  const {data: parachainInfo} = useParachainInfo(id as unknown as ParaId);

  const validatorInfo = useMemo(() => getValidatorInfo(id, parachainValidators), [id, parachainValidators]);
  const nonVoters = useMemo(
    () => getNonVoters(parachainValidators?.validators, parachainInfo?.pendingAvail),
    [parachainValidators, parachainInfo],
  );

  const sections = [
    {
      title: `Val. Group ${validatorInfo?.groupIndex.toNumber() || ''} (${validatorInfo?.validators?.length || 0})`,
      data: validatorInfo?.validators || [],
    },
    {
      title: `Non-Voters (${nonVoters.length})`,
      data: nonVoters,
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
                      <Text style={styles.text}>{parachainInfo?.lifecycle?.toString()}</Text>
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
        renderItem={({item}) => <>{item && <Validator accountId={item} />}</>}
        renderSectionHeader={({section: {title}}) => (
          <Text category={'s1'} style={styles.header}>
            {title}
          </Text>
        )}
        keyExtractor={(item) => (item ? item?.toString() : '')}
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
