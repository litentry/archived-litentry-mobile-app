import type {DeriveCollectiveProposal, DeriveElectionsInfo} from '@polkadot/api-derive/types';
import {AccountId, BlockNumber} from '@polkadot/types/interfaces';
import {bnToBn, formatNumber} from '@polkadot/util';
import BN from 'bn.js';
import useApiQuery from 'src/api/hooks/useApiQuery';

type ProcessedElectionDataType = {
  seatDisplay: string;
  runnersupDisplay: string;
  percentage: number;
  termDuration?: BlockNumber;
  termLeft?: BN;
};
export type InjectedPropTypes = {
  electionsInfo: {
    inProgress: boolean;
    data: ProcessedElectionDataType;
    raw?: DeriveElectionsInfo;
    prime?: AccountId;
    motions: DeriveCollectiveProposal[];
  };
};

const mapData = (electionsInfo: DeriveElectionsInfo, bestNumber: BlockNumber): ProcessedElectionDataType => {
  const total = bnToBn(electionsInfo.termDuration || 0);
  const value = bestNumber.mod(bnToBn(electionsInfo.termDuration || 0));
  const angle = total.gtn(0)
    ? bnToBn(value || 0)
        .muln(36000)
        .div(total)
        .toNumber() / 100
    : 0;
  const percentage = Math.floor((angle * 100) / 360);

  return {
    seatDisplay: `${electionsInfo.members.length}/${formatNumber(electionsInfo.desiredSeats)}`,
    runnersupDisplay: `${electionsInfo.runnersUp.length}/${formatNumber(electionsInfo.desiredRunnersUp)}`,
    percentage,
    termDuration: electionsInfo.termDuration,
    termLeft: total.sub(value),
  };
};

export function useElectionsInfo() {
  return useApiQuery('elections-info', async (api) => {
    const [electionsInfo, bestNumber, primeMember, motions] = await Promise.all([
      api.derive.elections.info(),
      api.derive.chain.bestNumber(),
      api.query.council.prime(),
      api.derive.council.proposals(),
    ]);

    return {
      data: mapData(electionsInfo, bestNumber),
      prime: primeMember.unwrapOr(undefined),
      motions,
    };
  });
}
