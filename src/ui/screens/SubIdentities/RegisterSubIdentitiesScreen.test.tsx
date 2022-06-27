import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render} from 'src/testUtils';
import {RegisterSubIdentitiesScreen} from './RegisterSubIdentitiesScreen';
import {registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';

const navigation = {
  navigate: () => jest.fn(),
  setOptions: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;

describe('RegisterSubIdentitiesScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('render the AddSubIdentity component', async () => {
    const {findByText} = render(<RegisterSubIdentitiesScreen navigation={navigation} route={route} />);
    expect(await findByText('Set Sub-identities')).toBeDisabled();
    await findByText('Sub-identities (0)');
    await findByText('Set sub-identities after adding/removing your accounts.');
    await findByText('No sub-identities set.');
  });
});
