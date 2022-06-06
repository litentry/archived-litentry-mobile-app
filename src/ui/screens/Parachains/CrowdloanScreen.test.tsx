import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {ReactTestInstance} from 'react-test-renderer';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {CrowdloanScreen} from './CrowdloanScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<CrowdloansStackParamList>;

test('render the loading component view when data is fetching', () => {
  const {getByTestId} = render(<CrowdloanScreen navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component view when data is fetched', async () => {
  const {getByText, getAllByText} = render(<CrowdloanScreen navigation={navigation} />);
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  await waitFor(() => {
    expect(getByText('Litentry')).toBeTruthy();
    expect(getAllByText('+ Contribute').length).toBe(9);
    fireEvent.press(getAllByText('+ Contribute') as unknown as ReactTestInstance);
    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});
