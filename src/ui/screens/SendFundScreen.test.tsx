/* eslint-disable no-restricted-imports */
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {fireEvent} from '@testing-library/react-native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {sendFundScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {SendFundScreen} from './SendFundScreen';

const navigation = {
  goBack: () => jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList, typeof sendFundScreen>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof sendFundScreen>;

test('component loaded successfully with the "Make transfer" button disabled', async () => {
  const {getAllByText, queryByText, getByText, getByA11yState} = render(
    <SendFundScreen navigation={navigation} route={route} />,
  );
  const navigationSpy = jest.spyOn(navigation, 'goBack');
  await waitFor(() => {
    expect(getAllByText('Send funds').length).toBe(1);
    getAllByText('Enter amount');
    getAllByText('Send to address');
    getAllByText('Existential deposit');
    getAllByText('Transfer with account keep-alive checks');
    expect(queryByText('Normal transfer without keep-alive checks')).toBe(null);
    expect(getByText(/Make Transfer/i)).toBeDisabled();
    getByA11yState({disabled: true});

    fireEvent.press(getByText('Cancel'));
    expect(navigationSpy).toBeCalledTimes(1);
  });
});

test('When user enter correct values and checked keep alive check to make transfer', async () => {
  const {queryAllByText, getByPlaceholderText, getByText} = render(
    <SendFundScreen navigation={navigation} route={route} />,
  );
  await waitFor(() => {
    fireEvent.changeText(getByPlaceholderText('Enter amount'), '2588');
    fireEvent.changeText(getByPlaceholderText('Account address'), 'test');
    expect(queryAllByText('Enter a valid address').length).toEqual(1);
    fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    expect(queryAllByText('Enter a valid address').length).toEqual(0);

    getByText('Transfer with account keep-alive checks');
    const button = getByText('Make Transfer');
    fireEvent.press(button);
  });
});

test('When user enter correct values and normal transfer to make transfer', async () => {
  const {queryAllByText, getByPlaceholderText, getByText, getByTestId, queryByText} = render(
    <SendFundScreen navigation={navigation} route={route} />,
  );

  await waitFor(() => {
    fireEvent.changeText(getByPlaceholderText('Enter amount'), '2588');
    fireEvent.changeText(getByPlaceholderText('Account address'), 'test');
    expect(queryAllByText('Enter a valid address').length).toEqual(1);
    fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    expect(queryAllByText('Enter a valid address').length).toEqual(0);
    const switchComponent = getByTestId('keep_alive_switch');
    fireEvent(switchComponent, 'valueChange', false);
    queryByText('Normal transfer without keep-alive checks');
    expect(queryByText('Transfer with account keep-alive checks')).toBe(null);
    const button = getByText('Make Transfer');
    fireEvent.press(button);
  });
});
