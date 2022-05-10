import {NavigationProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {ParachainsOverviewScreen} from './OverviewScreen';

let navigation: NavigationProp<ParachainsStackParamList>;

describe('OverviewScreen component', () => {
  it('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<ParachainsOverviewScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it.skip('renders the component when data arrives', async () => {
    const {getAllByText, getByText} = await waitFor(() => render(<ParachainsOverviewScreen navigation={navigation} />));
    const parachainsElement = getAllByText('Parachains:');
    expect(parachainsElement).toHaveLength(1);
    const totalPeriodElement = getAllByText('Total period:');
    expect(totalPeriodElement).toHaveLength(1);
    const remainingElement = getAllByText('Remaining:');
    expect(remainingElement).toHaveLength(1);
    const leasePeriodElement = getAllByText('Lease Period');
    expect(leasePeriodElement).toHaveLength(1);

    expect(getByText('Statemint')).toBeTruthy();
    expect(getByText('1000')).toBeTruthy();
    expect(getByText('7 - 20')).toBeTruthy();

    expect(getByText('Acala')).toBeTruthy();
    expect(getByText('Clover')).toBeTruthy();
    expect(getByText('Moonbeam')).toBeTruthy();
    expect(getByText('Astar')).toBeTruthy();
    expect(getByText('Equilibrium')).toBeTruthy();
  });
});
