import React from 'react';
import {View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {List, Icon, Caption} from '@ui/library';
import {JudgmentStatus} from '@ui/components/Account/JudgmentStatus';
import LoadingView from '@ui/components/LoadingView';
import {useAccount} from 'src/api/hooks/useAccount';
import globalStyles from '@ui/styles';
import {stringShorten} from '@polkadot/util';
import {useNetwork} from '@atoms/network';

type PropTypes = {
  address: string;
};

const ItemLeft = (children: React.ReactNode) => () => <View style={globalStyles.justifyCenter}>{children}</View>;

const ItemRight = (children: React.ReactNode) => () =>
  (
    <View style={globalStyles.justifyCenter}>
      {typeof children === 'string' ? <Caption>{children}</Caption> : children}
    </View>
  );

export function AddressInfoPreview(props: PropTypes) {
  const {address} = props;
  const {currentNetwork} = useNetwork();
  const {data: accountInfo, loading} = useAccount(address);

  return (
    <View style={globalStyles.paddedContainer}>
      {loading && !accountInfo ? (
        <LoadingView text="Fetching Address Info" size="small" appearance="secondary" />
      ) : (
        <>
          <List.Item
            title="Address"
            left={ItemLeft(<Identicon value={address} size={20} />)}
            right={ItemRight(stringShorten(address))}
          />
          <List.Item
            title="Display"
            left={ItemLeft(<Icon name="account" size={20} />)}
            right={ItemRight(accountInfo?.display ? stringShorten(accountInfo?.display) : 'Untitled account')}
          />
          {accountInfo?.balance && (
            <List.Item
              title="Balance"
              left={ItemLeft(<Icon name="card-text-outline" size={20} />)}
              right={ItemRight(accountInfo.balance?.formattedFree)}
            />
          )}
          <List.Item
            title="Judgment"
            left={ItemLeft(<Icon name="hammer" size={20} />)}
            right={ItemRight(
              <>
                {accountInfo?.registration?.judgements && accountInfo?.registration?.judgements.length > 0 ? (
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
                ) : (
                  <Caption>No judgements provided</Caption>
                )}
              </>,
            )}
          />
          <List.Item
            title="Network"
            left={ItemLeft(<Icon name="earth" size={20} />)}
            right={ItemRight(currentNetwork.name)}
          />
        </>
      )}
    </View>
  );
}
