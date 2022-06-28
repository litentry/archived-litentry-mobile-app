import React from 'react';
import {Linking} from 'react-native';
import {fireEvent, render} from 'src/testUtils';
import {ParathreadsScreen} from './ParathreadsScreen';

describe('ParathreadsScreen', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<ParathreadsScreen />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render ParathreadsScreen component when the data is fetched', async () => {
    const {findByText, findAllByText} = render(<ParathreadsScreen />);
    await findByText('Parathreads: 1');
    await findAllByText('Litentry');
    await findByText('2013');
  });

  it('should redirect to home page of the parathread', async () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {findByText} = render(<ParathreadsScreen />);
    fireEvent.press(await findByText('2013'));
    expect(linkingSpy).toBeCalledWith('https://crowdloan.litentry.com');
  });
});
