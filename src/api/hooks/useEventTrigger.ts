import type {EventRecord} from '@polkadot/types/interfaces';
import type {AugmentedEvent} from '@polkadot/api/types';
import {useEffect, useState} from 'react';
import {useIsMountedRef} from 'src/hook/useIsMountedRef';
import useApiQuery from 'src/api/hooks/useApiQuery';

type EventCheck = AugmentedEvent<'promise'> | false | undefined | null;

interface Result {
  blockHash: string;
  events: EventRecord[];
}

const IDENTITY_FILTER = () => true;
const EMPTY_RESULT: Result = {
  blockHash: '',
  events: [],
};

export function useEventTrigger(
  _checks: EventCheck[],
  filter: (record: EventRecord) => boolean = IDENTITY_FILTER,
): Result {
  const [state, setState] = useState(() => EMPTY_RESULT);
  const [checks] = useState(() => _checks);
  const mountedRef = useIsMountedRef();
  const {data: eventRecords} = useApiQuery('', async (api) => {
    return await api.query.system.events();
  });

  useEffect((): void => {
    if (mountedRef.current && eventRecords) {
      const events = eventRecords.filter((r) => r.event && checks.some((c) => c && c.is(r.event)) && filter(r));

      if (events.length) {
        setState({
          blockHash: eventRecords.createdAtHash?.toHex() || '',
          events,
        });
      }
    }
  }, [eventRecords, checks, filter, mountedRef]);

  return state;
}
