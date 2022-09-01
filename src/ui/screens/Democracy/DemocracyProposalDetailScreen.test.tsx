import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {DemocracyProposalDetailScreen} from './DemocracyProposalDetailScreen';

const route = {
  params: {
    id: 'polkadot:16',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Proposal'>;

const mockStartTx = jest.fn(() => Promise.resolve({}));

const mockgetTxMethodArgsLength = jest.fn(() => Promise.resolve({}));

jest.mock('context/TxContext', () => {
  return {
    useStartTx: () => ({
      startTx: mockStartTx,
    }),
  };
});

jest.mock('@polkadotApi/useTx', () => {
  return {
    useTx: () => ({
      getTxMethodArgsLength: mockgetTxMethodArgsLength,
    }),
  };
});

describe('DemocracyReferendumDetailScreen', () => {
  it('should render loading view', () => {
    const {getByTestId} = render(<DemocracyProposalDetailScreen route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the DemocracyProposalDetailScreen with data fetched', async () => {
    const {findByText} = render(<DemocracyProposalDetailScreen route={route} />);
    await findByText('16');
    await findByText('Untitled - public proposal #16');
    await findByText('10 months ago | Tabled');
    await findByText('Deposit:');
    await findByText('200.0000 DOT');
    await findByText('Proposer:');
    await findByText('16HU63GUJR…DMRTMPAUKF');
    await findByText('Endorse');
  });

  it('should press on endorse and endorse the proposal', async () => {
    const {findByText, findByTestId} = render(<DemocracyProposalDetailScreen route={route} />);
    await findByText('Endorse');
    fireEvent.press(await findByText('Endorse'));
    await findByText('Endorse with account');
    await findByText('Deposit required: 200.0000 DOT');
    const endorseButton = await findByTestId('endorse-button');
    expect(endorseButton).toBeDisabled();
    const selectAccount = await findByTestId('select-account');
    fireEvent.press(selectAccount);
    const accountItem = await findByText('Test account name');
    fireEvent.press(accountItem);
    await waitFor(() => {
      expect(endorseButton).not.toBeDisabled();
    });
    fireEvent.press(endorseButton);
    await waitFor(() => {
      expect(mockgetTxMethodArgsLength).toHaveBeenCalledTimes(1);
    });
    expect(mockStartTx).toHaveBeenCalledWith({
      address: 'G7UkJAutjbQyZGRiP8z5bBSBPBJ66JbTKAkFDq3cANwENyX',
      txConfig: {method: 'democracy.second', params: ['16']},
    });
  });
});
