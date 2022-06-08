import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {render, waitFor, fireEvent, cleanup} from 'src/testUtils';
import {CandidateScreen} from './CandidateScreen';
import {Linking} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn(),
  setOptions: () => jest.fn(),
} as unknown as NavigationProp<AppStackParamList>;

const route = {
  params: {
    candidate: {
      account: {
        address: '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2',
        display: '🍺 Gav 🥃/🏛 Council 🏛',
      },
      backing: '137575256885404963',
      formattedBacking: '13.7575  MDOT',
      voters: [],
    },
    title: 'Prime voter',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Candidate'>;

test('should render loading state when fetching data', () => {
  const {getByTestId} = render(<CandidateScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('should render component when the data is fetched', async () => {
  const {getByText} = render(<CandidateScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Legal')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Twitter')).toBeTruthy();
    expect(getByText('Riot')).toBeTruthy();
    expect(getByText('Web')).toBeTruthy();
    expect(getByText('Backing')).toBeTruthy();
    expect(getByText('Voters')).toBeTruthy();
  });
});

test('twitter navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<CandidateScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Twitter')).toBeTruthy();
    fireEvent.press(getByText('@nachortti'));
    expect(openURLSpy).toBeCalled();
  });
});

test('riot navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<CandidateScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Riot')).toBeTruthy();
    fireEvent.press(getByText('@raul.rtti:matrix.parity.io'));
    expect(openURLSpy).toBeCalled();
  });
});

test('web navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<CandidateScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Web')).toBeTruthy();
    fireEvent.press(getByText('www.nachortti.com'));
    expect(openURLSpy).toBeCalled();
  });
});

test('web navigation', async () => {
  const navigateSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<CandidateScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('RTTI-5220 (POLKADOT)')).toBeTruthy();
    fireEvent.press(getByText('RTTI-5220 (POLKADOT)'));
    expect(navigateSpy).toBeCalled();
  });
});

test('account navigation', async () => {
  const navigateSpy = jest.spyOn(navigation, 'navigate');
  const {getAllByTestId} = render(<CandidateScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    const accountDetails = getAllByTestId('accountsDetails') as ReactTestInstance[];
    expect(accountDetails.length).toBe(1);
    fireEvent.press(accountDetails[0] as ReactTestInstance);
    expect(navigateSpy).toBeCalled();
  });
});
