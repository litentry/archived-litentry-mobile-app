import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, fireEvent} from 'src/testUtils';
import DashboardScreen from './DashboardScreen';

const navigation = {
  navigate: () => jest.fn(),
  canGoBack: () => jest.fn(),
} as unknown as NativeStackNavigationProp<DashboardStackParamList, 'Dashboard'>;

const route = {} as RouteProp<DashboardStackParamList, 'Dashboard'>;

const navigationSpy = jest.spyOn(navigation, 'navigate');

jest.mock('src/hooks/useParachainAppEnabled', () => ({
  useParachainAppEnabled: () => {
    return {parachainAppEnabled: false};
  },
}));

describe('DashboardScreen', () => {
  it('should render all the loading view while data is fetching', () => {
    const {getAllByTestId} = render(<DashboardScreen navigation={navigation} route={route} />);
    expect(getAllByTestId('loading_box').length).toBe(5);
  });

  test('should render various teaser component when data is fetched', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Upcoming events');
    await findByText('Democracy');
    await findByText('Council');
    await findByText('Treasury');
    await findByText('Bounties');
  });

  test('should navigate to eventsCalendarScreen when clicked on upcoming events teaser', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Democracy');
    const upcomingEvents = await findByText('Upcoming events');
    fireEvent.press(upcomingEvents);
    expect(navigationSpy).toBeCalledWith('Events');
  });

  it('should navigate to democracyScreen when clicked on Democracy teaser', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Upcoming events');
    const democracy = await findByText('Democracy');
    fireEvent.press(democracy);
    expect(navigationSpy).toBeCalledWith('Democracy');
  });

  it('should navigate to councilScreen when clicked on council teaser', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Upcoming events');
    const council = await findByText('Council');
    fireEvent.press(council);
    expect(navigationSpy).toBeCalledWith('Council');
  });

  it('should navigate to treasuryScreen when clicked on treasury teaser', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Upcoming events');
    const treasury = await findByText('Treasury');
    fireEvent.press(treasury);
    expect(navigationSpy).toBeCalledWith('Treasury');
  });

  test('should navigate to bountiesScreen when clicked on bounty teaser', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Upcoming events');
    const bounties = await findByText('Bounties');
    fireEvent.press(bounties);
    expect(navigationSpy).toBeCalledWith('Bounties');
  });
});
