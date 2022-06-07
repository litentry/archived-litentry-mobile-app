import {DashboardStackParamList} from '@ui/navigation/navigation';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {CouncilOverviewScreen} from './CouncilScreen';

jest.useFakeTimers();

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
  const {getByText, debug} = render(<CouncilOverviewScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('Candidate')).toBeTruthy();
    expect(getByText('Runners Up')).toBeTruthy();
    expect(getByText('Submit candidacy')).toBeTruthy();
    expect(getByText('Vote')).toBeTruthy();
    expect(getByText('Member')).toBeTruthy();
    expect(getByText('Prime voter')).toBeTruthy();
  });
});
