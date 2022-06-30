import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {AccountScreen} from './AccountScreen';
import {accountScreen} from '@ui/navigation/routeKeys';
import Clipboard from '@react-native-community/clipboard';

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AppStackParamList, typeof accountScreen>;

describe('AccountScreen', () => {
  it('should render the loading view when data is fetching', () => {
    const {getByTestId} = render(<AccountScreen route={route} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('render the AccountScreen component after data is fetched', async () => {
    const {findByText, findAllByText} = render(<AccountScreen route={route} />);
    await findByText('ADDRESS');
    await findByText('14yx4vPAACZRhoDQm…RCe5tj1zPomhhS29a');
    await findByText('Email');
    await findByText('info@purestake.com');
    await findByText('Twitter');
    await findByText('@nachortti');
    await findByText('Riot');
    await findByText('@raul.rtti:matrix.parity.io');
    await findByText('Web');
    await findByText('www.nachortti.com');
    await findByText('JUDGEMENT(S)');
    await findAllByText('"Reasonable" provided by Registrar #1');
    await findByText('Balance');
    await findByText('19,980.8923 DOT');
    await findByText('Reserved');
    await findByText('20.0410 DOT');
    await findByText('Locked');
    await findByText('19,848.0993 DOT');
  });

  it('should copy the address to clipboard when clicked on the address', async () => {
    const clipboardSpy = jest.spyOn(Clipboard, 'setString');
    const {findByText} = render(<AccountScreen route={route} />);
    fireEvent.press(await findByText('14yx4vPAACZRhoDQm…RCe5tj1zPomhhS29a'));
    expect(clipboardSpy).toBeCalledWith('14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
  });
});
