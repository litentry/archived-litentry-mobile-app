import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {SendFund} from './SendFund';

// TODO: mock the implementation of the sendTx method
jest.mock('src/api/hooks/useApiTx');

const sendTx = jest.fn(() => {
  return Promise.resolve();
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Ignore the mocker
sendTx.mockImplementation(() => {
  return {sendTx: sendTx};
});

const address = '';

const onFundsSent = jest.fn();

test('component loaded successfully with the "Make transfer" button disabled', async () => {
  const {getAllByText, queryByText, getByText, getByA11yState} = render(
    <SendFund address={address} onFundsSent={onFundsSent} />,
  );
  await waitFor(() => {
    expect(getAllByText('Send funds').length).toBe(1);
    getAllByText('Enter amount');
    getAllByText('Send to address');
    getAllByText('Existential deposit');
    getAllByText('Transfer with account keep-alive checks');
    expect(queryByText('Normal transfer without keep-alive checks')).toBe(null);
    expect(getByText(/Make Transfer/i)).toBeDisabled();
    getByA11yState({disabled: true});

    fireEvent.press(getByText('Cancel'));
  });
});

test('When user enter correct values and checked keep alive check to make transfer', async () => {
  const {queryAllByText, getByPlaceholderText, getByText} = render(
    <SendFund address={address} onFundsSent={onFundsSent} />,
  );
  await waitFor(() => {
    fireEvent.changeText(getByPlaceholderText('Enter amount'), '2588');
    fireEvent.changeText(getByPlaceholderText('Account address'), 'test');
    expect(queryAllByText('Enter a valid address').length).toEqual(1);
    fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    expect(queryAllByText('Enter a valid address').length).toEqual(0);

    getByText('Transfer with account keep-alive checks');
    expect(getByText(/Make Transfer/i)).toBeEnabled();
    const button = getByText('Make Transfer');
    fireEvent.press(button);
  });
});

test('When user enter correct values and normal transfer to make transfer', async () => {
  const {queryAllByText, getByPlaceholderText, getByText, getByTestId, queryByText} = render(
    <SendFund address={address} onFundsSent={onFundsSent} />,
  );

  await waitFor(() => {
    fireEvent.changeText(getByPlaceholderText('Enter amount'), '2588');
    fireEvent.changeText(getByPlaceholderText('Account address'), 'test');
    expect(queryAllByText('Enter a valid address').length).toEqual(1);
    fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    expect(queryAllByText('Enter a valid address').length).toEqual(0);
    const switchComponent = getByTestId('keep_alive_switch');
    fireEvent(switchComponent, 'valueChange', false);
    queryByText('Normal transfer without keep-alive checks');
    expect(queryByText('Transfer with account keep-alive checks')).toBe(null);
    expect(getByText(/Make Transfer/i)).toBeEnabled();
    const button = getByText('Make Transfer');
    fireEvent.press(button);
  });
});
