import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, fireEvent, waitFor} from 'src/testUtils';
import DashboardScreen from './DashboardScreen';

const navigation = {
  navigate: () => jest.fn(),
  canGoBack: () => jest.fn(),
} as unknown as NativeStackNavigationProp<DashboardStackParamList, 'Dashboard'>;

const route = {} as RouteProp<DashboardStackParamList, 'Dashboard'>;

const navigationSpy = jest.spyOn(navigation, 'navigate');

describe('DashboardScreen', () => {
  it('should render all the loading view while data is fetching', () => {
    const {getAllByTestId} = render(<DashboardScreen navigation={navigation} route={route} />);
    expect(getAllByTestId('loading_box').length).toBe(5);
  });

  it('should render various teaser component when data is fetched', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);
    await findByText('Upcoming events');
    await findByText('Democracy');
    await findByText('Council');
    await findByText('Treasury');
    await findByText('Bounties');
  });

  it('should test onPress prop functionality of upcoming events', async () => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);

    const sectionTitle = 'Upcoming events';
    await waitFor(async () => {
      await findByText(sectionTitle);
    });

    const events = await findByText(sectionTitle);
    fireEvent.press(events);
    expect(navigationSpy).toBeCalledWith('Events');
  });

  const sections = ['Democracy', 'Council', 'Treasury', 'Bounties'];
  it.each(sections)('should test onPress prop functionality of %s', async (expected) => {
    const {findByText} = render(<DashboardScreen navigation={navigation} route={route} />);

    await waitFor(async () => {
      await findByText(expected);
    });

    const expectedTeaser = await findByText(expected);
    fireEvent.press(expectedTeaser);
    expect(navigationSpy).toBeCalledWith(expected);
  });
});
