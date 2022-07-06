import {global} from '@apollo/client/utilities/globals';
import React, {useRef} from 'react';
import {Notification} from 'react-native-in-app-message';
import {ReactTestInstance} from 'react-test-renderer';
import {SetterOrUpdater} from 'recoil';
import {Account} from 'src/api/hooks/useAccount';
import {fireEvent, render} from 'src/testUtils';
import DevScreen from './DevScreen';

describe('DevScreen', () => {
  it('should render the DevScreen component', async () => {
    const {findByText, findAllByText} = render(<DevScreen />);
    await findByText('Network: Polkadot');
    await findByText('wss://rpc.polkadot.io');
    await findByText('Conviction selection');
    await findByText('Select active account');
    await findByText('Test account name');
    await findByText('Simple Notification');
    await findByText('Show simple text in app PN');
    await findAllByText('Trigger');
    await findByText('Show multi-lines Notification');
    await findByText('Show multi-lines In-App-PusNotification');
  });

  it('should test sample notification', async () => {
    //     const notificationRef = useRef<Notification>(null).current as any;
    // const notificationSpy = jest.spyOn(notificationRef, 'show');
    const {findByText, findAllByText} = render(<DevScreen />);
    await findByText('Network: Polkadot');
    expect((await findAllByText('Trigger')).length).toBe(2);
    fireEvent.press((await findAllByText('Trigger'))[0] as ReactTestInstance);
    // expect(notificationSpy).toBeCalledTimes(1);
  });

  // TODO: TypeError: (0 , _activeAccount.useActiveAccount) is not a function and recoil
});
