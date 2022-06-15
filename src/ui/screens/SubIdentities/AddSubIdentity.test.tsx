import React from 'react';
import {render, fireEvent} from 'src/testUtils';
import {AddSubIdentity} from './AddSubIdentity';

jest.useFakeTimers();

const close = () => jest.fn();

const addSubIdentity = () => jest.fn();

test('render the AddSubIdentity component', () => {
  const {getByText, getByPlaceholderText} = render(<AddSubIdentity onClose={close} onAddPress={addSubIdentity} />);
  expect(getByPlaceholderText('Sub account name (optional)')).toBeTruthy();
  expect(getByPlaceholderText('👉 Paste address here, e.g. 167r...14h')).toBeTruthy();
  expect(getByText('Cancel')).toBeTruthy();
  expect(getByText('Add Identity')).toBeTruthy();
  expect(getByText(/Add Identity/i) as unknown as HTMLElement).toBeDisabled();
});

// TODO: bottom sheets mock

test('Cancel button pressed', () => {
  // const bottomSheetsSpy = jest.spyOn(useBottomSheetModal, 'dismiss');
  const {getByText} = render(<AddSubIdentity onClose={close} onAddPress={addSubIdentity} />);
  expect(getByText('Cancel')).toBeTruthy();
  fireEvent.press(getByText('Cancel'));
  // expect(bottomSheetsSpy).toBeCalled()
});

test('add new identity', () => {
  const {getByText, getByPlaceholderText} = render(<AddSubIdentity onClose={close} onAddPress={addSubIdentity} />);
  fireEvent.changeText(
    getByPlaceholderText('👉 Paste address here, e.g. 167r...14h'),
    '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  );
  expect(getByText(/Add Identity/i) as unknown as HTMLElement).toBeEnabled();
  fireEvent.press(getByText('Add Identity'));
});
