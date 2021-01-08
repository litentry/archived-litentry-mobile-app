import React, {useState, useMemo, useContext, useCallback} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import {Hash} from '@polkadot/types/interfaces';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import PageModal from 'presentational/PageModal';
import usePolkascan, {
  mapMotion,
  MotionSummaryPSType,
} from 'src/hook/usePolkascan';
import MotionDetailPage from 'layout/MotionDetailPage';
import {NetworkContext} from 'context/NetworkContext';

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
    const {currentNetwork} = useContext(NetworkContext);
    const {get} = usePolkascan(currentNetwork?.key || 'polkadot');

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
