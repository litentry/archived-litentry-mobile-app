import React from 'react';
import type {ReactTestInstance} from 'react-test-renderer';
import {render, waitFor, within} from 'src/testUtils';
import {EventsCalendarTeaser} from './EventsCalendarTeaser';

const onPressEvent = jest.fn();

describe('EventsCalendarTeaser component', () => {
  it('should render the loading view when first rendered with no data', async () => {
    const {getByTestId} = render(<EventsCalendarTeaser onPress={onPressEvent} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('when there is no data to render', async () => {
    const {getAllByTestId} = await waitFor(() => render(<EventsCalendarTeaser onPress={onPressEvent} />));
    const eventItems = getAllByTestId('upcoming_event_items');
    expect(eventItems.length).toBe(3);
    expect(within(eventItems[0] as ReactTestInstance).getByText('Start of a new staking session 4,121')).toBeTruthy();
    expect(within(eventItems[1] as ReactTestInstance).getByText('Start of a new staking era 681')).toBeTruthy();
    expect(within(eventItems[1] as ReactTestInstance).getByText('Election of new council candidates')).toBeTruthy();
  });
});
