import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {EventsCalendarTeaser} from './EventsCalendarTeaser';

const onPressEvent = jest.fn();
onPressEvent.mockReturnValue('Link on press invoked');

describe('EventsCalendarTeaser component', () => {
  it('should render the loading view when first rendered with no data', async () => {
    const {getByTestId} = await render(<EventsCalendarTeaser onPress={onPressEvent} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('when there is no data to render', async () => {
    const {getAllByTestId} = await waitFor(() => render(<EventsCalendarTeaser onPress={onPressEvent} />));
    expect(getAllByTestId('empty_state')).toBeTruthy();
  });
});
