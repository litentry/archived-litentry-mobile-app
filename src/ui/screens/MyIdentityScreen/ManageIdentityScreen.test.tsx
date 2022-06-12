import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {ManageIdentityScreen} from './ManageIdentityScreen';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import {Alert, Linking} from 'react-native';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {ReactTestInstance} from 'react-test-renderer';

jest.useFakeTimers();

const navigation = {
  navigate: () => jest.fn(),
  setOptions: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    address: '',
  },
} as RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;

test('render the loading view when data is fetching', async () => {
  const {getByText, getAllByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Address')).toBeTruthy();
    expect(getAllByText('Email')).toBeTruthy();
    expect(getAllByText('Twitter')).toBeTruthy();
    expect(getByText('Legal')).toBeTruthy();
    expect(getAllByText('Web')).toBeTruthy();
    expect(getAllByText('Update Identity')).toBeTruthy();
    expect(getAllByText('Web')).toBeTruthy();
    expect(getAllByText('Request Judgement')).toBeTruthy();
    expect(getAllByText('Set Sub-identities')).toBeTruthy();
    expect(getAllByText('Clear Identity')).toBeTruthy();
  });
});

test('twitter navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('@purestakeco')).toBeTruthy();
    fireEvent.press(getByText('@purestakeco'));
    expect(openURLSpy).toBeCalled();
  });
});

test('web navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('https://www.purestake.com/')).toBeTruthy();
    fireEvent.press(getByText('https://www.purestake.com/'));
    expect(openURLSpy).toBeCalled();
  });
});

test('set sub-identities navigation', async () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Set Sub-identities')).toBeTruthy();
    fireEvent.press(getByText('Set Sub-identities'));
    expect(navigationSpy).toBeCalledTimes(1);
  });
});

test('clear identity alert', async () => {
  const alertSpy = jest.spyOn(Alert, 'alert');
  const {getByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Clear Identity')).toBeTruthy();
    fireEvent.press(getByText('Clear Identity'));
    expect(alertSpy).toBeCalledTimes(1);
  });
});

test('Manage Identity bottomSheet', async () => {
  // TODO: button not getting clicked and look into how to mock the bottomsheets

  // const bottomSheetSpy = jest.spyOn(useBottomSheet, 'expand')
  const {getByText, debug, getAllByA11yRole} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Clear Identity')).toBeTruthy();
    fireEvent.press(getAllByA11yRole('button')[3] as ReactTestInstance);
    // expect(bottomSheetSpy).toHaveBeenCalled()
  });
});
