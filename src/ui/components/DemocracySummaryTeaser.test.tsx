import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {DemocracySummaryTeaser} from './DemocracySummaryTeaser';

const onPressEvent = jest.fn();

describe('DemocracySummaryTeaser component', () => {
  it('should render the component with the data', async () => {
    const {getByLabelText, debug} = await waitFor(() => render(<DemocracySummaryTeaser onPress={onPressEvent} />));
    debug();
  });
});
