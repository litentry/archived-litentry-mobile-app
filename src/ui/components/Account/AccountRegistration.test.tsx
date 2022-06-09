import React from 'react';
import {render, fireEvent, waitFor} from 'src/testUtils';
import {AccountRegistration} from './AccountRegistration';
import {AccountRegistration as SubstrateChainAccountRegistration} from 'src/api/hooks/useAccount';
import {Linking} from 'react-native';

const registration = {
  display: '01',
  displayParent: 'PureStake',
  email: 'info@purestake.com',
  image: null,
  legal: 'PureStake Ltd',
  pgp: null,
  riot: '@purestakeco:matrix.parity.io',
  twitter: '@purestakeco',
  web: 'https://www.purestake.com/',
  judgements: [
    {
      registrarIndex: 1,
      judgement: {
        isUnknown: false,
        isFeePaid: false,
        isReasonable: true,
        isKnownGood: false,
        isOutOfDate: false,
        isLowQuality: false,
        isErroneous: false,
      },
    },
  ],
} as SubstrateChainAccountRegistration;

test('render the component with data', () => {
  const {getByText} = render(<AccountRegistration registration={registration} />);
  expect(getByText('Legal')).toBeTruthy();
  expect(getByText('Email')).toBeTruthy();
  expect(getByText('Twitter')).toBeTruthy();
  expect(getByText('Riot')).toBeTruthy();
  expect(getByText('Web')).toBeTruthy();
});

test('twitter navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<AccountRegistration registration={registration} />);
  await waitFor(() => {
    expect(getByText('Twitter')).toBeTruthy();
    fireEvent.press(getByText('@purestakeco'));
    expect(openURLSpy).toBeCalled();
  });
});

test('riot navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<AccountRegistration registration={registration} />);
  await waitFor(() => {
    expect(getByText('Riot')).toBeTruthy();
    fireEvent.press(getByText('@purestakeco:matrix.parity.io'));
    expect(openURLSpy).toBeCalled();
  });
});

test('web navigation', async () => {
  const openURLSpy = jest.spyOn(Linking, 'openURL');
  const {getByText} = render(<AccountRegistration registration={registration} />);
  await waitFor(() => {
    expect(getByText('Web')).toBeTruthy();
    fireEvent.press(getByText('https://www.purestake.com/'));
    expect(openURLSpy).toBeCalled();
  });
});
