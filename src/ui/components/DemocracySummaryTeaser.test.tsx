import React from 'react';
import {render, waitFor, within, create} from 'src/testUtils';
import {DemocracySummaryTeaser} from './DemocracySummaryTeaser';

const onPressEvent = jest.fn();

describe('DemocracySummaryTeaser component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<DemocracySummaryTeaser onPress={onPressEvent} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the component with the data', async () => {
    const {getByTestId} = await waitFor(() => render(<DemocracySummaryTeaser onPress={onPressEvent} />));
    const activeProposal = getByTestId('activeProposals_id');
    expect(within(activeProposal).getByText('0')).toBeTruthy();
    const proposals = getByTestId('proposals_id');
    expect(within(proposals).getByText('17')).toBeTruthy();
    const referendums = getByTestId('referendums_id');
    expect(within(referendums).getByText('60')).toBeTruthy();
    const activeReferendums = getByTestId('activeReferendums_id');
    expect(within(activeReferendums).getByText('1')).toBeTruthy();
    const progressChart = getByTestId('progress_chart_id');
    expect(within(progressChart).getByText('87% 3 days 10 hrs')).toBeTruthy();
  });
});
