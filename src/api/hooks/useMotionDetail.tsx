import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {NetworkContext} from 'context/NetworkContext';
import {useContext} from 'react';
import useApiQuery from 'src/api/hooks/useApiQuery';
import usePolkascan, {mapMotion, MotionSummaryPSType} from 'src/hook/usePolkascan';

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

export function useMotionDetail({hash, id}: {hash: string; id: number}) {
  const {currentNetwork} = useContext(NetworkContext);
  const {get} = usePolkascan(currentNetwork?.key || 'polkadot');

  return useApiQuery('motion-detail', async (api) => {
    const [raw, polkascan] = await Promise.all([
      api.derive.council.proposal(hash),
      get(`council/motion/${id}?include=votes`).then(mapMotion),
    ]);
    if (raw) {
      return mapMotionDetail(raw, polkascan);
    }
  });
}
