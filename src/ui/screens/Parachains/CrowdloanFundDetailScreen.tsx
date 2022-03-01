import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {Text, Button, Subheading, Headline} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {useParachainCrowdloan} from 'src/api/hooks/useParachainCrowdloan';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

type ScreenProps = {
  route: RouteProp<CrowdloansStackParamList, 'Fund Detail'>;
};

export function CrowdloanFundDetailScreen({route}: ScreenProps) {
  const {paraId, title} = route.params;
  const {data, loading} = useParachainCrowdloan(paraId);

  const toHomepage = React.useCallback((url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }, []);

  if (loading && !data) {
    return <LoadingView />;
  }

  if (!data) {
    return <EmptyView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <Layout style={globalStyles.paddedContainer}>
        <Headline style={styles.title}>{title}</Headline>
        <Row label={'Index'}>
          <Text>{data.paraId}</Text>
        </Row>
        <Row label={'Depositor'}>
          <AccountTeaser account={data.depositor.account} />
        </Row>
        <Row label={'Ending'}>
          <Text>{`${data.ending[0]} ${data.ending[1]}`}</Text>
        </Row>
        <Row label={'Status'}>
          <Text>{data.status}</Text>
        </Row>
        <Row label={'Leases'}>
          <Text>{`${data.firstPeriod} - ${data.lastPeriod}`}</Text>
        </Row>
        <Row label={'Raised'}>
          <Text numberOfLines={1} adjustsFontSizeToFit>{`${data.formattedRaised} / ${data.formattedCap}`}</Text>
        </Row>
        <Row label={'Contributors'}>
          <Text>{data.contribution.contribution.contributorsCount}</Text>
        </Row>
        {data.homepage ? (
          <Button
            icon="home"
            onPress={() => {
              toHomepage(String(data.homepage));
            }}>
            {`Homepage`}
          </Button>
        ) : null}
      </Layout>
    </SafeView>
  );
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Subheading style={styles.rowLabel}>{label}:</Subheading>
      <View style={styles.value}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: standardPadding * 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding * 2,
  },
  rowLabel: {
    width: '35%',
  },
  value: {
    flex: 1,
  },
});
