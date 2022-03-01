import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {Text, Subheading, Headline, Button} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

type ScreenProps = {
  route: RouteProp<CrowdloansStackParamList, 'Fund Detail'>;
};

export function CrowdloanFundDetailScreen({route}: ScreenProps) {
  const {crowdloan} = route.params;
  if (!crowdloan) {
    return <Text>Something bad happened!</Text>;
  }

  const toHomepage = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <SafeView edges={noTopEdges}>
      <Layout style={globalStyles.paddedContainer}>
        <Headline style={styles.title}>{crowdloan.depositor.account.display}</Headline>
        <Row label={'Index'}>
          <Text>{crowdloan.paraId}</Text>
        </Row>
        <Row label={'Depositor'}>
          <AccountTeaser account={crowdloan.depositor.account} />
        </Row>
        <Row label={'Ending'}>
          <View style={styles.rowContainer}>
            {crowdloan.ending.map((end: string, i: number) => (
              <Text key={i}>{end}</Text>
            ))}
          </View>
        </Row>
        <Row label={'Status'}>
          <Text>{crowdloan.status}</Text>
        </Row>
        <Row label={'Leases'}>
          <Text>
            {Number(crowdloan.firstPeriod) === Number(crowdloan.lastPeriod)
              ? crowdloan.firstPeriod
              : `${crowdloan.firstPeriod} - ${crowdloan.lastPeriod}`}
          </Text>
        </Row>
        <Row label={'Raised'}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit>{`${crowdloan.formattedRaised} / ${crowdloan.formattedCap}`}</Text>
        </Row>
        <Row label={'Contributors'}>
          <Text>{crowdloan.contribution.contribution.contributorsCount}</Text>
        </Row>
        {crowdloan.homepage ? (
          <Button icon="home" onPress={() => toHomepage(crowdloan.homepage)}>
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
});
