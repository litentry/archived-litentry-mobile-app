import React from 'react';
import {render} from 'src/testUtils';
import {Account} from './Account';
import type {Account as AccountType} from 'src/api/hooks/useAccount';

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
} as unknown as AccountType;

test('render the component with data', () => {
  const {getByText} = render(<Account account={account} />);
  expect(getByText('PolkadotIndia')).toBeTruthy();
  expect(getByText(`"Unknown" provided by Registrar #0`)).toBeTruthy();
});
