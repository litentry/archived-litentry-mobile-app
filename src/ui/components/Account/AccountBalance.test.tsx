import React from 'react';
import {render} from 'src/testUtils';
import {AccountBalance as AccountBalanceType} from 'src/api/hooks/useAccount';
import {AccountBalance} from './AccountBalance';

const balance = {
  total: '182675396161976',
  formattedTotal: '18,267.5396 DOT',
  reserved: '200410000000',
  formattedReserved: '20.0410 DOT',
  free: '182474986161976',
  formattedFree: '18,247.4986 DOT',
  freeFrozen: '181215680471934',
  formattedFreeFrozen: '18,121.5680 DOT',
  formattedFeeFrozen: '129.641 DOT',
} as unknown as AccountBalanceType;

describe('AccountBalance', () => {
  it('should render the component with data', async () => {
    const {findByText} = render(<AccountBalance balance={balance} />);
    await findByText('Total Balance');
    await findByText('18,267.5396 DOT');
    await findByText('Transferrable');
    await findByText('18,247.4986 DOT');
    await findByText('Reserved');
    await findByText('20.0410 DOT');
    await findByText('Locked');
    await findByText('129.641 DOT');
  });
});
