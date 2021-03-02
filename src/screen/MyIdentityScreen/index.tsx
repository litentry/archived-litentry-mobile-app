import React, {useContext, useMemo} from 'react';
import {Text} from '@ui-kitten/components';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {useNavigation} from '@react-navigation/native';
import {AccountContext} from 'context/AccountContextProvider';
import {NetworkContext} from 'context/NetworkContext';
import {ChainApiContext} from 'context/ChainApiContext';
import useAccountDetail from 'src/hook/useAccountDetail';
import SetInfo from './SetInfo';
import RequestJudgement from './RequestJudgement';
import DisplayJudgement from './DisplayJudgement';

type PropTypes = {address: string};

function MyIdentity(props: PropTypes) {
  const navigation = useNavigation();

  const {accounts} = useContext(AccountContext);
  const {currentNetwork} = useContext(NetworkContext);
  const {api} = useContext(ChainApiContext);
  const account = accounts?.[0];
  const {display, isNaked, detail} = useAccountDetail(
    currentNetwork?.key || 'polkadot',
    account?.address,
    api,
  );

  const content = useMemo(() => {
    if (detail?.data?.judgements.length) {
      // there is already judgements to display
      return (
        <DisplayJudgement
          display={display}
          detail={detail}
          address={account?.address}
        />
      );
    }

    if (isNaked) {
      // there is not identity at all
      return <SetInfo />;
    }

    // there is `setIdentity`, but no judgements are provided
    return <RequestJudgement />;
  }, [isNaked, detail]);

  return (
    <GenericNavigationLayout
      title="My Identity"
      onBackPressed={() => navigation.goBack()}>
      {content}
    </GenericNavigationLayout>
  );
}

export default MyIdentity;
