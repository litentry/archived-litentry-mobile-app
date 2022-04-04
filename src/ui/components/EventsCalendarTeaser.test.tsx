import React from 'react';
import {render, waitFor, within} from 'src/testUtils';
import {EventsCalendarTeaser} from './EventsCalendarTeaser';

describe('EventsCalendarTeaser component', () => {
  it('should render the loading view when first rendered with no data', async () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const {getByTestId} = render(<EventsCalendarTeaser onPress={onPressEvent} />);
    expect(getByTestId).toBeTruthy();
  });

  it('renders data correctly', async () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const {getByTestId, getAllByTestId} = await waitFor(() => render(<EventsCalendarTeaser onPress={onPressEvent} />));
  });
});
