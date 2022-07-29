import React from 'react';
import {Referendums, Proposals} from './DemocracyScreen';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {democracyProposalDetailScreen, democracyReferendumDetailScreen} from '@ui/navigation/routeKeys';

const navigation = {
  navigate: () => jest.fn(),
} as unknown as NavigationProp<DashboardStackParamList>;

test('democracy referendums loading view', () => {
  const {getByTestId} = render(<Referendums navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('democracy referendums renders data correctly', async () => {
  const {findByText} = render(<Referendums navigation={navigation} />);

  await findByText('215');
  await findByText('Removal of eighteen (18) proposals on the public referenda queue');
  await findByText('Aye:');
  await findByText('4,185.1669 KSM');
  await findByText('Nay:');
  await findByText('0.0000 KSM');
  await findByText('SuperMajorityApprove');

  const navigationSpy = jest.spyOn(navigation, 'navigate');
  fireEvent.press(await findByText('215'));
  expect(navigationSpy).toBeCalledWith(democracyReferendumDetailScreen, {id: 'kusama:215'});
});

test('democracy proposals loading view', () => {
  const {getByTestId} = render(<Proposals navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('democracy referendums loading view', () => {
  const {getByTestId} = render(<Referendums navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('democracy proposals renders data correctly', async () => {
  const {findByText} = render(<Proposals navigation={navigation} />);

  await findByText('96');
  await findByText('Untitled - public proposal #96');
  await findByText('Deposit:');
  await findByText('0.0050 KSM');
  await findByText('Proposer:');
  await findByText('BrhnKcby61');

  const navigationSpy = jest.spyOn(navigation, 'navigate');
  fireEvent.press(await findByText('96'));
  expect(navigationSpy).toBeCalledWith(democracyProposalDetailScreen, {id: 'kusama:96'});
});
