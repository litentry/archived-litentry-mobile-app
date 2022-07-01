import React from 'react';
import {render, fireEvent} from 'src/testUtils';
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

const accountInfo = [
  ['https://twitter.com/@purestakeco', '@purestakeco'],
  ['https://matrix.to/#/@purestakeco:matrix.parity.io', '@purestakeco:matrix.parity.io'],
  ['https://www.purestake.com/', 'https://www.purestake.com/'],
];

describe('AccountRegistration', () => {
  it('should render the AccountRegistration component with data', async () => {
    const {findByText} = render(<AccountRegistration registration={registration} />);
    await findByText('Legal');
    await findByText('Email');
    await findByText('Twitter');
    await findByText('Riot');
    await findByText('Web');
  });

  it.each(accountInfo)('should navigate to %s url when pressed on %s id', async (url, id) => {
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    const {findByText} = render(<AccountRegistration registration={registration} />);
    fireEvent.press(await findByText(id));
    expect(openURLSpy).toBeCalledWith(url);
  });
});
