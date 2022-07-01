import {global} from '@apollo/client/utilities/globals';
import React, {useRef} from 'react';
import {Notification} from 'react-native-in-app-message';
import {ReactTestInstance} from 'react-test-renderer';
import {SetterOrUpdater} from 'recoil';
import {Account} from 'src/api/hooks/useAccount';
import {fireEvent, render} from 'src/testUtils';
import DevScreen from './DevScreen';

jest.mock('@atoms/activeAccount', () => {
  return {
    activeAccount: () => '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
    selectActiveAccount: () =>
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(),
        }),
      ),
  };
});

describe('DevScreen', () => {
  it('should render the DevScreen component', async () => {
    const {findByText, findAllByText} = render(<DevScreen />);
    await findByText('Network: Polkadot');
    await findByText('wss://rpc.polkadot.io');
    await findByText('Active account:');
    await findByText('Simple Notification');
    await findByText('Show simple text in app PN');
    await findAllByText('Trigger');
    await findByText('Show multi-lines Notification');
    await findByText('Show multi-lines In-App-PusNotification');
  });

  it('should test sample notification', () => {
    const notificationRef = useRef<Notification>(null).current as any;
    const notificationSpy = jest.spyOn(notificationRef, 'show');
    const {getAllByText} = render(<DevScreen />);
    expect(getAllByText('Trigger').length).toBe(2);
    fireEvent.press(getAllByText('Trigger')[0] as ReactTestInstance);
    expect(notificationSpy).toBeCalledTimes(1);
  });

  // TODO: TypeError: (0 , _activeAccount.useActiveAccount) is not a function and recoil
});
