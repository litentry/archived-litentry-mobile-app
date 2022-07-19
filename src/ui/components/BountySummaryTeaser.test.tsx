import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {BountySummaryTeaser} from './BountySummaryTeaser';

const onPressEvent = {
  onPress: jest.fn(),
};

describe('BountySummaryTeaser', () => {
  it('should render the loading view while data is fetching', () => {
    const {getByTestId} = render(<BountySummaryTeaser onPress={onPressEvent.onPress} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the bountySummaryTeaser component with initial data', async () => {
    const {findByText} = render(<BountySummaryTeaser onPress={onPressEvent.onPress} />);
    await findByText('Bounties');
    await findByText('5');
    await findByText('Active');
    await findByText('12');
    await findByText('Past');
    await findByText('1.2017 MDOT');
    await findByText('Bounties');
    await findByText('Active total');
    await findByText('Funding period (17 days)');
    await findByText('25% 17 days 20 hrs');
  });

  it('should test for onPress props when tapped on BountySummaryTeaser component', async () => {
    const bountiesTeaserSpy = jest.spyOn(onPressEvent, 'onPress');
    const {findByText} = render(<BountySummaryTeaser onPress={onPressEvent.onPress} />);
    await findByText('Bounties');
    const bountiesTeaser = await findByText('Active');
    fireEvent.press(bountiesTeaser);
    expect(bountiesTeaserSpy).toBeCalledTimes(1);
  });
});
