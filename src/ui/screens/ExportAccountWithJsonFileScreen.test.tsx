import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {exportAccountWithJsonFileScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ExportAccountWithJsonFileScreen} from './ExportAccountWithJsonFileScreen';
import Share from 'react-native-share';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;

const mockKeyRingImp = {
  addAccount: jest.fn(() => Promise.resolve({})),
  createAccount: jest.fn(() => Promise.resolve()),
  exportAccount: jest.fn(() => Promise.resolve()),
};

jest.mock('@polkadotApi/useKeyring', () => {
  return {
    useKeyring: () => mockKeyRingImp,
  };
});

describe('ExportAccountWithJsonFileScreen', () => {
  it('should render the ExportAccountWithJsonFileScreen component', async () => {
    const {findByText, findAllByText} = render(
      <ExportAccountWithJsonFileScreen navigation={navigation} route={route} />,
    );
    await findByText('14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    await findAllByText('Password');
    await findByText('Export');
  });
});
