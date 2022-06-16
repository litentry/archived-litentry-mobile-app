import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {DemocracyProposalScreen} from './DemocracyProposalScreen';
import {democracyProposalScreen} from '@ui/navigation/routeKeys';

jest.useFakeTimers();

const route = {
  params: {
    proposal: {
      method: '',
      section: 'proposal',
      proposer: {
        account: '',
      },
      seconds: [],
    },
  },
} as unknown as RouteProp<DashboardStackParamList, typeof democracyProposalScreen>;

test('render the loading view when data is fetching', () => {
  const {getByText} = render(<DemocracyProposalScreen route={route} />);
  expect(getByText('Proposal Hash:')).toBeTruthy();
  expect(getByText('Proposer:')).toBeTruthy();
  expect(getByText('Locked:')).toBeTruthy();
  expect(getByText('Seconds:')).toBeTruthy();
  expect(getByText('Proposer:')).toBeTruthy();
  expect(getByText('Second')).toBeTruthy();
  expect(
    getByText(
      `The proposal is in the queue for future referendums. One proposal from this list will move forward to voting.`,
    ),
  ).toBeTruthy();
  expect(getByText('Seconding a proposal that indicates your backing for the proposal.')).toBeTruthy();
});

test('voting model open', () => {
  const {getByText} = render(<DemocracyProposalScreen route={route} />);
  expect(getByText('Second')).toBeTruthy();
  fireEvent.press(getByText('Second'));
});
