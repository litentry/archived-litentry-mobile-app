import {NavigationProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {AddAccountScreen} from './AddAccountScreen';

const navigation = {} as NavigationProp<AppStackParamList>;

test('render the loading view when rendered with no data', async () => {
  const {getByPlaceholderText, getByText} = render(<AddAccountScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('Add external account')).toBeTruthy();
    const inputAddress = getByPlaceholderText('👉 Paste address here, e.g. 167r...14h');
    expect(inputAddress).toBeTruthy();
    fireEvent.changeText(inputAddress, '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
  });
});
