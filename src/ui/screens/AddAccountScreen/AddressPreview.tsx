import React from 'react';
import {View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {List, Icon, Caption} from '@ui/library';
import JudgmentStatus from '@ui/components/JudgmentStatus';
import LoadingView from '@ui/components/LoadingView';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {NetworkType} from 'src/types';
import globalStyles from '@ui/styles';
import {stringShorten} from '@polkadot/util';

type PropTypes = {
  network: NetworkType;
  address: string;
};

function AddressInfoPreview(props: PropTypes) {
  const {address, network} = props;
  const formatBalance = useFormatBalance();
  const {data} = useAccountIdentityInfo(address);
  const identity = data?.hasIdentity ? data.registration : undefined;
  const {data: accountInfo, isLoading} = useAccountInfo(address);

  return (
    <View style={globalStyles.paddedContainer}>
      {isLoading ? (
        <LoadingView text="Fetching Address Info" size="small" appearance="secondary" />
      ) : (
        <>
          <List.Item
            title="Address"
            left={() => (
              <View style={globalStyles.justifyCenter}>
                <Identicon value={address} size={20} />
              </View>
            )}
            right={() => <Caption>{stringShorten(address)}</Caption>}
          />
          <List.Item
            title="Display"
            left={() => (
              <View style={globalStyles.justifyCenter}>
                <Icon name="account" size={20} />
              </View>
            )}
            right={() => <Caption>{data?.hasIdentity ? data.display : 'untitled account'}</Caption>}
          />
          {accountInfo?.data && (
            <List.Item
              title="Balance"
              left={() => (
                <View style={globalStyles.justifyCenter}>
                  <Icon name="card-text-outline" size={20} />
                </View>
              )}
              right={() => <Caption>{formatBalance(accountInfo.data.free.add(accountInfo.data.reserved))}</Caption>}
            />
          )}
          {identity &&
            identity.judgements[0] && ( // bug
              <List.Item
                title="Judgment"
                left={() => (
                  <View style={globalStyles.justifyCenter}>
                    <Icon name="hammer" size={20} />
                  </View>
                )}
                right={() =>
                  identity?.judgements[0] ? (
                    <JudgmentStatus
                      judgement={identity.judgements[0]}
                      hasParent={Boolean(data?.registration?.parent)}
                    />
                  ) : (
                    <View />
                  )
                }
              />
            )}
          <List.Item
            title="Network"
            left={() => (
              <View style={globalStyles.justifyCenter}>
                <Icon name="earth" size={20} />
              </View>
            )}
            right={() => <Caption>{network.name}</Caption>}
          />
        </>
      )}
    </View>
  );
}

export default AddressInfoPreview;
