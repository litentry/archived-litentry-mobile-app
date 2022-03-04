import {gql, useQuery} from '@apollo/client';
import {SubstrateChainCalendarEvent} from 'src/generated/litentryGraphQLTypes';

export type CalendarEvent = SubstrateChainCalendarEvent;

const CALENDAR_EVENTS_QUERY = gql`
  query getEvents {
    substrateChainCalendarEvents {
      id
      date
      title
      via
    }
  }
`;

export function useCalendarEvents() {
  const {data, ...rest} = useQuery<{substrateChainCalendarEvents: CalendarEvent[]}>(CALENDAR_EVENTS_QUERY);

  return {
    data: data?.substrateChainCalendarEvents,
    ...rest,
  };
}
