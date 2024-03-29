import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {render, fireEvent} from 'src/testUtils';
import {CandidateScreen} from './CandidateScreen';
import {Linking} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {accountScreen} from '@ui/navigation/routeKeys';

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

// TODO: https://github.com/litentry/litentry-app/issues/1331
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('candidateScreen', () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');

  const navigateSpy = jest.spyOn(navigation, 'navigate');

  const accountAddress = '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2';

  const accountInfo = {
    twitterId: '@nachortti',
    twitterURL: 'https://twitter.com/@nachortti',
    riotId: '@raul.rtti:matrix.parity.io',
    riotURL: 'https://matrix.to/#/@raul.rtti:matrix.parity.io',
    webURL: 'www.nachortti.com',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading screen when the data is fetching', () => {
    const {getByTestId} = render(<CandidateScreen navigation={navigation} route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the component after data is fetched with initial states ', async () => {
    const {findByText, queryByText} = render(<CandidateScreen navigation={navigation} route={route} />);
    await findByText('Legal');
    await findByText('Email');
    await findByText('Twitter');
    await findByText('Riot');
    await findByText('Web');
    await findByText('Backing');
    await findByText('Voters');
    expect(queryByText('No voters yet.')).not.toBe(null);
  });

  it('should navigate to the linked twitter url', async () => {
    const {findByText} = render(<CandidateScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(accountInfo.twitterId));
    expect(openURLSpy).toHaveBeenCalledWith(accountInfo.twitterURL);
  });

  it('should navigate to the linked riot url', async () => {
    const {findByText} = render(<CandidateScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(accountInfo.riotId));
    expect(openURLSpy).toHaveBeenCalledWith(accountInfo.riotURL);
  });

  it('should navigate to the linked web url', async () => {
    const {findByText} = render(<CandidateScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(accountInfo.webURL));
    expect(openURLSpy).toHaveBeenCalledWith(accountInfo.webURL);
  });

  it('should navigate to the account details page when clicked account', async () => {
    const {findAllByTestId} = render(<CandidateScreen navigation={navigation} route={route} />);
    const accountsInfo = (await findAllByTestId('accountsDetails')) as ReactTestInstance[];
    expect(accountsInfo.length).toBe(1);
    fireEvent.press(accountsInfo[0] as ReactTestInstance);
    expect(navigateSpy).toHaveBeenCalledWith(accountScreen, {
      address: accountAddress,
    });
  });
});
