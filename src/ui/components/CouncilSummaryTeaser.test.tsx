import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {CouncilSummaryTeaser} from './CouncilSummaryTeaser';

const onPressEvent = jest.fn();

test('render the loading view while data is fetching', () => {
  const {getByTestId} = render(<CouncilSummaryTeaser onPress={onPressEvent} />);
  expect(getByTestId('loading_box')).toBeTruthy();
});

test('should render the teaser component when data is fetched', async () => {
  const {getByText} = render(<CouncilSummaryTeaser onPress={onPressEvent} />);
  await waitFor(() => {
    expect(getByText('Council')).toBeTruthy();
    expect(getByText('Seats')).toBeTruthy();
    expect(getByText('Runners up')).toBeTruthy();
    expect(getByText('Candidates')).toBeTruthy();
    expect(getByText('Term Progress (1 day)')).toBeTruthy();
    expect(getByText('Prime Voter')).toBeTruthy();
  });
});
