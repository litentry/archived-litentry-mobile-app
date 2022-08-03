import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {useDemocracyReferendum} from 'src/api/hooks/useDemocracyReferendum';
import globalStyles, {standardPadding} from '@ui/styles';
import LoadingView from '@ui/components/LoadingView';
import {useTheme, Caption, Subheading, Button, Modal, Select} from '@ui/library';
import {fromNow} from 'src/utils/date';
import HyperLink from 'react-native-hyperlink';
import {truncate} from 'src/utils';
import {Padder} from '@ui/components/Padder';
import {ProgressBar} from '@ui/components/ProgressBar';
import {useConvictions, Conviction} from 'src/api/hooks/useConvictions';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {bnToHex, BN_ZERO} from '@polkadot/util';
import type {Account} from 'src/api/hooks/useAccount';
import {SelectAccount} from '@ui/components/SelectAccount';
import BalanceInput from '@ui/components/BalanceInput';
import {formattedStringToBn} from 'src/utils/balance';
import {useStartTx} from 'context/TxContext';
import {ProposalTeaserHeader} from './DemocracyScreen';

type ScreenProps = {
  route: RouteProp<DashboardStackParamList, 'Referendum'>;
};

export function DemocracyReferendumDetailScreen({route}: ScreenProps) {
  const {startTx} = useStartTx();
  const {colors} = useTheme();
  const [fullDescription, setFulDescription] = React.useState(false);
  const {data: referendum, loading} = useDemocracyReferendum(route.params.id);
  const {data: convictions} = useConvictions();
  const {stringToBn} = useFormatBalance();
  const [voteType, setVoteType] = React.useState<'YES' | `NO`>();
  const [voteAccount, setVoteAccount] = React.useState<Account>();
  const [voteValue, setVoteValue] = React.useState<string>();
  const [voteConviction, setVoteConviction] = React.useState<Conviction>();

  const toggleDescription = React.useCallback(() => {
    setFulDescription(!fullDescription);
  }, [fullDescription]);

  const toggleVoteModal = React.useCallback((_voteType: 'YES' | 'NO') => {
    setVoteType(_voteType);
  }, []);

  const resetVoteModal = React.useCallback(() => {
    setVoteType(undefined);
    setVoteAccount(undefined);
    setVoteValue(undefined);
    setVoteConviction(undefined);
  }, []);

  const voteValueBN = React.useMemo(() => {
    if (voteValue) {
      return stringToBn(voteValue) ?? BN_ZERO;
    }
    return BN_ZERO;
  }, [voteValue, stringToBn]);

  const accountFreeBalanceBN = React.useMemo(() => {
    if (voteAccount) {
      return formattedStringToBn(voteAccount.balance?.free);
    }
    return BN_ZERO;
  }, [voteAccount]);

  const disabled = !voteAccount || !voteConviction || !voteValueBN.gt(BN_ZERO) || voteValueBN.gt(accountFreeBalanceBN);

  const vote = React.useCallback(() => {
    if (voteAccount && voteConviction && voteValueBN.gt(BN_ZERO)) {
      const referendumIndex = referendum?.id.split(':')[1] as string;
      startTx({
        address: voteAccount.address,
        txConfig: {
          method: 'democracy.vote',
          params: [
            referendumIndex,
            {
              balance: bnToHex(voteValueBN),
              vote: {aye: voteType === 'YES' ? true : false, conviction: voteConviction.value},
            },
          ],
        },
      });
      resetVoteModal();
    }
  }, [referendum?.id, startTx, voteAccount, voteConviction, voteType, voteValueBN, resetVoteModal]);

  const referendumIndex = referendum?.id.split(':')[1] as string;

  return (
    <SafeView edges={noTopEdges}>
      {loading && !referendum ? (
        <LoadingView />
      ) : referendum ? (
        <ScrollView style={styles.container}>
          <ProposalTeaserHeader
            index={referendumIndex}
            title={referendum.title}
            subtitle={`${fromNow(referendum.date)} | ${referendum.status}`}
          />

          {referendum.description ? (
            <>
              <Padder />
              <HyperLink linkStyle={{color: colors.primary}} linkDefault>
                <Caption style={globalStyles.textJustify}>
                  {fullDescription ? referendum.description : truncate(referendum.description, 120)}
                </Caption>
              </HyperLink>
              {referendum.description.length > 120 ? (
                <Button uppercase={false} onPress={toggleDescription}>{`Show ${
                  fullDescription ? `less` : `more`
                }`}</Button>
              ) : null}
            </>
          ) : null}

          <Padder scale={1} />
          <Subheading style={globalStyles.textCenter}>{`Live Result (${referendum.votes.length} votes)`}</Subheading>
          <Caption style={globalStyles.textCenter}>{`${referendum.voteThreshold}: ${referendum.ayePercent}%`}</Caption>
          <Padder scale={0.5} />
          <ProgressBar percentage={referendum.ayePercent} />
          <Padder />
          <View style={globalStyles.rowContainer}>
            <View style={[globalStyles.flex, globalStyles.alignCenter]}>
              <Subheading>{`YES`}</Subheading>
              <Caption>{referendum.formattedAye}</Caption>
            </View>
            <View style={[globalStyles.flex, globalStyles.alignCenter]}>
              <Subheading>{`NO`}</Subheading>
              <Caption>{referendum.formattedNay}</Caption>
            </View>
          </View>

          <Padder scale={3} />
          <View style={globalStyles.spaceAroundRowContainer}>
            <Button
              mode="contained"
              icon="check"
              uppercase={false}
              onPress={() => {
                toggleVoteModal('YES');
              }}>{`Vote YES`}</Button>
            <Button
              mode="contained"
              icon="alert-circle-outline"
              uppercase={false}
              onPress={() => {
                toggleVoteModal('NO');
              }}>{`Vote NO`}</Button>
          </View>
          <Padder scale={2} />
        </ScrollView>
      ) : null}

      <Modal
        visible={Boolean(voteType)}
        onDismiss={() => {
          resetVoteModal();
        }}>
        <Subheading style={globalStyles.textCenter}>{`Vote ${voteType}`}</Subheading>
        <Padder />
        <Caption>{`Vote with account`}</Caption>
        <SelectAccount
          onSelect={(account) => {
            setVoteAccount(account.accountInfo);
          }}
        />

        <Padder scale={1} />
        <Caption>{`Vote Value`}</Caption>
        <BalanceInput
          account={voteAccount}
          onChangeBalance={(amount) => {
            setVoteValue(amount);
          }}
        />

        <Caption>{`Conviction`}</Caption>
        <Padder scale={0.5} />
        <Select
          items={convictions ?? []}
          onSelect={(conviction) => {
            setVoteConviction(conviction);
          }}
        />

        <Padder scale={2} />
        <View style={globalStyles.spaceAroundRowContainer}>
          <Button
            mode="outlined"
            onPress={() => {
              resetVoteModal();
            }}>
            {`Cancel`}
          </Button>
          <Button mode="outlined" disabled={disabled} onPress={vote}>{`Vote ${voteType}`}</Button>
        </View>
      </Modal>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: standardPadding * 2,
  },
  padding0: {
    padding: 0,
  },
});
