import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppStackParamList, CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {accountsScreen} from '@ui/navigation/routeKeys';
import {AccountsScreen} from './AccountsScreen';

const navigation = {} as NavigationProp<CompleteNavigatorParamList, typeof accountsScreen>;

// TODO: Merge AddExternalAccount first
test('render the loading view when data is fetching', () => {
  // const {getByTestId, debug} = render(<AccountsScreen navigation={navigation} />);
});
