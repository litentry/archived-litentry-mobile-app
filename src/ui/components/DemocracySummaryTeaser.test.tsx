import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {DemocracySummaryTeaser} from './DemocracySummaryTeaser';

const onPressEvent = {
  navigate: jest.fn(),
};

describe('DemocracySummaryTeaser', () => {
  it('should render the loading view while data is fetching', () => {
    const {getByTestId} = render(<DemocracySummaryTeaser onPress={onPressEvent.navigate} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  test('should render the component data after the loading view has finished', async () => {
    const {findByText, findAllByText} = render(<DemocracySummaryTeaser onPress={onPressEvent.navigate} />);
    await findByText('Democracy');
    await findByText('Proposals');
    await findByText('Referenda');
    await findAllByText('Total');
    await findByText('Launch period');
  });

  it('should navigate to council summary page on click of the teaser', async () => {
    const democracySummaryTeaserSpy = jest.spyOn(onPressEvent, 'navigate');
    const {findByText} = render(<DemocracySummaryTeaser onPress={onPressEvent.navigate} />);
    await findByText('Democracy');
    const democracySummaryTeaser = await findByText('Proposals');
    fireEvent.press(democracySummaryTeaser);
    expect(democracySummaryTeaserSpy).toBeCalledTimes(1);
  });
});
