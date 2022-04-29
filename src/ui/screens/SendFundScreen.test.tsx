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

describe('SendFundScreen component', () => {
  it('On component loaded successfully', async () => {
    const {getAllByText, queryByText, getByText, getByA11yState} = await waitFor(() =>
      render(<SendFundScreen navigation={navigation} route={route} />),
    );
    expect(getAllByText('Send funds').length).toBe(1);
    getAllByText('Enter amount');
    getAllByText('Send to address');
    getAllByText('Existential deposit');
    getAllByText('Transfer with account keep-alive checks');
    expect(queryByText('Normal transfer without keep-alive checks')).toBe(null);
    expect(getByText(/Make Transfer/i)).toBeDisabled();
    getByA11yState({disabled: true});
  });

  it('When user enter correct values', async () => {
    const {queryAllByText, getByPlaceholderText, getByA11yState} = await waitFor(() =>
      render(<SendFundScreen navigation={navigation} route={route} />),
    );
    fireEvent.changeText(getByPlaceholderText('Enter amount'), '2588');
    fireEvent.changeText(getByPlaceholderText('Account address'), 'test');
    expect(queryAllByText('Enter a valid address').length).toEqual(1);
    fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    expect(queryAllByText('Enter a valid address').length).toEqual(0);
    getByA11yState({disabled: true});
  });
});
