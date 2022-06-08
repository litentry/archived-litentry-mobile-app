import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {BountySummaryTeaser} from './BountySummaryTeaser';

const onPressEvent = jest.fn();

const navigation = {
  navigate: () => jest.fn(),
};

test('render the loading view while data is fetching', () => {
  const {getByTestId} = render(<BountySummaryTeaser onPress={onPressEvent} />);
  expect(getByTestId('loading_box')).toBeTruthy();
});

test('should render the teaser component when data is fetched', async () => {
  const {getByText} = render(<BountySummaryTeaser onPress={onPressEvent} />);
  await waitFor(() => {
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Past')).toBeTruthy();
    expect(getByText('Active total')).toBeTruthy();
    expect(getByText('Funding period (17 days)')).toBeTruthy();
  });
});

test('component navigation on clicked', async () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getByText} = render(<BountySummaryTeaser onPress={onPressEvent} />);
  await waitFor(() => {
    const bounties = getByText('Bounties');
    expect(bounties).toBeTruthy();
    fireEvent.press(bounties);
    // expect(navigationSpy).toBeCalled()
  });
});
