import React, {useContext, useMemo} from 'react';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NetworkContext} from 'context/NetworkContext';
import {ChainApiContext} from 'context/ChainApiContext';
import useAccountDetail from 'src/hook/useAccountDetail';
import SetInfo from './SetInfo';
import RequestJudgement from './RequestJudgement';
import DisplayJudgement from './DisplayJudgement';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {DashboardStackParamList} from 'src/navigation/navigation';

function MyIdentity() {
  const {
    params: {address},
  } = useRoute<RouteProp<DashboardStackParamList, 'MyIdentity'>>();
  const navigation = useNavigation();

  const {currentNetwork} = useContext(NetworkContext);
  const {api} = useContext(ChainApiContext);
  const {inProgress, display, isNaked, detail} = useAccountDetail(currentNetwork?.key || 'polkadot', address, api);

  const content = useMemo(() => {
    if (inProgress || !address) {
      return <LoadingView />;
    }

    if (detail?.data?.judgements.length) {
      // there is already judgements to display
      return <DisplayJudgement display={display} detail={detail} address={address} />;
    }

    if (isNaked) {
      // there is not identity at all
      return <SetInfo address={address} />;
    }

    // there is `setIdentity`, but no judgements are provided
    return <RequestJudgement display={display} detail={detail} address={address} />;
  }, [inProgress, address, display, isNaked, detail]);

  return <SafeView edges={noTopEdges}>{content}</SafeView>;
}

export default MyIdentity;
