import React from 'react';
import {ReactTestInstance} from 'react-test-renderer';
import {render, waitFor, within} from 'src/testUtils';
import {ParathreadsScreen} from './ParathreadsScreen';

describe('OverviewScreen component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<ParathreadsScreen />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('When data is rendered', async () => {
    const {getAllByText, getAllByTestId} = await waitFor(() => render(<ParathreadsScreen />));

    const leasePeriodElement = getAllByText('Parathreads: 15');
    expect(leasePeriodElement).toHaveLength(1);

    const parathreadItems = getAllByTestId('parathread_items');
    expect(parathreadItems.length).toBe(10);
    expect(within(parathreadItems[0] as ReactTestInstance).getAllByText('Litentry')).toBeTruthy();
    expect(within(parathreadItems[9] as ReactTestInstance).getAllByText('Geminis')).toBeTruthy();
  });
});
