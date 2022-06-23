import {RouteProp} from '@react-navigation/native';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {CrowdloanFundDetailScreen} from './CrowdloanFundDetailScreen';

const route = {
  params: {
    paraId: '100',
    title: 'test-title',
  },
} as RouteProp<CrowdloansStackParamList, 'Fund Detail'>;

describe('CrowdloanFundDetailScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading component when data is fetching', () => {
    const {getByTestId} = render(<CrowdloanFundDetailScreen route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render CrowdloanFundDetailScreen component with initial states', async () => {
    const {findByText} = render(<CrowdloanFundDetailScreen route={route} />);
    await findByText('Index:');
    await findByText('Depositor:');
    await findByText('Ending:');
    await findByText('Status:');
    await findByText('Leases:');
    await findByText('Raised:');
    await findByText('Contributors:');
    await findByText('Homepage');
  });

  it('should navigate to home page of the project', () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {getByText} = render(<CrowdloanFundDetailScreen route={route} />);

    waitFor(() => {
      fireEvent.press(getByText('Homepage'));
      expect(linkingSpy).toHaveBeenCalledWith('');
    });
  });
});
