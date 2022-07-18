import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render} from 'src/testUtils';
import {MotionDetailScreen} from './MotionDetailScreen';

const navigation = {} as unknown as NativeStackNavigationProp<AppStackParamList>;

const route = {
  params: {
    hash: '0x45112659b1fd3373d4f34b850c3f1f22124f9bd507843a183225a037eaf9cc91',
  },
} as RouteProp<DashboardStackParamList, 'Motion'>;

describe('MotionDetailScreen', () => {
  it('should render the loading component when data is fetching', () => {
    const {getByTestId} = render(<MotionDetailScreen navigation={navigation} route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the MotionDetailScreen component when data is fetched', async () => {
    const {findByText, findAllByText} = render(<MotionDetailScreen navigation={navigation} route={route} />);
    await findByText('ID');
    await findByText('221');
    await findByText('Detail');
    await findByText('Status');
    await findByText('Voteable');
    await findByText('Section');
    await findByText('democracy');
    await findByText('Method');
    await findByText('externalProposeMajority');
    await findByText('Aye (1/2)');
    await findByText('Nay (1/2)');
    await findAllByText('Votes');
    await findByText('Joe');
    await findByText('Wei');
  });
});
