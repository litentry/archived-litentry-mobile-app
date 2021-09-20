import {BN_ZERO} from '@polkadot/util';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Text, useTheme} from '@ui-kitten/components';
import Icon from 'presentational/Icon';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useBalance} from 'src/api/hooks/useBalance';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {AccountsStackParamList, CompleteNavigatorParamList} from 'src/navigation/navigation';
import {identityGuideScreen, myIdentityScreen} from 'src/navigation/routeKeys';
import {standardPadding} from 'src/styles';

export function MyAccountScreen({
  navigation,
  route: {
    params: {address},
  },
}: {
  navigation: NavigationProp<CompleteNavigatorParamList>;
  route: RouteProp<AccountsStackParamList, typeof myIdentityScreen>;
}) {
  const {data} = useAccountIdentityInfo(address);
  const formatBalance = useFormatBalance();
  const balance = useBalance({address});
  const theme = useTheme();

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <View style={[styles.box, {backgroundColor: theme['background-basic-color-2']}]}>
          <Row title="Display Name" value={data?.display} />
          <Padder scale={1} />
          <Row title="Address" value={address} />
          <Padder scale={1} />
          <Row title="Balance" value={formatBalance(balance?.data.free ?? BN_ZERO)} />
          <Padder scale={1} />
          <Row
            title="identity"
            value={
              <View>
                <Text category="c1">{data?.hasIdentity ? 'Identity Data Found' : 'No Identity Data Found'}</Text>
                {data?.hasIdentity && data.hasJudgements ? (
                  <Text category="c1">{`${data.registration.judgements.length} Judgements`}</Text>
                ) : null}
              </View>
            }
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate(myIdentityScreen, {address});
            navigation.navigate(identityGuideScreen);
          }}>
          <View style={[styles.iconContainer, {backgroundColor: theme['color-basic-500']}]}>
            <Icon style={styles.icon} fill={theme['text-basic-color']} name="settings-2" />
          </View>
          <Padder scale={2} />
          <Text category="h6">Manage Identity</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

function Row({title, value}: {title: string; value?: string | React.ReactChild}) {
  return (
    <View style={styles.row}>
      <Text category="c2">{title}: </Text>
      {typeof value === 'string' ? (
        <Text category="c1" numberOfLines={1} ellipsizeMode="middle" style={styles.rowValue}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  box: {
    padding: standardPadding * 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
  iconContainer: {
    borderRadius: 100,
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  row: {flexDirection: 'row', alignItems: 'flex-start'},
  rowValue: {
    flexShrink: 1,
  },
});
