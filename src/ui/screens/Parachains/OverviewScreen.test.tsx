import {NavigationProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {create} from 'react-test-renderer';
import {render, waitFor, within} from 'src/testUtils';
import {ParachainsOverviewScreen} from './OverviewScreen';

let navigation: NavigationProp<ParachainsStackParamList>;

describe('OverviewScreen component', () => {
  test('should render the loading view when data is fetching', async () => {
    const {getByTestId} = render(<ParachainsOverviewScreen navigation={navigation} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  //   test('render the component when data arrives', async () => {
  //   const parachainsOverviewScreen = await waitFor(() => create(<ParachainsOverviewScreen navigation={navigation} />));
  //   console.log(parachainsOverviewScreen)
  // });
});
