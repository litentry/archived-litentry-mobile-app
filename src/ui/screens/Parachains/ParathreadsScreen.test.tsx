import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {ParathreadsScreen} from './ParathreadsScreen';

test('render the loading view when data is fetching', async () => {
  const {getByTestId} = render(<ParathreadsScreen />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render when the data is fetched', async () => {
  const {getByText, getAllByText} = render(<ParathreadsScreen />);
  await waitFor(() => {
    expect(getByText('Parathreads: 15')).toBeTruthy();
    expect(getAllByText('Litentry').length).toBe(2);
    expect(getAllByText('Unique Network').length).toBe(2);
    expect(getAllByText('Kapex').length).toBe(1);
    expect(getAllByText('SubGame Gamma').length).toBe(1);
    expect(getAllByText('SubDAO').length).toBe(1);
    expect(getAllByText('Coinversation').length).toBe(1);
    expect(getAllByText('Ares Odyssey').length).toBe(1);
    expect(getAllByText('Geminis').length).toBe(1);
  });
});
