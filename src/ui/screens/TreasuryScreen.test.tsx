import React from 'react';
import {Linking} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {fireEvent, render} from 'src/testUtils';
import {TreasuryOverviewScreen} from './TreasuryScreen';

describe('ImportAccountWithJsonFileScreen', () => {
  it('should render the loading component when data is fetching', () => {
    const {getByTestId} = render(<TreasuryOverviewScreen />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the TreasuryOverviewScreen component', async () => {
    const {findByText, findAllByText} = render(<TreasuryOverviewScreen />);
    await findByText('Proposals (1)');
    await findByText('Approved (1)');
    await findAllByText('Proposer:');
    await findAllByText('#118');
    await findAllByText('#133');
    await findAllByText('Payout:');
    await findAllByText('120,879.0000 DOT');
    await findAllByText('Beneficiary:');
    await findAllByText('W3F');
    await findAllByText('Bond:');
    await findAllByText('500.0000 DOT');
    await findAllByText('Polkassembly');
  });

  it('should redirect to the actual proposal on browser', async () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {findAllByText} = render(<TreasuryOverviewScreen />);
    fireEvent.press((await findAllByText('Polkassembly'))[0] as ReactTestInstance);
    expect(linkingSpy).toBeCalledWith('https://polkadot.polkassembly.io/treasury/118');
  });
});
