import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {AddSubIdentity} from './AddSubIdentity';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

jest.useFakeTimers();

const close = () => jest.fn();

const addPress = () => jest.fn();

test('render the AddSubIdentity component', () => {
  const {getByText, getByPlaceholderText} = render(<AddSubIdentity onClose={close} onAddPress={addPress} />);
  expect(getByPlaceholderText('Sub account name (optional)')).toBeTruthy();
  expect(getByPlaceholderText('👉 Paste address here, e.g. 167r...14h')).toBeTruthy();
  expect(getByText('Cancel')).toBeTruthy();
  expect(getByText('Add Identity')).toBeTruthy();
  expect(getByText(/Add Identity/i) as unknown as HTMLElement).toBeDisabled();
});

// TODO: bottom sheets mock

test('Cancel button pressed', () => {
  // const bottomSheetsSpy = jest.spyOn(useBottomSheetModal, 'dismiss');
  const {getByText} = render(<AddSubIdentity onClose={close} onAddPress={addPress} />);
  expect(getByText('Cancel')).toBeTruthy();
  fireEvent.press(getByText('Cancel'));
  // expect(bottomSheetsSpy).toBeCalled()
});

// TODO: onAddPress needs a test case
test('add new identity', () => {
  const {getByText, getByPlaceholderText} = render(<AddSubIdentity onClose={close} onAddPress={addPress} />);
  fireEvent.changeText(
    getByPlaceholderText('👉 Paste address here, e.g. 167r...14h'),
    '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  );
  expect(getByText(/Add Identity/i) as unknown as HTMLElement).toBeEnabled();
});
