import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {BountySummaryTeaser} from './BountySummaryTeaser';

const onPressEvent = {
  navigate: jest.fn(),
};

describe('BountySummaryTeaser', () => {
  it('should render the loading view while data is fetching', () => {
    const {getByTestId} = render(<BountySummaryTeaser onPress={onPressEvent.navigate} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the bountySummaryTeaser component with initial data', async () => {
    const {findByText} = render(<BountySummaryTeaser onPress={onPressEvent.navigate} />);
    await findByText('Bounties');
    await findByText('Active');
    await findByText('Past');
    await findByText('Active total');
    await findByText('Funding period (17 days)');
  });

  it('should navigate to bounty summary page on click of the teaser', async () => {
    const bountiesTeaserSpy = jest.spyOn(onPressEvent, 'navigate');
    const {findByText} = render(<BountySummaryTeaser onPress={onPressEvent.navigate} />);
    await findByText('Bounties');
    const bountiesTeaser = await findByText('Active');
    fireEvent.press(bountiesTeaser);
    expect(bountiesTeaserSpy).toBeCalledTimes(1);
  });
});
