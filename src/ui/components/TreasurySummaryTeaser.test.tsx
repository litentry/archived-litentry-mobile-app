import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {TreasurySummaryTeaser} from './TreasurySummaryTeaser';

const onPressEvent = jest.fn();

test('render the loading view while data is fetching', () => {
  const {getByTestId} = render(<TreasurySummaryTeaser onPress={onPressEvent} />);
  expect(getByTestId('loading_box')).toBeTruthy();
});

test('should render the teaser component when data is fetched', async () => {
  const {getByText} = render(<TreasurySummaryTeaser onPress={onPressEvent} />);
  await waitFor(() => {
    expect(getByText('Proposals')).toBeTruthy();
    expect(getByText('Totals')).toBeTruthy();
    expect(getByText('Approved')).toBeTruthy();
    expect(getByText('Spend period (6 days)')).toBeTruthy();
    expect(getByText('Available')).toBeTruthy();
    expect(getByText('Next Burn')).toBeTruthy();
  });
});
