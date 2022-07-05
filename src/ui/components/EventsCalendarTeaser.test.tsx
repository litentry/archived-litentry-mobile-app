import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {EventsCalendarTeaser} from './EventsCalendarTeaser';

const onPressEvent = {
  pressEvent: jest.fn(),
};

describe('EventsCalendarTeaser', () => {
  it('should render the loading view when loading', async () => {
    const {getByTestId} = render(<EventsCalendarTeaser onPress={onPressEvent.pressEvent} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render when there are events', async () => {
    const {findByText} = render(<EventsCalendarTeaser onPress={onPressEvent.pressEvent} />);
    await findByText('Start of a new staking session 4,121');
    await findByText('Start of a new staking era 681');
    await findByText('Election of new council candidates');
  });

  it('should navigate to events calender component when pressed on the teaser', async () => {
    const navigationSpy = jest.spyOn(onPressEvent, 'pressEvent');
    const {findByText} = render(<EventsCalendarTeaser onPress={onPressEvent.pressEvent} />);
    fireEvent.press(await findByText('Start of a new staking session 4,121'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});
