import React from 'react';
import {render} from 'src/testUtils';
import {CrowdloanSummaryTeaser} from './CrowdloanSummaryTeaser';

describe('CrowdloanSummaryTeaser', () => {
  it('should render the loading box while data is fetching', () => {
    const {getByTestId} = render(<CrowdloanSummaryTeaser />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the CrowdloanSummaryTeaser component when data is fetched', async () => {
    const {findByText} = render(<CrowdloanSummaryTeaser />);
    await findByText('Active Raised / Cap');
    await findByText('Total Raised / Cap');
  });
});
