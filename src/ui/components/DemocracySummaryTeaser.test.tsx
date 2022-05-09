import React from 'react';
import {render, wait} from 'src/testUtils';
import {DemocracySummaryTeaser} from './DemocracySummaryTeaser';

const onPressEvent = jest.fn();

describe('DemocracySummaryTeaser component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<DemocracySummaryTeaser onPress={onPressEvent} />);
    expect(getByTestId('loading_box')).toBeTruthy();
  });

  it('should render the component with the data', async () => {
    const {getAllByText} = render(<DemocracySummaryTeaser onPress={onPressEvent} />);
    await wait();

    const democracyElement = getAllByText('Democracy');
    expect(democracyElement).toHaveLength(1);
    const totalElements = getAllByText('Total');
    expect(totalElements).toHaveLength(2);
    const referendaElement = getAllByText('Referenda');
    expect(referendaElement).toHaveLength(1);
    const progressChart = getAllByText('Launch period');
    expect(progressChart).toHaveLength(1);
    expect(getAllByText('87% 3 days 10 hrs')).toBeTruthy();
  });
});
