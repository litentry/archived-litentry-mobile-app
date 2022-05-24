import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {MotionsScreen} from './MotionsScreen';

const navigation = {
  navigate: () => jest.fn,
} as unknown as NavigationProp<DashboardStackParamList>;

test('should render loading state when fetching data', () => {
  const {getByTestId} = render(<MotionsScreen navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('should render motion data after data is fetched', async () => {
  const {getByText, getAllByText, getAllByTestId} = render(<MotionsScreen navigation={navigation} />);
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const polkassemblySpy = jest.spyOn(Linking, 'canOpenURL');

  await waitFor(() => {
    expect(getByText('Proposer:')).toBeTruthy();
    expect(getByText('Payout:')).toBeTruthy();
    expect(getByText('Beneficiary:')).toBeTruthy();
    expect(getByText('Bond:')).toBeTruthy();
    expect(getByText('#181')).toBeTruthy();
    expect(getByText('proposalId: 103')).toBeTruthy();

    expect(getAllByText('EncodeClub').length).toBe(2);

    const motionTestID = getAllByTestId('motion-container')[0] as ReactTestInstance;
    fireEvent.press(motionTestID);
    expect(navigationSpy).toHaveBeenCalledTimes(1);

    const polkaAssembly = getAllByText('Polkassembly')[0] as ReactTestInstance;
    fireEvent.press(polkaAssembly);
    expect(polkassemblySpy).toHaveBeenCalledTimes(1);
  });
});
