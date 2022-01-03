import React, {useMemo} from 'react';
import {View, StyleSheet, SectionList, Linking} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {RouteProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import {Card, Subheading, Paragraph, List, Divider, Icon, Button, Text} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {BlockTime} from '@ui/components/BlockTime';
import {useParachainEvents} from 'src/api/hooks/useParachainEvents';
import {formatNumber, hexToBn} from '@polkadot/util';
import globalStyles, {standardPadding} from '@ui/styles';
import {useParachainValidators} from 'src/api/hooks/useParachainValidators';
import type {
  AccountId,
  CoreAssignment,
  ParaValidatorIndex,
  ParaId,
  CandidatePendingAvailability,
} from '@polkadot/types/interfaces';
import {EmptyView} from '@ui/components/EmptyView';
import IdentityIcon from '@polkadot/reactnative-identicon/Identicon';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {useParachainInfo} from 'src/api/hooks/useParachainInfo';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {notEmpty} from 'src/utils';

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
      )
      .filter(notEmpty),
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
  const events = useParachainEvents();
  const {data: parachainValidators} = useParachainValidators();
  const {data: parachainInfo} = useParachainInfo(id as unknown as ParaId);

  const validatorInfo = useMemo(() => getValidatorInfo(id, parachainValidators), [id, parachainValidators]);
  const nonVoters = useMemo(
    () => getNonVoters(parachainValidators?.validators, parachainInfo?.pendingAvail),
    [parachainValidators, parachainInfo],
  );

  const endpoints = useParaEndpoints(id as unknown as ParaId);
  const homepage = endpoints?.length ? endpoints[0]?.homepage : undefined;

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
          <Card>
            <Card.Content>
              <Subheading style={globalStyles.textCenter}>{name}</Subheading>
              <Paragraph style={globalStyles.textCenter}>{`#${id}`}</Paragraph>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <List.Item
                  style={styles.listItem}
                  title="Included"
                  description={formatNumber(events.lastIncluded[id]?.blockNumber)}
                />
                <List.Item
                  style={styles.listItem}
                  title="Backed"
                  description={formatNumber(events.lastBacked[id]?.blockNumber)}
                />
              </View>
              <Divider />
              <List.Item
                title="Lease"
                left={() => <LeftIcon icon="clock-outline" />}
                right={() => (
                  <View style={styles.accessoryRight}>
                    {period ? <Text>{period}</Text> : null}
                    {blocks ? <BlockTime blockNumber={hexToBn(blocks)} /> : null}
                  </View>
                )}
              />
              <List.Item
                title="Lifecycle"
                left={() => <LeftIcon icon="sync" />}
                right={() => (
                  <View style={styles.accessoryRight}>
                    <Text>{parachainInfo?.lifecycle?.toString()}</Text>
                  </View>
                )}
              />
              <Divider />
              <Padder scale={0.5} />
              {homepage ? (
                <Button
                  icon="home"
                  onPress={() => {
                    Linking.canOpenURL(homepage).then((supported) => {
                      if (supported) {
                        Linking.openURL(homepage);
                      }
                    });
                  }}>
                  {`Homepage`}
                </Button>
              ) : null}
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        sections={sections}
        renderItem={({item}) => <MemoizedValidator accountId={item.toString()} />}
        renderSectionHeader={({section: {title}}) => <Text style={styles.header}>{title}</Text>}
        keyExtractor={(item) => item.toString()}
        ListEmptyComponent={EmptyView}
        ItemSeparatorComponent={Divider}
        removeClippedSubviews={true}
      />
    </SafeView>
  );
}

function LeftIcon({icon}: {icon: string}) {
  return (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );
}

function Validator({accountId}: {accountId: string}) {
  const {data} = useAccountIdentityInfo(accountId.toString());

  return (
    <List.Item
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <IdentityIcon value={accountId.toString()} size={25} />
        </View>
      )}
      title={() => data && <AccountInfoInlineTeaser identity={data} />}
    />
  );
}
const MemoizedValidator = React.memo(Validator);

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  listItem: {
    width: 200,
  },
  header: {
    marginTop: standardPadding * 3,
    marginLeft: standardPadding,
  },
  accessoryRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
