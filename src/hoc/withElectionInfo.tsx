import React, {useState, useMemo, useContext, useEffect} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import BN from 'bn.js';
import type {DeriveElectionsInfo, DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {formatNumber, bnToBn} from '@polkadot/util';
import {BlockNumber, AccountId} from '@polkadot/types/interfaces';

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
  const value = bestNumber.mod(electionsInfo.termDuration);
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

function withElectionInfo<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const [inProgress, setInProgress] = useState(false);
    const [data, setData] = useState<ProcessedElectionDataType>({
      seatDisplay: '',
      runnersupDisplay: '',
      percentage: 0,
      termDuration: undefined,
      termLeft: undefined,
    });
    const [raw, setRaw] = useState<DeriveElectionsInfo>();
    const [prime, setPrime] = useState<AccountId>();
    const [motions, setMotions] = useState<DeriveCollectiveProposal[]>([]);
    const {api} = useContext(ChainApiContext);

    useEffect(() => {
      if (api) {
        setInProgress(true);
        Promise.all([
          api.derive.elections.info(),
          api.derive.chain.bestNumber(),
          api.query.council.prime(),
          api.derive.council.proposals(),
        ]).then(([electionsInfo, bestNumber, primeMember, motionsData]) => {
          setRaw(electionsInfo);
          setData(mapData(electionsInfo, bestNumber));
          setPrime(primeMember.unwrapOr(undefined));
          setMotions(motionsData);
          setInProgress(false);
        });
      }
    }, [api]);

    const electionsInfo = useMemo(
      () => ({
        inProgress,
        data,
        raw,
        prime,
        motions,
      }),
      [inProgress, data, raw, prime, motions],
    );

    return <Comp {...props} electionsInfo={electionsInfo} />;
  };
}

export default withElectionInfo;
