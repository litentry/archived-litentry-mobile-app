import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ProposeTipScreen} from './ProposeTipScreen';

jest.useFakeTimers();

const mockStartTx = jest.fn(() => Promise.resolve().catch());

const mockRefetchTips = jest.fn();

jest.mock('context/TxContext', () => {
  return {
    useStartTx: () => ({
      startTx: mockStartTx,
    }),
  };
});

jest.mock('src/api/hooks/useRefetch', () => {
  return {
    useRefetch: () => ({
      refetchTips: mockRefetchTips,
    }),
  };
});

const navigation = {} as unknown as NavigationProp<DashboardStackParamList>;

describe('ProposeTipScreen', () => {
  it('should render ProposeTipScreen component', () => {
    const {getByText} = render(<ProposeTipScreen navigation={navigation} />);
    expect(getByText('Sending from')).toBeTruthy();
    expect(getByText('Select the account you wish to submit the tip from')).toBeTruthy();
    expect(getByText('Beneficiary address')).toBeTruthy();
    expect(getByText('The account to which the tip will be transferred if approved')).toBeTruthy();
    expect(getByText('Tip reason')).toBeTruthy();
    expect(getByText('The reason why this tip should be paid.')).toBeTruthy();
    expect(getByText('Propose Tip')).toBeTruthy();
  });

  it('should validate entered address', async () => {
    const {getByPlaceholderText, queryByTestId} = render(<ProposeTipScreen navigation={navigation} />);
    const validAddress = queryByTestId('address-valid');
    expect(validAddress).toBeNull();
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Account address'), '2588');
    });
    expect(validAddress).toBeDefined();
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    });
    expect(validAddress).toBeNull();
  });

  it('should propose a tip with valid address and valid reason', async () => {
    const {findByTestId, findByText, getByPlaceholderText, queryByTestId, queryByText} = render(
      <ProposeTipScreen navigation={navigation} />,
    );
    const validAddress = queryByTestId('address-valid');
    const proposeTipButton = await findByTestId('propose-tip');

    const selectAccount = await findByTestId('select-account');
    fireEvent.press(selectAccount);
    const accountItem = await findByText('Test account name');
    fireEvent.press(accountItem);

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Account address'), '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    });
    expect(validAddress).toBeNull();
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Tip reason'), 'Test');
    });
    await findByText('Enter a minimum of five letters');
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Tip reason'), 'Test tip');
    });
    expect(queryByText('Enter a minimum of five letters')).toBe(null);
    expect(proposeTipButton).toBeEnabled();

    fireEvent.press(proposeTipButton);

    expect(mockStartTx).toHaveBeenCalledWith({
      address: 'G7UkJAutjbQyZGRiP8z5bBSBPBJ66JbTKAkFDq3cANwENyX',
      txConfig: {
        method: 'tips.reportAwesome',
        params: ['Test tip', '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a'],
      },
    });
  });
});
