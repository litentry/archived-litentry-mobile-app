import React from 'react';
import {SubstrateChainAccount} from 'src/generated/litentryGraphQLTypes';
import {fireEvent, render} from 'src/testUtils';
import {AccountTeaser} from './AccountTeaser';

const account = {
  address: 'FcxNWVy5RESDsErjwyZmPCW6Z8Y3fbfLzmou34YZTrbcraL',
  balance: '230 DOT',
  display: 'PolkadotIndia',
  hasIdentity: false,
  registration: {
    judgements: [
      {
        registrarIndex: 0,
        judgement: {
          isUnknown: false,
          isFeePaid: true,
          isReasonable: false,
          isKnownGood: false,
          isOutOfDate: false,
          isLowQuality: false,
          isErroneous: false,
        },
      },
    ],
  },
} as unknown as SubstrateChainAccount;

const accountNavigation = {
  navigate: jest.fn(),
};

describe('AddressInfoPreview', () => {
  it('should render the AccountTeaser component', async () => {
    const {findByText} = render(<AccountTeaser account={account} onPress={accountNavigation.navigate} />);
    await findByText('PolkadotIndia');
    await findByText('"Unknown" provided by Registrar #0');
  });

  it('should navigate to accounts details on click of account name', async () => {
    const accountSpy = jest.spyOn(accountNavigation, 'navigate');
    const {getByTestId} = render(
      <AccountTeaser account={account} onPress={accountNavigation.navigate} testID={'accounts'} />,
    );
    const accountId = getByTestId('accounts');
    fireEvent.press(accountId);
    expect(accountSpy).toHaveBeenCalledTimes(1);
  });
});
