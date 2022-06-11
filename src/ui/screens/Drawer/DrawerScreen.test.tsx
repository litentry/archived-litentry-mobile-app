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

test('render DrawerScreen', () => {
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);
  expect(getByText('Dashboard')).toBeTruthy();
  expect(getByText('Registrars')).toBeTruthy();
  expect(getByText('Tech. Committee')).toBeTruthy();
  expect(getByText('Discussions')).toBeTruthy();
  expect(getByText('Accounts')).toBeTruthy();

  expect(getByText('Parachains')).toBeTruthy();
  expect(getByText('Overview')).toBeTruthy();
  expect(getByText('Parathreads')).toBeTruthy();
  expect(getByText('Auctions')).toBeTruthy();
  expect(getByText('Crowdloan')).toBeTruthy();

  expect(getByText('Settings')).toBeTruthy();
  expect(getByText('Dark theme')).toBeTruthy();
  expect(getByText('Notifications')).toBeTruthy();
  expect(getByText('Dev Kit')).toBeTruthy();

  expect(getByText('About Litentry')).toBeTruthy();
  expect(getByText('Feedback')).toBeTruthy();
});

test('drawerScreen and navigation case Dashboard', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Dashboard')).toBeTruthy();
  fireEvent.press(getByText('Dashboard'));
  expect(navigationSpy).toBeCalledWith('Dashboard', undefined);
});

test('drawerScreen and navigation case Registrars', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Registrars')).toBeTruthy();
  fireEvent.press(getByText('Registrars'));
  expect(navigationSpy).toBeCalledWith('Registrars', undefined);
});

test('drawerScreen and navigation case technical committee', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Tech. Committee')).toBeTruthy();
  fireEvent.press(getByText('Tech. Committee'));
  expect(navigationSpy).toBeCalledWith('Technical Committee', undefined);
});

test('drawerScreen and navigation case Discussions', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Discussions')).toBeTruthy();
  fireEvent.press(getByText('Discussions'));
  expect(navigationSpy).toBeCalledWith('PolkassemblyDiscussionsNavigator', undefined);
});

test('drawerScreen and navigation case Accounts', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Accounts')).toBeTruthy();
  fireEvent.press(getByText('Accounts'));
  expect(navigationSpy).toBeCalledWith('AccountsNavigator', undefined);
});
test('drawerScreen and navigation case Overview', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Overview')).toBeTruthy();
  fireEvent.press(getByText('Overview'));
  expect(navigationSpy).toBeCalledWith('ParachainsNavigator', undefined);
});

test('drawerScreen and navigation case Parathreads', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Parathreads')).toBeTruthy();
  fireEvent.press(getByText('Parathreads'));
  expect(navigationSpy).toBeCalledWith('ParachainsNavigator', undefined);
});

test('drawerScreen and navigation case Auctions', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Auctions')).toBeTruthy();
  fireEvent.press(getByText('Auctions'));
  expect(navigationSpy).toBeCalledWith('Auctions', undefined);
});

test('drawerScreen and navigation case Crowdloan', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Crowdloan')).toBeTruthy();
  fireEvent.press(getByText('Crowdloan'));
  expect(navigationSpy).toBeCalledWith('CrowdloansNavigator', undefined);
});

test('drawerScreen and navigation case notifications', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Notifications')).toBeTruthy();
  fireEvent.press(getByText('Notifications'));
  expect(navigationSpy).toBeCalledWith('Notification', undefined);
});

test('drawerScreen and navigation case dev-kit', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Dev Kit')).toBeTruthy();
  fireEvent.press(getByText('Dev Kit'));
  expect(navigationSpy).toBeCalledWith('Dev Kit', undefined);
});

test('drawerScreen and navigation case litentry', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('About Litentry')).toBeTruthy();
  fireEvent.press(getByText('About Litentry'));
  expect(navigationSpy).toBeCalledWith('Webview', {
    title: 'About Litentry',
    uri: 'https://www.litentry.com',
  });
});

test('drawerScreen and navigation case feedback', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<DrawerScreen navigation={navigation} state={state} descriptors={descriptors} />);

  expect(getByText('Feedback')).toBeTruthy();
  fireEvent.press(getByText('Feedback'));
  expect(navigationSpy).toBeCalledWith('Feedback', undefined);
});
