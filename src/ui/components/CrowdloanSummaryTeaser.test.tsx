import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {CrowdloanSummaryTeaser} from './CrowdloanSummaryTeaser';

test('render the loading view while data is fetching', () => {
  const {getByTestId} = render(<CrowdloanSummaryTeaser />);
  expect(getByTestId('loading_box')).toBeTruthy();
});

test('should render the teaser component when data is fetched', async () => {
  const {getByText} = render(<CrowdloanSummaryTeaser />);
  await waitFor(() => {
    expect(getByText('Active Raised / Cap')).toBeTruthy();
    expect(getByText('Total Raised / Cap')).toBeTruthy();
  });
});
