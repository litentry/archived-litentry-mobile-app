import React from 'react';
import {View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {List, Icon, Caption} from '@ui/library';
import {JudgmentStatus} from '@ui/components/Account/JudgmentStatus';
import LoadingView from '@ui/components/LoadingView';
import {useAccount} from 'src/api/hooks/useAccount';
import {NetworkType} from 'src/types';
import globalStyles from '@ui/styles';
import {stringShorten} from '@polkadot/util';

type PropTypes = {
  network: NetworkType;
  address: string;
};

function AddressInfoPreview(props: PropTypes) {
  const {address, network} = props;
  const {data: accountInfo, loading} = useAccount(address);

  return (
    <View style={globalStyles.paddedContainer}>
      {loading && !accountInfo ? (
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
            right={() => <Caption>{accountInfo?.display ?? 'Untitled account'}</Caption>}
          />
          {accountInfo?.balance && (
            <List.Item
              title="Balance"
              left={() => (
                <View style={globalStyles.justifyCenter}>
                  <Icon name="card-text-outline" size={20} />
                </View>
              )}
              right={() => <Caption>{accountInfo.balance?.formattedFree}</Caption>}
            />
          )}
          <List.Item
            title="Judgment"
            left={() => (
              <View style={globalStyles.justifyCenter}>
                <Icon name="hammer" size={20} />
              </View>
            )}
            right={() =>
              accountInfo?.registration?.judgements?.map((judgment, i) => {
                if (judgment) {
                  return (
                    <JudgmentStatus
                      key={i}
                      registrationJudgement={judgment}
                      hasParent={Boolean(accountInfo?.registration?.displayParent)}
                    />
                  );
                }
              })
            }
          />
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
