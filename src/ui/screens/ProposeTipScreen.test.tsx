import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  AccountsStackParamList,
  AppStackParamList,
  CompleteNavigatorParamList,
  DashboardStackParamList,
} from '@ui/navigation/navigation';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ProposeTipScreen} from './ProposeTipScreen';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<DashboardStackParamList>;

test('render ProposeTipScreen component', () => {
  const {getByText} = render(<ProposeTipScreen navigation={navigation} />);
  expect(getByText('Sending from')).toBeTruthy();
  expect(getByText('Select the account you wish to submit the tip from')).toBeTruthy();
  expect(getByText('Beneficiary address')).toBeTruthy();
  expect(getByText('The account to which the tip will be transferred if approved')).toBeTruthy();
  expect(getByText('Tip reason')).toBeTruthy();
  expect(getByText('The reason why this tip should be paid.')).toBeTruthy();
  expect(getByText('Propose Tip')).toBeTruthy();
});

test('proposeTipScreen component testing for valid address', () => {
  const {getByPlaceholderText, queryAllByText} = render(<ProposeTipScreen navigation={navigation} />);
  expect(queryAllByText('Enter a valid address for Polkadot').length).toEqual(0);
  fireEvent.changeText(getByPlaceholderText('Account address'), '2588');
  expect(queryAllByText('Enter a valid address for Polkadot').length).toEqual(1);
  fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
  expect(queryAllByText('Enter a valid address for Polkadot').length).toEqual(0);
});
