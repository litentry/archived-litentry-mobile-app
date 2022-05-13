import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {EventsCalendarTeaser} from './EventsCalendarTeaser';

const onPressEvent = jest.fn();

test('should render the loading view when loading', async () => {
  const {getByTestId} = render(<EventsCalendarTeaser onPress={onPressEvent} />);
  expect(getByTestId('loading_box')).toBeTruthy();
});

test('render when there are events', async () => {
  const {getByText} = render(<EventsCalendarTeaser onPress={onPressEvent} />);
  await waitFor(() => {
    expect(getByText('Start of a new staking session 4,121')).toBeTruthy();
    expect(getByText('Start of a new staking era 681')).toBeTruthy();
    expect(getByText('Election of new council candidates')).toBeTruthy();
  });
});
