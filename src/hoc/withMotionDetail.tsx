import React, {useState, useMemo, useContext, useCallback} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import usePolkascan, {mapMotion, MotionSummaryPSType} from 'src/hook/usePolkascan';
import {NetworkContext} from 'context/NetworkContext';

export type InjectedPropTypes = {
  motionDetail: {
    show: (hash: string, votesId: number) => void;
    motion: ReturnType<typeof mapMotionDetail> | null;
  };
};

export function mapMotionDetail(deriveData: DeriveCollectiveProposal, polkascanData: MotionSummaryPSType) {
  return {
    ...polkascanData,
    ...deriveData,
    section: deriveData.proposal.section,
    methodName: deriveData.proposal.method,
  };
}

function withMotionDetail<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const [detail, setDetail] = useState<ReturnType<typeof mapMotionDetail> | null>(null);
    const {api} = useContext(ChainApiContext);
    const {currentNetwork} = useContext(NetworkContext);
    const {get} = usePolkascan(currentNetwork?.key || 'polkadot');

    const show = useCallback(
      (hash: string, votesId: number) => {
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
        show,
        motion: detail,
      }),
      [show, detail],
    );

    return (
      <>
        <Comp {...props} motionDetail={motionDetail} />
      </>
    );
  };
}

export default withMotionDetail;
