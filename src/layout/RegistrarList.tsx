import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BN_ZERO, formatBalance} from '@polkadot/util';
import {Text} from '@ui-kitten/components';
import withRegistrarList, {InjectedPropTypes} from 'src/hoc/withRegistrarList';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import StatInfoBlock from 'presentational/StatInfoBlock';
import Padder from 'presentational/Padder';
import RegistrarTeaser from './RegistrarTeaser';

type PropTypes = {};

function RegistrarList(props: PropTypes & InjectedPropTypes) {
  const {registrars} = props;

  if (!registrars) {
    return (
      <View style={globalStyles.centeredContainer}>
        <Text>No Registrar available.</Text>
      </View>
    );
  }

  const validRegistrars = registrars.filter((registrar) => {
    // filter out the ones with fee is zero
    const unwraped = registrar.unwrapOr({fee: BN_ZERO, account: ''});
    return unwraped.fee.gt(BN_ZERO);
  });
  const sorted = validRegistrars.sort((a, b) => {
    if (
      a.unwrapOr({fee: BN_ZERO}).fee.toNumber() >
      b.unwrapOr({fee: BN_ZERO}).fee.toNumber()
    ) {
      return 1;
    }
    return -1;
  });
  const lowestFee = sorted[0].unwrapOr({fee: BN_ZERO});
  const highestFee = sorted[sorted.length - 1].unwrapOr({fee: BN_ZERO});

  return (
    <View style={globalStyles.paddedContainer}>
      <View style={styles.card}>
        <View style={globalStyles.spaceBetweenRowContainer}>
          <StatInfoBlock title="#Reg. Count">
            <Text style={styles.number}>{String(validRegistrars.length)}</Text>
          </StatInfoBlock>
          <StatInfoBlock title="Lowest Fee">
            {formatBalance(lowestFee.fee)}
          </StatInfoBlock>
          <StatInfoBlock title="Highest Fee">
            {formatBalance(highestFee.fee)}
          </StatInfoBlock>
        </View>
      </View>

      <Padder scale={1} />
      <Text category="h6">Registrar List</Text>
      <View style={styles.registrarList}>
        {validRegistrars.map((registrar) => {
          const unwraped = registrar.unwrapOr({fee: BN_ZERO, account: ''});

          return (
            <RegistrarTeaser
              key={unwraped.account.toString()}
              address={unwraped.account.toString()}
              fee={unwraped.fee}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {paddingVertical: standardPadding * 2},
  number: {
    fontSize: 20,
    fontFamily: monofontFamily,
    paddingVertical: standardPadding,
  },
  registrarList: {paddingVertical: standardPadding * 2},
});

export default withRegistrarList(RegistrarList);
