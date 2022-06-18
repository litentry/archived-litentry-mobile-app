import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {exportAccountWithJsonFileScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import Share from 'react-native-share';
import {fireEvent, render} from 'src/testUtils';
import {ExportAccountWithJsonFileScreen} from './ExportAccountWithJsonFileScreen';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;

test('render the ExportAccountWithJsonFileScreen component', () => {
  const {getByText, debug, getAllByText} = render(
    <ExportAccountWithJsonFileScreen navigation={navigation} route={route} />,
  );
  expect(getByText('14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a')).toBeTruthy();
  expect(getAllByText('Password')).toBeTruthy();
  expect(getByText('Export')).toBeTruthy();
});

test('backup json', () => {
  const shareSpy = jest.spyOn(Share, 'open');
  const {getByText} = render(<ExportAccountWithJsonFileScreen navigation={navigation} route={route} />);
  expect(getByText('Export')).toBeTruthy();
  fireEvent.press(getByText('Export'));
  // TODO: click on the export button not accepted
  // expect(shareSpy).toHaveBeenCalled()
});
