import {NavigationProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {ParachainsOverviewScreen} from './OverviewScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<ParachainsStackParamList>;

describe('', () => {
  it('should render the loading component view when data is fetching', async () => {
    const {getByTestId} = render(<ParachainsOverviewScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should renders the ParachainsOverviewScreen component when data is fetched', async () => {
    const {findByText} = render(<ParachainsOverviewScreen navigation={navigation} />);
    await findByText('Parachains:');
    await findByText('14');
    await findByText('Total period:');
    await findByText('84 days');
    await findByText('Remaining:');
    await findByText('36 days');
    await findByText('Lease Period');
    await findByText('Current lease:');
    await findByText('7');
    await findByText('Parachains');
    await findByText('Leases');

    await findByText('Statemint');
    await findByText('1130 days 21 hrs');
    await findByText('Acala');
    await findByText('542 days 21 hrs');
  });

  it('should navigate to the parachainDetailScreen on click of the parachain', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText} = render(<ParachainsOverviewScreen navigation={navigation} />);

    fireEvent.press(await findByText('Statemint'));
    expect(navigationSpy).toBeCalledWith('Parachain', {parachainId: '1000'});
  });
});
