import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {CouncilSummaryTeaser} from './CouncilSummaryTeaser';

const onPressEvent = {
  navigate: jest.fn(),
};

describe('CouncilSummaryTeaser', () => {
  it('should render the loading box component while data is fetching', () => {
    const {getByTestId} = render(<CouncilSummaryTeaser onPress={onPressEvent.navigate} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the CouncilSummaryTeaser component when data is fetched', async () => {
    const {findByText} = render(<CouncilSummaryTeaser onPress={onPressEvent.navigate} />);
    await findByText('Council');
    await findByText('Seats');
    await findByText('Runners up');
    await findByText('Candidates');
    await findByText('Term Progress (1 day)');
    await findByText('Prime Voter');
  });

  it('should navigate to council summary page on click of the teaser', async () => {
    const councilSummaryTeaserSpy = jest.spyOn(onPressEvent, 'navigate');
    const {findByText} = render(<CouncilSummaryTeaser onPress={onPressEvent.navigate} />);
    await findByText('Council');
    const councilSummaryTeaser = await findByText('Seats');
    fireEvent.press(councilSummaryTeaser);
    expect(councilSummaryTeaserSpy).toBeCalledTimes(1);
  });
});
