import {graphql} from 'msw';

export const eventsCalendarHandler = graphql.query('getEvents', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCalendarEvents: [
        {
          __typename: 'SubstrateChainCalendarEvent',
          id: 'stakingEpoch',
          date: '2022-04-13T11:36:20.024Z',
          title: 'Start of a new staking session 4,121',
          via: 'via Staking',
        },
        {
          __typename: 'SubstrateChainCalendarEvent',
          id: 'stakingEra',
          date: '2022-04-13T15:36:20.024Z',
          title: 'Start of a new staking era 681',
          via: 'via Staking',
        },
        {
          __typename: 'SubstrateChainCalendarEvent',
          id: 'councilElection',
          date: '2022-04-15T01:10:49.323Z',
          title: 'Election of new council candidates',
          via: 'via Council',
        },
      ],
    }),
  );
});
