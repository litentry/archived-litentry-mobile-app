import {ApiPromise} from '@polkadot/api';
import Identicon from '@polkadot/reactnative-identicon';
import {formatBalance} from '@polkadot/util';
import {Icon, IconProps, Layout, ListItem, Text} from '@ui-kitten/components';
import JudgmentStatus from 'presentational/JudgmentStatus';
import LoadingView from 'presentational/LoadingView';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';
import {NetworkType} from 'src/types';

const {height} = Dimensions.get('window');

type PropTypes = {
  api?: ApiPromise;
  network: NetworkType;
  address: string;
};

const OnelineAddressStyle = {
  numberOfLines: 1,
  style: {width: '50%'},
};

function AddressInfoPreview(props: PropTypes) {
  const {address, network} = props;

  const {data} = useAccountIdentityInfo(address);
  const identity = data?.hasIdentity ? data.registration : undefined;
  const {data: accountInfo, isLoading} = useAccountInfo(address);

  return (
    <Layout style={styles.container}>
      {isLoading ? (
        <LoadingView text="Fetching Address Info" size="small" appearance="secondary" />
      ) : (
        <Layout>
          <ListItem
            title="Address"
            accessoryLeft={() => (
              <View style={{paddingHorizontal: 10}}>
                <Identicon value={address} size={20} />
              </View>
            )}
            accessoryRight={() => (
              <Text
                selectable
                category="label"
                {...OnelineAddressStyle}
                ellipsizeMode="middle"
                numberOfLines={1}
                style={{width: '50%'}}>
                {address}
              </Text>
            )}
          />
          <ListItem
            title="Display"
            accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="person-outline" />}
            accessoryRight={() => (
              <Text
                selectable
                category="label"
                numberOfLines={1}
                style={{width: '50%', textAlign: 'right'}}
                ellipsizeMode="middle">
                {data?.hasIdentity ? data.display : 'untitled account'}
              </Text>
            )}
          />
          {accountInfo?.data && (
            <ListItem
              title="Balance"
              accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="credit-card-outline" />}
              accessoryRight={() => (
                <Text selectable category="label">
                  {formatBalance(accountInfo.data.free.add(accountInfo.data.reserved))}
                </Text>
              )}
            />
          )}
          {identity &&
            identity.judgements[0] && ( // bug
              <ListItem
                title="Judgment"
                accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="ribbon-outline" pack="ionic" />}
                accessoryRight={() =>
                  identity?.judgements[0] ? <JudgmentStatus judgement={identity.judgements[0]} /> : <View />
                }
              />
            )}
          <ListItem
            title="Network"
            accessoryLeft={(iconProps: IconProps) => <Icon {...iconProps} name="planet" pack="ionic" />}
            accessoryRight={() => (
              <Text selectable category="label">
                {network.name}
              </Text>
            )}
          />
        </Layout>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {minHeight: height * 0.3},
});

export default AddressInfoPreview;
