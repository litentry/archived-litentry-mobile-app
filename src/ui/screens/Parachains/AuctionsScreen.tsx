import React from 'react';
import {View} from 'react-native';
import LoadingView from '@ui/components/LoadingView';
import {StyleSheet} from 'react-native';
import {useAuctionsSummary} from 'src/api/hooks/useAuctionsSummary';
import {Card, Caption, List, Subheading} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {ProgressChartWidget} from '@ui/components/ProgressChartWidget';
import {EmptyView} from '@ui/components/EmptyView';
import Clipboard from '@react-native-community/clipboard';
import {useSnackbar} from 'context/SnackbarContext';
import {EmptyStateTeaser} from '@ui/components/EmptyStateTeaser';
import {useFormatBalance} from 'src/hooks/useFormatBalance';

const WinningBidLeases = (leases: string) => () =>
  (
    <View style={globalStyles.justifyCenter}>
      <Caption>{`Leases`}</Caption>
      <Caption>{leases}</Caption>
    </View>
  );

export function AuctionsScreen() {
  const {formatBalance} = useFormatBalance();
  const {data: auction, loading} = useAuctionsSummary();
  const snackbar = useSnackbar();

  if (loading && !auction) {
    return (
      <SafeView edges={noTopEdges}>
        <LoadingView />
      </SafeView>
    );
  }

  if (!auction) {
    return (
      <SafeView edges={noTopEdges}>
        <EmptyView />
      </SafeView>
    );
  }

  const {auctionsInfo, latestAuction} = auction;
  const {winningBid, leasePeriod, endingPeriod, raised, raisedPercent} = latestAuction;
  const formattedRaised = formatBalance(raised, {isShort: true});
  const remainingPercent =
    typeof endingPeriod?.remainingPercent === 'number' && endingPeriod.remainingPercent > 100
      ? 100
      : endingPeriod?.remainingPercent ?? 0;

  const copyToClipboard = () => {
    if (winningBid?.blockNumber) {
      Clipboard.setString(winningBid.blockNumber);
      snackbar('Blocknumber copied to clipboard!');
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      {auctionsInfo.active ? (
        <>
          <Card style={styles.container}>
            <Card.Content>
              <View style={styles.itemRow}>
                <StatInfoBlock title="Auctions">{auctionsInfo.numAuctions}</StatInfoBlock>
                <StatInfoBlock title="Active">{auctionsInfo.active ? 'Yes' : 'No'}</StatInfoBlock>
                <StatInfoBlock title="First - Last">{`${leasePeriod?.first} - ${leasePeriod?.last}`}</StatInfoBlock>
              </View>

              <Padder scale={2} />
              <View style={styles.itemRow}>
                <>
                  {endingPeriod && (
                    <ProgressChartWidget
                      chartTextStyle={styles.chartTextStyle}
                      title={`Ending period`}
                      detail={`${remainingPercent}%\n${endingPeriod.remaining.slice(0, 2).join('\n')}`}
                      progress={remainingPercent / 100}
                    />
                  )}
                </>
                <>
                  <ProgressChartWidget
                    chartTextStyle={styles.chartTextStyle}
                    title={`Total Raised`}
                    detail={`${raisedPercent}%\n${formattedRaised?.split(' ').join('\n')}`}
                    progress={raisedPercent / 100}
                  />
                </>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.container}>
            <Card.Content>
              {winningBid ? (
                <>
                  <Subheading style={globalStyles.textCenter}>{`Winning Bid`}</Subheading>
                  <List.Item
                    title={winningBid?.projectName}
                    description={
                      <View>
                        <Padder scale={0.5} />
                        <Caption>{`ProjectID: ${winningBid?.projectId}`}</Caption>
                        <Caption>{`Bid: ${winningBid?.amount} ${
                          winningBid?.isCrowdloan ? '(crowdloan)' : ''
                        }`}</Caption>
                        <Caption>
                          {`Block number: `}
                          <Caption onPress={copyToClipboard}>{winningBid?.blockNumber}</Caption>
                        </Caption>
                      </View>
                    }
                    right={WinningBidLeases(`${winningBid?.firstSlot} - ${winningBid?.lastSlot}`)}
                  />
                </>
              ) : (
                <EmptyStateTeaser subheading="There is no winning bid" />
              )}
            </Card.Content>
          </Card>
        </>
      ) : (
        <EmptyView>{`There is no ongoing auction`}</EmptyView>
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: standardPadding * 2,
    marginHorizontal: standardPadding,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chartTextStyle: {
    left: '33%',
  },
});
