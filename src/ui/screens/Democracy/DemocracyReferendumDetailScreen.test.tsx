import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {fireEvent, render} from 'src/testUtils';
import {DemocracyReferendumDetailScreen} from './DemocracyReferendumDetailScreen';

const route = {
  params: {
    id: 'polkadot:69',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Referendum'>;

const mockStartTx = jest.fn(() => Promise.resolve({}));

jest.mock('context/TxContext', () => {
  return {
    useStartTx: () => ({
      startTx: mockStartTx,
    }),
  };
});

describe('DemocracyReferendumDetailScreen', () => {
  it('should render loading view', () => {
    const {getByTestId} = render(<DemocracyReferendumDetailScreen route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should fetch the DemocracyReferendum details', async () => {
    const {findByText} = render(<DemocracyReferendumDetailScreen route={route} />);
    await findByText('Polkadot Runtime Upgrade to v0.9.25');
    await findByText('69');
    await findByText('a month ago | Executed');
    await findByText('Show more');
    await findByText('Live Result (2 votes)');
    await findByText('YES');
    await findByText('71,345.8910 DOT');
    await findByText('NO');
    await findByText('1.0324 DOT');
    await findByText('Vote YES');
    await findByText('Vote NO');
  });

  it('should fetch the DemocracyReferendum details and press on vote yes or vote no', async () => {
    const {findByText, getByTestId} = render(<DemocracyReferendumDetailScreen route={route} />);
    await findByText('Polkadot Runtime Upgrade to v0.9.25');
    fireEvent.press(await findByText('Vote YES'));
    await findByText('Vote with account');
    await findByText('Vote Value');
    await findByText('Conviction');
    await findByText('Cancel');
    const voteType = getByTestId('vote-type');
    expect(voteType).toBeDisabled();
  });

  it('should fetch the DemocracyReferendum details and press on vote yes and vote with a selected account', async () => {
    const {findByText, getByTestId, findByTestId, getByPlaceholderText} = render(
      <DemocracyReferendumDetailScreen route={route} />,
    );
    await findByText('Polkadot Runtime Upgrade to v0.9.25');
    fireEvent.press(await findByText('Vote YES'));
    const voteType = getByTestId('vote-type');
    expect(voteType).toBeDisabled();
    const selectAccount = await findByTestId('select-account');
    fireEvent.press(selectAccount);
    const accountItem = await findByText('Test account name');
    fireEvent.press(accountItem);
    fireEvent.changeText(getByPlaceholderText('Enter amount'), '2');
    const selectConviction = await findByTestId('select-conviction');
    fireEvent.press(selectConviction);
    const convictionItem = await findByText('0.1x voting balance, no lockup period');
    fireEvent.press(convictionItem);
    expect(voteType).not.toBeDisabled();

    fireEvent.press(voteType);
    expect(mockStartTx).toHaveBeenCalledWith({
      address: 'G7UkJAutjbQyZGRiP8z5bBSBPBJ66JbTKAkFDq3cANwENyX',
      txConfig: {
        method: 'democracy.vote',
        params: ['69', {balance: '0x04a817c800', vote: {aye: true, conviction: 0}}],
      },
    });
  });
});
