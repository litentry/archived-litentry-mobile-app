import React from 'react';
import {SubstrateChainRegistry} from 'src/generated/litentryGraphQLTypes';
import {render, fireEvent, waitFor} from 'src/testUtils';
import {stringToBn as stringToBnUtil} from 'src/utils/balance';
import {SendFund} from './SendFund';

const mockStartTx = jest.fn(() => Promise.resolve());

jest.mock('src/api/hooks/useApiTx', () => {
  return {
    useApiTx: () => mockStartTx,
  };
});

describe('SendFund', () => {
  const address = '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a';
  const onFundsSent = jest.fn();
  const mockChainRegistry = {
    __typename: 'SubstrateChainRegistry',
    decimals: 10,
    token: 'DOT',
  } as SubstrateChainRegistry;

  test('component initial state', async () => {
    const {queryByText, getByTestId, findByText} = render(<SendFund address={address} onFundsSent={onFundsSent} />);

    await findByText('Enter amount');
    await findByText('Send to address');
    await findByText('Existential deposit');
    await findByText('Transfer with account keep-alive checks');

    expect(queryByText('Normal transfer without keep-alive checks')).toBe(null);
    const makeTransferButton = getByTestId('make-transfer-button');
    expect(makeTransferButton).toBeDisabled();
  });

  test.only('make transfer with keep alive check enabled', async () => {
    const {getByPlaceholderText, getByTestId, getByA11yRole, queryByA11yRole, debug} = render(
      <SendFund address={address} onFundsSent={onFundsSent} />,
    );

    const amount = '100';
    const toAddress = '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6';
    const _amountBN = stringToBnUtil(mockChainRegistry, amount);

    fireEvent.changeText(getByPlaceholderText('Enter amount'), amount);
    fireEvent.changeText(getByPlaceholderText('Account address'), toAddress);

    const makeTransferButton = getByTestId('make-transfer-button');

    await waitFor(() => {
      expect(makeTransferButton).not.toBeDisabled();
    });

    fireEvent.press(makeTransferButton);

    await waitFor(() => {
      expect(getByA11yRole('progressbar')).toBeTruthy();
    });

    expect(mockStartTx).toHaveBeenCalledWith({
      address,
      params: [toAddress, _amountBN],
      txMethod: 'balances.transferKeepAlive',
    });

    await waitFor(() => {
      expect(queryByA11yRole('progressbar')).toBeNull();
    });

    debug();
    expect(onFundsSent).toHaveBeenCalled();
  });

  test('make transfer with keep alive check disabled', async () => {
    const {getByPlaceholderText, getByTestId, getByText, getByA11yRole, queryByA11yRole} = render(
      <SendFund address={address} onFundsSent={onFundsSent} />,
    );

    const amount = '100';
    const toAddress = '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6';
    const _amountBN = stringToBnUtil(mockChainRegistry, amount);

    fireEvent.changeText(getByPlaceholderText('Enter amount'), amount);
    fireEvent.changeText(getByPlaceholderText('Account address'), toAddress);
    fireEvent(getByTestId('keep_alive_switch'), 'valueChange', false);

    const makeTransferButton = getByTestId('make-transfer-button');

    await waitFor(() => {
      expect(makeTransferButton).not.toBeDisabled();
    });

    expect(getByText('Normal transfer without keep-alive checks')).not.toBeNull();

    fireEvent.press(makeTransferButton);

    await waitFor(() => {
      expect(getByA11yRole('progressbar')).toBeTruthy();
    });

    expect(mockStartTx).toHaveBeenCalledWith({
      address,
      params: [toAddress, _amountBN],
      txMethod: 'balances.transfer',
    });

    await waitFor(() => {
      expect(queryByA11yRole('progressbar')).toBeNull();
    });

    expect(onFundsSent).toHaveBeenCalled();
  });
});
