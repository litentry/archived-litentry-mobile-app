import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {TipDetailScreen} from './TipDetailScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReactTestInstance} from 'react-test-renderer';

const navigation = {
  navigate: () => jest.fn(),
} as unknown as NativeStackNavigationProp<AppStackParamList>;

const route = {
  parm: {
    id: '0xe72fd92707ea62a5df6f2472e366cee5e99fbcd0a68f2940879ff9e420bbc489',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Tip'>;

describe('TipDetailScreen', () => {
  it('should render the loading view when data is fetching', () => {
    const {getByTestId} = render(<TipDetailScreen navigation={navigation} route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the component when data is fetched', async () => {
    const {findByText, findAllByText} = render(<TipDetailScreen navigation={navigation} route={route} />);
    await findByText('Who');
    await findByText('SPRIN');
    await findByText('Finder');
    await findByText('CRYPTONITAS');
    await findByText('Reason');
    await findByText('Tippers (2)');
    await findByText('Chevdor');
    await findByText('TAFKAPK');
    await findAllByText('1.0000 KSM');
  });

  it('should render the component and test accounts click events', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findAllByTestId} = render(<TipDetailScreen navigation={navigation} route={route} />);
    fireEvent.press((await findAllByTestId('account-details')).at(0) as ReactTestInstance);
    expect(navigationSpy).toHaveBeenCalledWith('Account Details', {
      address: 'DbF59HrqrrPh9L2Fi4EBd7gn4xFUSXmrE6zyMzf3pETXLvg',
    });
  });
});
