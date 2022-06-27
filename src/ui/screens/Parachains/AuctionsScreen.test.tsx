import Clipboard from '@react-native-community/clipboard';
import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {AuctionsScreen} from './AuctionsScreen';

describe('AuctionsScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render the loading component view when data is fetching', () => {
    const {getByTestId} = render(<AuctionsScreen />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the auctionsScreen component after data is fetched', async () => {
    const {findByText, findAllByText} = render(<AuctionsScreen />);
    await findByText('Auctions');
    await findByText('41');
    await findByText('Active');
    await findByText('Yes');
    await findByText('First - Last');
    await findByText('Ending period');
    await findByText('78.1% 1 day 2 hrs');
    await findByText('Total Raised');
    await findByText('0.01% 174,900 DOT');
    await findByText('Winning Bid');
    await findByText('ProjectID: 2122');
    await findByText('Bid: 1,749.0000 KSM');
    await findAllByText('Block number:');
    await findByText('13231800');
    await findAllByText('Leases');
    await findAllByText('22 - 29');
  });

  it('should copy block number when clicked on the block number', async () => {
    const clipboardSpy = jest.spyOn(Clipboard, 'setString');
    const {findByText} = render(<AuctionsScreen />);
    fireEvent.press(await findByText('13231800'));
    expect(clipboardSpy).toBeCalledWith('13231800');
  });
});
