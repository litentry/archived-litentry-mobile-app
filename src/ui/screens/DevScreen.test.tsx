import React from 'react';
import {Notification} from 'react-native-in-app-message';
import {ReactTestInstance} from 'react-test-renderer';
import {fireEvent, render} from 'src/testUtils';
import DevScreen from './DevScreen';

jest.useFakeTimers();

test('render the DevScreen component', () => {
  const {getByText, getAllByText} = render(<DevScreen />);
  expect(getByText('Network: Polkadot')).toBeTruthy();
  expect(getByText('wss://rpc.polkadot.io')).toBeTruthy();
  expect(getByText('Active account:')).toBeTruthy();
  expect(getByText('Simple Notification')).toBeTruthy();
  expect(getByText('Show simple text in app PN')).toBeTruthy();
  expect(getAllByText('Trigger').length).toBe(2);
  expect(getByText('Show multi-lines Notification')).toBeTruthy();
  expect(getByText('Show multi-lines In-App-PusNotification')).toBeTruthy();
});

test('test sample notification', () => {
  // const notificationSpy = jest.spyOn(Notification, "show")
  const {getAllByText} = render(<DevScreen />);
  expect(getAllByText('Trigger').length).toBe(2);
  fireEvent.press(getAllByText('Trigger')[0] as ReactTestInstance);
  fireEvent.press(getAllByText('Trigger')[1] as ReactTestInstance);
});
