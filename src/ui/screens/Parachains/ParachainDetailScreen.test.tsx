import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppStackParamList, ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {fireEvent, render} from 'src/testUtils';
import {ParachainDetailScreen} from './ParachainDetailScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AppStackParamList>;

const route = {
  params: {
    parachainId: '2004',
  },
} as unknown as RouteProp<ParachainsStackParamList, 'Parachain'>;

describe('ParachainDetailScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading component view when data is fetching', () => {
    const {getByTestId} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the ParachainDetailScreen component view when data is fetched', async () => {
    const {findByText} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
    await findByText('Moonbeam');
    await findByText('Included');
    await findByText('Backed');
    await findByText('10482897');
    await findByText('Lease');
    await findByText('7 - 13');
    await findByText('Lifecycle');
    await findByText('512 days 30 mins');
    await findByText('Homepage');
    await findByText('Val. Group (0)');
    await findByText('Non-Voters (1)');
  });

  it('should navigate to account screen on press of account', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
    await findByText('Moonbeam');
    fireEvent.press(await findByText('111B8CXCMN…6SRFDMYC3S'));
    expect(navigationSpy).toHaveBeenCalledWith('Account Details', {
      address: '111B8CxcmnWbuDLyGvgUmRezDCK1brRZmvUuQ6SrFdMyc3S',
    });
  });

  it('should open homepage of parachain when pressed on homepage', async () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {findByText} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText('Homepage'));
    expect(linkingSpy).toHaveBeenCalledWith('https://moonbeam.network/networks/moonbeam/');
  });
});
