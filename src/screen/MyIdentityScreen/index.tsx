import React, {useContext, useMemo} from 'react';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {useNavigation} from '@react-navigation/native';
import {AccountContext} from 'context/AccountContextProvider';
import {NetworkContext} from 'context/NetworkContext';
import {ChainApiContext} from 'context/ChainApiContext';
import useAccountDetail from 'src/hook/useAccountDetail';
import SetInfo from './SetInfo';
import RequestJudgement from './RequestJudgement';
import DisplayJudgement from './DisplayJudgement';
import LoadingView from 'presentational/LoadingView';

type PropTypes = {address: string};

function MyIdentity(props: PropTypes) {
  const navigation = useNavigation();

  const {accounts} = useContext(AccountContext);
  const {currentNetwork} = useContext(NetworkContext);
  const {api} = useContext(ChainApiContext);
  const account = accounts?.[0];
  const {inProgress, display, isNaked, detail} = useAccountDetail(
    currentNetwork?.key || 'polkadot',
    account?.address,
    api,
  );

  const content = useMemo(() => {
    if (inProgress || !account?.address) {
      return <LoadingView />;
    }

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
      return <SetInfo address={account?.address} />;
    }

    // there is `setIdentity`, but no judgements are provided
    return <RequestJudgement />;
  }, [inProgress, account, display, isNaked, detail]);

  return (
    <GenericNavigationLayout
      title="My Identity"
      onBackPressed={() => navigation.goBack()}>
      {content}
    </GenericNavigationLayout>
  );
}

export default MyIdentity;
