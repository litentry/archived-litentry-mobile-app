import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {ManageIdentityScreen} from './ManageIdentityScreen';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import {Alert, Linking} from 'react-native';

jest.useFakeTimers();

const navigation = {
  navigate: () => jest.fn(),
  setOptions: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;

const accountInfo = {
  twitterId: '@nachortti',
  twitterURL: 'https://twitter.com/@nachortti',
  riotId: '@raul.rtti:matrix.parity.io',
  riotURL: 'https://matrix.to/#/@raul.rtti:matrix.parity.io',
  webURL: 'www.nachortti.com',
};

const openURLSpy = jest.spyOn(Linking, 'openURL');

describe('ManageIdentityScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading view when data is fetching', async () => {
    const {findByText, findAllByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    await findByText('Address');
    await findAllByText('Email');
    await findByText('info@purestake.com');
    await findAllByText('Twitter');
    await findByText('@nachortti');
    await findAllByText('Legal');
    await findByText('Raul Romanutti');
    await findAllByText('Riot');
    await findByText('@raul.rtti:matrix.parity.io');
    await findAllByText('Web');
    await findByText('www.nachortti.com');
    await findByText('Update Identity');
    await findByText('Request Judgement');
    await findByText('Set Sub-identities');
    await findByText('Clear Identity');
    await findByText('Polkascan');
    await findByText('View externally');
  });

  it('should navigate to the linked twitter url', async () => {
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(accountInfo.twitterId));
    expect(openURLSpy).toHaveBeenCalledWith(accountInfo.twitterURL);
  });

  it('should navigate to the linked riot url', async () => {
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(accountInfo.riotId));
    expect(openURLSpy).toHaveBeenCalledWith(accountInfo.riotURL);
  });

  it('should navigate to the linked web url', async () => {
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(accountInfo.webURL));
    expect(openURLSpy).toHaveBeenCalledWith(accountInfo.webURL);
  });

  it('should alert when pressed clear identity button', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText('Clear Identity'));
    expect(alertSpy).toBeCalledTimes(1);
    waitFor(async () => {
      await findByText('Clear Identity');
    });
  });

  it('should navigate to sub-identities on click of Set Sub-identities', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText('Set Sub-identities'));
    expect(navigationSpy).toBeCalledWith('Register Sub-Identities', {
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
    });
  });
});
