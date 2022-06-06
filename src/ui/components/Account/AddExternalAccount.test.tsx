import {NavigationProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Alert} from 'react-native';
import {render, fireEvent} from 'src/testUtils';
import {AddExternalAccount} from './AddExternalAccount';
jest.useFakeTimers();

const closeModel = () => jest.fn;

test('render the AddExternalAccount component, test for wrong address', () => {
  const {getByPlaceholderText} = render(<AddExternalAccount onClose={closeModel} />);
  const inputAddress = getByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
  fireEvent.changeText(inputAddress, 'test');
  jest.spyOn(Alert, 'alert');
});

test('render the AddExternalAccount component, with right address', () => {
  const {getByPlaceholderText, getByText, debug, getByA11yState} = render(<AddExternalAccount onClose={closeModel} />);
  const inputAddress = getByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
  expect(inputAddress).toBeTruthy();
  getByA11yState({disabled: true});
  fireEvent.changeText(inputAddress, '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
  expect(getByText(/Confirm/i)).toBeDefined();
  fireEvent.press(getByText(/Confirm/i));
});
