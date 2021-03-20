import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BN_ZERO, formatBalance} from '@polkadot/util';
import {Text} from '@ui-kitten/components';
import withRegistrarList, {
  InjectedPropTypes,
  getValidRegistrars,
  getSortedRegistrars,
} from 'src/hoc/withRegistrarList';
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

  const validRegistrars = getValidRegistrars(registrars);
  const sorted = getSortedRegistrars(validRegistrars);
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
