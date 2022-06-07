import {DashboardStackParamList} from '@ui/navigation/navigation';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {CouncilOverviewScreen} from './CouncilScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn(),
  setOptions: () => jest.fn(),
} as unknown as NavigationProp<DashboardStackParamList>;

test('should render loading state when fetching data', () => {
  const {getByTestId} = render(<CouncilOverviewScreen navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('should render component when data is fetched', async () => {
  const {getByText} = render(<CouncilOverviewScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('Submit candidacy')).toBeTruthy();
    expect(getByText('Vote')).toBeTruthy();
    expect(getByText('Runners Up 17/20')).toBeTruthy();
    expect(getByText('Prime voter')).toBeTruthy();
    expect(getByText('RTTI-5220 (POLKADOT)')).toBeTruthy();
  });
});

test('navigation test case', async () => {
  const navigateSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<CouncilOverviewScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('RTTI-5220 (POLKADOT)')).toBeTruthy();
    fireEvent.press(getByText('RTTI-5220 (POLKADOT)'));
    expect(navigateSpy).toBeCalledTimes(1);
  });
});
