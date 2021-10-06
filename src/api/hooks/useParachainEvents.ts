import {useEffect, useState} from 'react';
import {useLastBlock} from './useLastBlock';
import type BN from 'bn.js';
import {useApi} from 'context/ChainApiContext';
import type {IEvent} from '@polkadot/types/types';
import type {CandidateReceipt} from '@polkadot/types/interfaces';

interface EventMapInfo {
  blockHash?: string;
  blockNumber?: BN;
  relayParent: string;
}

type EventMap = Record<string, EventMapInfo>;

interface LastEvents {
  lastBacked: EventMap;
  lastIncluded: EventMap;
  lastTimeout: EventMap;
}

const EMPTY_EVENTS: LastEvents = {lastBacked: {}, lastIncluded: {}, lastTimeout: {}};

function includeEntry(map: EventMap, event: Event, blockHash?: string, blockNumber?: BN): void {
  const {descriptor} = (event as unknown as IEvent<[CandidateReceipt]>).data[0];

  if (descriptor) {
    map[descriptor.paraId.toString()] = {
      blockHash,
      blockNumber,
      relayParent: descriptor.relayParent.toHex(),
    };
  }
}

export function useParachainEvents() {
  const [lastEvents, setLastEvents] = useState<LastEvents>(EMPTY_EVENTS);
  const lastBlock = useLastBlock();
  const {api} = useApi();

  useEffect(() => {
    const backed: EventMap = {};
    const included: EventMap = {};
    const timeout: EventMap = {};
    const blockNumber = lastBlock?.block.header.number.unwrap();
    const blockHash = lastBlock?.block.header.hash.toHex();

    lastBlock?.events.forEach(({event, phase}) => {
      const paraInclusion = api?.events?.paraInclusion || api?.events?.parasInclusion || api?.events?.inclusion;
      if (phase.isApplyExtrinsic) {
        if (paraInclusion?.CandidateBacked?.is(event)) {
          includeEntry(backed, event, blockHash, blockNumber);
        } else if (paraInclusion?.CandidateIncluded?.is(event)) {
          includeEntry(included, event, blockHash, blockNumber);
        } else if (paraInclusion?.CandidateTimedOut?.is(event)) {
          includeEntry(timeout, event, blockHash, blockNumber);
        }
      }
    });

    setLastEvents((prev) => {
      return {
        lastBacked: {...prev.lastBacked, ...backed},
        lastIncluded: {...prev.lastIncluded, ...included},
        lastTimeout: {...prev.lastTimeout, ...timeout},
      };
    });
  }, [api, lastBlock]);

  return lastEvents;
}
