import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {TreasurySummaryTeaser} from './TreasurySummaryTeaser';

const onPressEvent = {
  onPress: jest.fn(),
};

describe('TreasurySummaryTeaser', () => {
  it('render the loading view while data is fetching', () => {
    const {getByTestId} = render(<TreasurySummaryTeaser onPress={onPressEvent.onPress} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the TreasurySummaryTeaser component when data is fetched', async () => {
    const {findByText} = render(<TreasurySummaryTeaser onPress={onPressEvent.onPress} />);
    await findByText('Proposals');
    await findByText('Totals');
    await findByText('Approved');
    await findByText('Spend period (6 days)');
    await findByText('Available');
    await findByText('Next Burn');
  });

  it('should test for onPress props when tapped on BountySummaryTeaser component', async () => {
    const bountiesTeaserSpy = jest.spyOn(onPressEvent, 'onPress');
    const {findByText} = render(<TreasurySummaryTeaser onPress={onPressEvent.onPress} />);
    const bountiesTeaser = await findByText('Proposals');
    fireEvent.press(bountiesTeaser);
    expect(bountiesTeaserSpy).toBeCalledTimes(1);
  });
});
