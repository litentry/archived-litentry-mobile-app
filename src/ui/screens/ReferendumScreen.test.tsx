import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  AccountsStackParamList,
  AppStackParamList,
  CompleteNavigatorParamList,
  DashboardStackParamList,
} from '@ui/navigation/navigation';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ProposeTipScreen} from './ProposeTipScreen';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<DashboardStackParamList>;

test('render ProposeTipScreen component', () => {
  const {getByText} = render(<ProposeTipScreen navigation={navigation} />);
});
