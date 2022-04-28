import {NavigationProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {ReactTestInstance} from 'react-test-renderer';
import {render, waitFor, within} from 'src/testUtils';
import {ParachainsOverviewScreen} from './OverviewScreen';

let navigation: NavigationProp<ParachainsStackParamList>;

describe('OverviewScreen component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<ParachainsOverviewScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('render the component when data arrives', async () => {
    const {getAllByTestId, getAllByText} = await waitFor(() =>
      render(<ParachainsOverviewScreen navigation={navigation} />),
    );
    const parachainItems = getAllByTestId('parachain_items');
    expect(parachainItems.length).toBe(10);
    expect(within(parachainItems[0] as ReactTestInstance).getByText('Statemint')).toBeTruthy();
    expect(within(parachainItems[9] as ReactTestInstance).getByText('Nodle')).toBeTruthy();

    const leasePeriodElement = getAllByText('Lease Period');
    expect(leasePeriodElement).toHaveLength(1);
    const parachainsElement = getAllByText('Parachains');
    expect(parachainsElement).toHaveLength(1);
  });
});
