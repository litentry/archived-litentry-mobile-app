import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Layout, Text, Icon, IconProps, ListItem} from '@ui-kitten/components';
import {formatBalance} from '@polkadot/util';
import LoadingView from 'presentational/LoadingView';
import {ApiPromise} from '@polkadot/api';
import {u8aToString} from '@polkadot/util';
import {AccountInfo, Registration} from '@polkadot/types/interfaces';
import Identicon from '@polkadot/reactnative-identicon';
import JudgmentStatus from 'presentational/JudgmentStatus';
import {NetworkType} from 'src/types';

const {height} = Dimensions.get('window');

type PropTypes = {
  api?: ApiPromise;
  network: NetworkType;
  address: string;
};

function AddressInfoPreview(props: PropTypes) {
  const {address, api, network} = props;
  const [identity, setIdentity] = useState<Registration>();
  const [account, setAccount] = useState<AccountInfo>();
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    if (api && address) {
      setInProgress(true);
      Promise.all([
        api.query.identity.identityOf(address),
        api.query.system.account(address),
      ]).then(([iden, acc]) => {
        setIdentity(iden.unwrapOr(undefined));
        setAccount(acc);

        setInProgress(false);
      });
    }
  }, [address, api]);

  return (
    <Layout style={styles.container}>
      {inProgress ? (
        <LoadingView
          text="Fetching Address Info"
          size="small"
          appearance="secondary"
        />
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
                ellipsizeMode="middle"
                numberOfLines={1}
                style={{width: '50%'}}>
                {address}
              </Text>
            )}
          />
          <ListItem
            title="Display"
            accessoryLeft={(iconProps: IconProps) => (
              <Icon {...iconProps} name="person-outline" />
            )}
            accessoryRight={() => (
              <Text selectable category="label">
                {u8aToString(identity?.info.display.asRaw) ||
                  'untitled account'}
              </Text>
            )}
          />
          {account && (
            <ListItem
              title="Balance"
              accessoryLeft={(iconProps: IconProps) => (
                <Icon {...iconProps} name="credit-card-outline" />
              )}
              accessoryRight={() => (
                <Text selectable category="label">
                  {formatBalance(account.data.free.add(account.data.reserved))}
                </Text>
              )}
            />
          )}
          {identity &&
            identity.judgements[0] && ( // bug
              <ListItem
                title="Judgment"
                accessoryLeft={(iconProps: IconProps) => (
                  <Icon {...iconProps} name="ribbon-outline" pack="ionic" />
                )}
                accessoryRight={() => (
                  <JudgmentStatus judgement={identity.judgements[0]} />
                )}
              />
            )}
          <ListItem
            title="Network"
            accessoryLeft={(iconProps: IconProps) => (
              <Icon {...iconProps} name="planet" pack="ionic" />
            )}
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
