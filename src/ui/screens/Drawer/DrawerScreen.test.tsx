import React from 'react';
import {DrawerNavigationState, ParamListBase} from '@react-navigation/native';
import {render, fireEvent} from 'src/testUtils';
import {DrawerScreen} from './DrawerScreen';
import {DrawerDescriptorMap, DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

const navigation = {
  navigate: () => jest.fn(),
  closeDrawer: () => jest.fn(),
} as unknown as DrawerNavigationHelpers;

const state = {
  routes: {},
} as DrawerNavigationState<ParamListBase>;

const descriptors = {} as DrawerDescriptorMap;

describe('DrawerScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render DrawerScreen with all the side navigation items', async () => {
    const {findByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);
    await findByText('Dashboard');
    await findByText('Registrars');
    await findByText('Tech. Committee');
    await findByText('Discussions');
    await findByText('Accounts');

    await findByText('Parachains');
    await findByText('Overview');
    await findByText('Parathreads');
    await findByText('Auctions');
    await findByText('Crowdloan');

    await findByText('Settings');
    await findByText('Dark theme');
    await findByText('Notifications');
    await findByText('Dev Kit');

    await findByText('About Litentry');
    await findByText('Feedback');
  });

  const drawerItems = [
    ['Dashboard', 'Dashboard'],
    ['Registrars', 'Registrars'],
    ['Tech. Committee', 'Technical Committee'],
    ['Discussions', 'PolkassemblyDiscussionsNavigator'],
    ['Accounts', 'AccountsNavigator'],
    ['Overview', 'ParachainsNavigator'],
    ['Parathreads', 'Parathreads'],
    ['Auctions', 'Auctions'],
    ['Crowdloan', 'CrowdloansNavigator'],
    ['Notifications', 'Notification'],
    ['Dev Kit', 'Dev Kit'],
    ['Crowdloan', 'CrowdloansNavigator'],
    ['Feedback', 'Feedback'],
  ];

  it.each(drawerItems)('should navigate to %s screen when pressed on %s item', async (item, routeKey) => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);
    fireEvent.press(await findByText(item as string));
    expect(navigationSpy).toBeCalledWith(routeKey, undefined);
  });

  it('should navigate to Webview when pressed on About Litentry', () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

    expect(getByText('About Litentry')).toBeTruthy();
    fireEvent.press(getByText('About Litentry'));
    expect(navigationSpy).toBeCalledWith('Webview', {
      title: 'About Litentry',
      uri: 'https://www.litentry.com',
    });
  });
});
