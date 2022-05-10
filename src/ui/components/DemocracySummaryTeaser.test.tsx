import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {DemocracySummaryTeaser} from './DemocracySummaryTeaser';

const onPressEvent = jest.fn();

test('render the loading view while data is fetching', () => {
  const {getByTestId} = render(<DemocracySummaryTeaser onPress={onPressEvent} />);
  expect(getByTestId('loading_box')).toBeTruthy();
});

test('should render the component data after the loading view has finished', async () => {
  const {getByText, getAllByText} = render(<DemocracySummaryTeaser onPress={onPressEvent} />);
  await waitFor(() => {
    expect(getByText('Democracy')).toBeDefined();
    expect(getByText('Referenda')).toBeDefined();
    expect(getAllByText('Total').length).toBe(2);
    expect(getByText('Launch period')).toBeDefined();
    expect(getByText('26% 20 days 11 hrs')).toBeDefined();
  });
});
