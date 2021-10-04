import {RouteProp} from '@react-navigation/core';
import {Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useCrowdloanFundByParaId} from 'src/api/hooks/useFunds';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {crowdloanDetailScreen} from 'src/navigation/routeKeys';

export function CrowdLoanDetailScreen({
  route,
}: {
  route: RouteProp<DashboardStackParamList, typeof crowdloanDetailScreen>;
}) {
  const fund = useCrowdloanFundByParaId(route.params.paraId);

  // TODO: USE FOR DETAIL PAGE
  // const bestNumber = useBestNumber();
  // const blocksLeft = useMemo(() => (bestNumber && end.gt(bestNumber) ? end.sub(bestNumber) : null), [bestNumber, end]);
  // const {data: contributions} = useContributions(item.paraId);
  //     {{blocksLeft ? <BlockTime blockNumber={blocksLeft} /> : null}
  //      <Text>
  //           {item.isWinner
  //             ? 'Winner'
  //             : blocksLeft
  //             ? item.isCapped
  //               ? 'Capped'
  //               : isOngoing
  //               ? 'Active'
  //               : 'Past'
  //             : 'Ended'}
  //         </Text> */}
  //        <Text>
  //           {'leases: '}
  //           {firstPeriod.eq(lastPeriod)
  //             ? formatNumber(firstPeriod)
  //             : `${formatNumber(firstPeriod)} - ${formatNumber(lastPeriod)}`}
  //         </Text>
  //       <View style={styles.alignEnd}>
  //         <Text>count: {formatNumber(contributions?.contributorsHex.length)}</Text>
  //       </View>

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text>CrowdLoan detail</Text>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
