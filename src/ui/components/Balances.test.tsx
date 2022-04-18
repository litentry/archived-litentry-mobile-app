/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import Balances from '@ui/components/Balances';
import {create} from 'react-test-renderer';
import {render, within} from 'src/testUtils';

jest.doMock('src/ui/components/Balances', () => {
  const accountBalanceDetails = {
    formattedFree: '56.7291 DOT',
    formattedFreeFrozen: '0.0000 DOT',
    formattedReserved: '140.2990 DOT',
    formattedTotal: '197.0281 DOT',
    free: '567291998369',
    freeFrozen: '0',
    reserved: '1402990000000',
    total: '1970281998369',
  };
  return {
    BalancesMockComponent: jest.fn(() => <Balances balance={accountBalanceDetails} />),
  };
});

const {BalancesMockComponent} = require('src/ui/components/Balances');

describe('Balances component', () => {
  it('should render the prop component correctly', async () => {
    const {getByTestId} = render(<BalancesMockComponent />);

    const total_balance = getByTestId('total_balance');
    expect(within(total_balance).getByText('Total Balance')).toBeTruthy();

    const transferrable = getByTestId('transferrable');
    expect(within(transferrable).getByText('Transferrable')).toBeTruthy();

    const reserved = getByTestId('reserved');
    expect(within(reserved).getByText('Reserved')).toBeTruthy();

    const locked = getByTestId('locked');
    expect(within(locked).getByText('Locked')).toBeTruthy();
  });

  it('Testing render with snapshot', () => {
    const errorTextComponent = create(<BalancesMockComponent />);
    expect(errorTextComponent.toJSON()).toMatchSnapshot();
  });
});
