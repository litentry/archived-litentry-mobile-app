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
  const {getByPlaceholderText, getAllByA11yRole} = render(<AddExternalAccount onClose={closeModel} />);
  const confirm = getAllByA11yRole('button')[3];
  const inputAddress = getByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
  expect(inputAddress).toBeTruthy();
  expect(confirm).toBeDisabled();
  fireEvent.changeText(inputAddress, '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
  expect(confirm).toHaveTextContent('Confirm');
  expect(confirm).toBeEnabled();
});

test('render the AddExternalAccount component', () => {
  const {getAllByA11yRole} = render(<AddExternalAccount onClose={closeModel} />);
  const cancel = getAllByA11yRole('button')[2];
  expect(cancel).toHaveTextContent('Cancel');
  const confirm = getAllByA11yRole('button')[3];
  expect(confirm).toHaveTextContent('Confirm');
  expect(confirm).toBeDisabled();
});
