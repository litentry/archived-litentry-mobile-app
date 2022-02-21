// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// from https://github.com/polkadot-js/apps/blob/master/packages/react-hooks/src/useVotingStatus.ts

import {ApiPromise} from '@polkadot/api';
import {isFunction} from '@polkadot/util';
import BN from 'bn.js';
import {ChainApiContext} from 'context/ChainApiContext';
import {useContext, useMemo} from 'react';
import {useBestNumber} from './useBestNumber';

interface State {
  hasFailed: boolean;
  hasPassed: boolean;
  isCloseable: boolean;
  isVoteable: boolean;
  remainingBlocks: BN | null;
  status: string;
}

const DEFAULT_STATUS = {
  hasFailed: false,
  hasPassed: false,
  isCloseable: false,
  isVoteable: false,
  remainingBlocks: null,
  status: 'Open',
};

function getStatus(
  api: ApiPromise,
  bestNumber: any, // BestNumber
  votes: any, // substrateChainMotionVotes
  numMembers: number,
  section: 'council' | 'technicalCommittee',
): any {
  if (!votes.end) {
    return {
      hasFailed: false,
      hasPassed: false,
      isCloseable: false,
      isVoteable: true,
      remainingBlocks: null,
      status: 'Voteable',
    };
  }

  const isEnd = bestNumber.gte(votes.end);
  const hasPassed = votes.threshold.lten(votes.ayes.length);
  const hasFailed = votes.threshold.gtn(Math.abs(numMembers - votes.nays.length));
  const isCloseable = isFunction(api.tx[section].close)
    ? api.tx[section].close.meta.args.length === 4 // current-generation
      ? isEnd || hasPassed || hasFailed
      : isEnd
    : false;
  const isVoteable = !isEnd;

  const status = isCloseable
    ? 'Closable'
    : isVoteable
    ? 'Voteable'
    : hasFailed
    ? 'Closed'
    : hasPassed
    ? 'Passed'
    : 'Open';

  return {
    hasFailed,
    hasPassed,
    isCloseable,
    isVoteable,
    // remainingBlocks: isEnd ? null : votes.end.sub(bestNumber),
    status,
  };
}

export function useVotingStatus(
  votes: any | null | undefined,
  numMembers: number,
  section: 'council' | 'technicalCommittee',
): State {
  const {api} = useContext(ChainApiContext);
  if (!api) {
    throw new Error('API is not defined');
  }

  const bestNumber = useBestNumber();
  console.log(bestNumber);
  return useMemo(
    () => (bestNumber && votes ? getStatus(api, bestNumber, votes, numMembers, section) : DEFAULT_STATUS),
    [api, bestNumber, numMembers, section, votes],
  );
}
