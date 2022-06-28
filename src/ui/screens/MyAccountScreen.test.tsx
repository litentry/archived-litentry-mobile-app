import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList, CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {MyAccountScreen} from './MyAccountScreen';
import Clipboard from '@react-native-community/clipboard';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<CompleteNavigatorParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;

describe('MyAccountScreen', () => {
  it('should render the loading component when data is fetching', async () => {
    const {findByText} = render(<MyAccountScreen navigation={navigation} route={route} />);
    await findByText('Send');
    await findByText('Receive');
    await findByText('Share');
    await findByText('ADDRESS');
    await findByText('14yx4vPAACZRhoDQm…RCe5tj1zPomhhS29a');
    await findByText('IDENTITY');
    await findByText('PureStake/01');
    await findByText('1 Judgements');
    await findByText('BALANCE');
    await findByText('20,000.9333 DOT');
    await findByText('Balance details');
    await findByText('Manage identity');
    await findByText('Remove account');
  });

  it('should copy the address to clipboard when clicked on the address', async () => {
    const clipboardSpy = jest.spyOn(Clipboard, 'setString');
    const {findByText} = render(<MyAccountScreen navigation={navigation} route={route} />);
    // fireEvent.press(await findByText('14yx4vPAACZRhoDQm…RCe5tj1zPomhhS29a'))
    // expect(clipboardSpy).toBeCalledWith('14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a')
  });
});
