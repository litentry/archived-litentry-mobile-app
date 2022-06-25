import {RouteProp} from '@react-navigation/native';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {fireEvent, render} from 'src/testUtils';
import {CrowdloanFundDetailScreen} from './CrowdloanFundDetailScreen';

const route = {
  params: {
    paraId: '2013',
    title: 'Litentry',
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
    const {findByText, findAllByText} = render(<CrowdloanFundDetailScreen route={route} />);
    await findByText('Index:');
    await findByText('2013');
    await findByText('Depositor:');
    await findAllByText('Litentry');
    await findByText('Ending:');
    await findByText('28 days 26 mins');
    await findByText('Status:');
    await findByText('Past');
    await findByText('Leases:');
    await findByText('8 - 15');
    await findByText('Raised:');
    await findByText('943,842.0909 DOT / 3.0000 MDOT');
    await findByText('Contributors:');
    await findByText('3,463');
    await findByText('Homepage');
  });

  it('should open home page of the project in browser ', async () => {
    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    const {findByText} = render(<CrowdloanFundDetailScreen route={route} />);
    fireEvent.press(await findByText('Homepage'));
    expect(linkingSpy).toHaveBeenCalledWith('https://crowdloan.litentry.com');
  });
});
