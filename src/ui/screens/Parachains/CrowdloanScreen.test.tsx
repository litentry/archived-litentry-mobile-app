import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {CrowdloanScreen} from './CrowdloanScreen';

test('render the loading component view when data is fetching', () => {
  const {getByTestId} = render(<CrowdloanScreen />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

// test('render the component view when data is fetched', async () => {
//   const {getByText} = render(<CrowdloanScreen/>);
//   await waitFor(() => {
// expect(getByText('Active Raised / Cap')).toBeTruthy();
//   })
// });
