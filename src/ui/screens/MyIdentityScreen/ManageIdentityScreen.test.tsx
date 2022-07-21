import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, fireEvent} from 'src/testUtils';
import {ManageIdentityScreen} from './ManageIdentityScreen';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import {Alert, Linking} from 'react-native';

const navigation = {
  navigate: () => jest.fn(),
  setOptions: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;

const openURLSpy = jest.spyOn(Linking, 'openURL');

const mockStartTx = jest.fn(() => Promise.resolve({}));

jest.mock('src/api/hooks/useApiTx', () => {
  return {
    useApiTx: () => mockStartTx,
  };
});

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

  const identities = [
    ['@nachortti', 'https://twitter.com/@nachortti'],
    ['@raul.rtti:matrix.parity.io', 'https://matrix.to/#/@raul.rtti:matrix.parity.io'],
    ['www.nachortti.com', 'www.nachortti.com'],
  ];

  it.each(identities)('should click on %s to navigate to %s url', async (id, url) => {
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText(id));
    expect(openURLSpy).toHaveBeenCalledWith(url);
  });

  it('should alert when pressed clear identity button', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText('Clear Identity'));
    expect(alertSpy).toBeCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(
      'Clear Identity',
      'Clear identity of account: \n 14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
      [
        {onPress: expect.any(Function), style: 'destructive', text: 'Yes'},
        {style: 'cancel', text: 'Cancel'},
      ],
    );
  });

  it('should navigate to sub-identities when tapping on Set Sub-identities', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<ManageIdentityScreen navigation={navigation} route={route} />);
    fireEvent.press(await findByText('Set Sub-identities'));
    expect(navigationSpy).toBeCalledWith('Register Sub-Identities', {
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
    });
  });
});
