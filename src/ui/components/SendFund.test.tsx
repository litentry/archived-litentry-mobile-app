import {bnToHex} from '@polkadot/util';
import React from 'react';
import {SubstrateChainRegistry} from 'src/generated/litentryGraphQLTypes';
import {render, fireEvent, waitFor} from 'src/testUtils';
import {stringToBn as stringToBnUtil} from 'src/utils/balance';
import {SendFund} from './SendFund';

const mockStartTx = jest.fn();

jest.mock('context/TxContext', () => {
  return {
    useStartTx: () => ({
      startTx: mockStartTx,
    }),
  };
});

jest.mock('src/hooks/useIsAddressValid', () => {
  return {
    useIsAddressValid: () => ({
      isAddressValid: jest.fn(() => Promise.resolve(true)),
    }),
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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the component with initial state correctly', async () => {
    const {queryByText, getByTestId, findByText} = render(<SendFund address={address} onClose={onFundsSent} />);

    await findByText('Enter amount');
    await findByText('Send to address');
    await findByText('Existential deposit');
    await findByText('Transfer with account keep-alive checks');

    expect(queryByText('Normal transfer without keep-alive checks')).toBe(null);
    const makeTransferButton = getByTestId('send-fund-button');
    expect(makeTransferButton).toBeDisabled();
  });

  it('should make the transaction with `balances.transfer` method when keep alive check is enabled', async () => {
    mockStartTx.mockImplementation(() => Promise.resolve());
    const {getByPlaceholderText, getByTestId, queryByA11yRole} = render(
      <SendFund address={address} onClose={onFundsSent} />,
    );

    const amount = '100';
    const toAddress = '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6';
    const _amountBN = stringToBnUtil(mockChainRegistry, amount);

    fireEvent.changeText(getByPlaceholderText('Enter amount'), amount);
    fireEvent.changeText(getByPlaceholderText('Account address'), toAddress);

    const makeTransferButton = getByTestId('send-fund-button');

    await waitFor(() => {
      expect(makeTransferButton).not.toBeDisabled();
    });

    fireEvent.press(makeTransferButton);

    expect(mockStartTx).toHaveBeenCalledWith({
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
      txConfig: {
        method: 'balances.transferKeepAlive',
        params: ['12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6', bnToHex(_amountBN)],
      },
    });

    await waitFor(() => {
      expect(queryByA11yRole('progressbar')).toBeNull();
    });

    expect(onFundsSent).toHaveBeenCalled();
  });

  it('should make the transaction with `balances.transfer` method when keep alive check is disabled', async () => {
    mockStartTx.mockImplementation(() => Promise.resolve());
    const {getByPlaceholderText, getByTestId, getByText, queryByA11yRole} = render(
      <SendFund address={address} onClose={onFundsSent} />,
    );

    const amount = '100';
    const toAddress = '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6';
    const _amountBN = stringToBnUtil(mockChainRegistry, amount);

    fireEvent.changeText(getByPlaceholderText('Enter amount'), amount);
    fireEvent.changeText(getByPlaceholderText('Account address'), toAddress);
    fireEvent(getByTestId('keep_alive_switch'), 'valueChange', false);

    const makeTransferButton = getByTestId('send-fund-button');

    await waitFor(() => {
      expect(makeTransferButton).not.toBeDisabled();
    });

    expect(getByText('Normal transfer without keep-alive checks')).not.toBeNull();

    fireEvent.press(makeTransferButton);

    expect(mockStartTx).toHaveBeenCalledWith({
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
      txConfig: {
        method: 'balances.transfer',
        params: ['12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6', bnToHex(_amountBN)],
      },
    });

    await waitFor(() => {
      expect(queryByA11yRole('progressbar')).toBeNull();
    });

    expect(onFundsSent).toHaveBeenCalled();
  });

  it('should not call onFundsSent when the transaction fails', async () => {
    mockStartTx.mockImplementation(() => Promise.reject());

    const {getByPlaceholderText, getByTestId, queryByA11yRole} = render(
      <SendFund address={address} onClose={onFundsSent} />,
    );

    const amount = '100';
    const toAddress = '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6';
    const _amountBN = stringToBnUtil(mockChainRegistry, amount);

    fireEvent.changeText(getByPlaceholderText('Enter amount'), amount);
    fireEvent.changeText(getByPlaceholderText('Account address'), toAddress);

    const makeTransferButton = getByTestId('send-fund-button');

    await waitFor(() => {
      expect(makeTransferButton).not.toBeDisabled();
    });

    fireEvent.press(makeTransferButton);

    expect(mockStartTx).toHaveBeenCalledWith({
      address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
      txConfig: {
        method: 'balances.transferKeepAlive',
        params: ['12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6', bnToHex(_amountBN)],
      },
    });

    await waitFor(() => {
      expect(queryByA11yRole('progressbar')).toBeNull();
    });

    expect(onFundsSent).not.toHaveBeenCalled();
  });
});
