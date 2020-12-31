import React, {
  useState,
  useMemo,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import {Hash} from '@polkadot/types/interfaces';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {Text} from '@ui-kitten/components';
import PageModal from 'presentational/PageModal';
import usePolkascan, {
  mapMotion,
  MotionSummaryPSType,
} from 'src/hook/usePolkascan';
import MotionDetailPage from 'layout/MotionDetailPage';

export type InjectedPropTypes = {
  motionDetail: {
    show: (hash: Hash, votesId: number) => void;
  };
};

export function mapMotionDetail(
  deriveData: DeriveCollectiveProposal,
  polkascanData: MotionSummaryPSType,
) {
  return {
    ...polkascanData,
    ...deriveData,
    section: deriveData.proposal.section,
    methodName: deriveData.proposal.methodName,
  };
}

function withMotionDetail<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const [inProgress, setInProgress] = useState(false);
    const [detail, setDetail] = useState<ReturnType<
      typeof mapMotionDetail
    > | null>(null);
    const {api} = useContext(ChainApiContext);
    const {get} = usePolkascan();

    const show = useCallback(
      (hash: Hash, votesId: number) => {
        setInProgress(true);

        Promise.all([
          api?.derive.council.proposal(hash),
          get(`council/motion/${votesId}?include=votes`).then(mapMotion),
        ]).then(([raw, polkascan]) => {
          if (raw) {
            setDetail(mapMotionDetail(raw, polkascan));
          }
        });
      },
      [api, get],
    );

    // useEffect(() => {
    //   show(
    //     '0x494a12921d5219628f44c86401c7c2e58fda487e3db5c6f452e0e29e3c324f2c',
    //     51,
    //   );
    // }, []);

    console.log(JSON.stringify(detail, null, 2));
    const motionDetail = useMemo(
      () => ({
        inProgress,
        show,
      }),
      [inProgress, show],
    );

    return (
      <>
        <Comp {...props} motionDetail={motionDetail} />
        <PageModal visible={detail !== null} onClose={() => setDetail(null)}>
          <MotionDetailPage motion={detail} onDismiss={() => setDetail(null)} />
        </PageModal>
      </>
    );
  };
}

export default withMotionDetail;
