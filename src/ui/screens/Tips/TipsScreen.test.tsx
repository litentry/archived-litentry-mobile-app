import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {TipsScreen} from './TipsScreen';
import {ReactTestInstance} from 'react-test-renderer';

const navigation = {
  navigate: () => jest.fn(),
} as unknown as NavigationProp<DashboardStackParamList>;

describe('TipsScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the loading view when data is fetching', () => {
    const {getByTestId} = render(<TipsScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the component when data is fetched', async () => {
    const {getByText, getAllByText} = render(<TipsScreen navigation={navigation} />);
    await waitFor(() => {
      expect(getByText('Propose Tip')).toBeTruthy();
      expect(getAllByText('Created:').length).toBe(9);
      expect(getAllByText('Status:').length).toBe(9);
      expect(getAllByText('Reason').length).toBe(9);
    });
  });

  it('should render the component and test click events', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {getByText, getAllByText} = render(<TipsScreen navigation={navigation} />);
    await waitFor(() => {
      expect(getByText('Propose Tip')).toBeTruthy();
      fireEvent.press(getByText('Propose Tip'));
      expect(navigationSpy).toBeCalledTimes(1);

      fireEvent.press(getAllByText('Reason')[0] as ReactTestInstance);
      expect(navigationSpy).toBeCalled();
    });
  });
});
