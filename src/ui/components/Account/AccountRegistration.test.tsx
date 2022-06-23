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

describe('AccountRegistration', () => {
  it('should render the AccountRegistration component with data', async () => {
    const {findByText} = render(<AccountRegistration registration={registration} />);
    await findByText('Legal');
    await findByText('Email');
    await findByText('Twitter');
    await findByText('Riot');
    await findByText('Web');
  });

  it('should navigate to twitter url when clicked on the twitter user name', async () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    const {findByText, getByText} = render(<AccountRegistration registration={registration} />);
    const twitterUserId = String(registration.twitter);
    await findByText('Twitter');
    fireEvent.press(getByText(twitterUserId));
    expect(openURLSpy).toBeCalledWith('https://twitter.com/@purestakeco');
  });

  it('should navigate to the riot url when clicked on the riot id', async () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    const {findByText, getByText} = render(<AccountRegistration registration={registration} />);
    const riotUserId = String(registration.riot);
    await findByText('Riot');
    fireEvent.press(getByText(riotUserId));
    expect(openURLSpy).toBeCalledWith('https://matrix.to/#/@purestakeco:matrix.parity.io');
  });

  it('should navigate to webpage when clicked on website', async () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    const {getByText, findByText} = render(<AccountRegistration registration={registration} />);
    const webUrl = String(registration.web);
    await findByText('Web');
    fireEvent.press(getByText(webUrl));
    expect(openURLSpy).toBeCalledWith(webUrl);
  });
});
