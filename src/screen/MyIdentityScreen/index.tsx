import {RouteProp, useRoute} from '@react-navigation/native';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useMemo} from 'react';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {myIdentityScreen} from 'src/navigation/routeKeys';
import DisplayJudgement from './DisplayJudgement';
import RequestJudgement from './RequestJudgement';
import SetInfo from './SetInfo';

function MyIdentity() {
  const {
    params: {address},
  } = useRoute<RouteProp<DashboardStackParamList, typeof myIdentityScreen>>();
  const {data, isLoading} = useAccountIdentityInfo(address);

  const content = useMemo(() => {
    if (isLoading || !address) {
      return <LoadingView />;
    }

    if (data?.hasJudgements) {
      return <DisplayJudgement display={data.display} registration={data.registration} address={address} />;
    }

    if (!data?.hasIdentity) {
      return <SetInfo address={address} />;
    }

    // there is `setIdentity`, but no judgements are provided
    return <RequestJudgement display={data?.display ?? ''} registration={data?.registration} address={address} />;
  }, [address, data, isLoading]);

  return <SafeView edges={noTopEdges}>{content}</SafeView>;
}

export default MyIdentity;
