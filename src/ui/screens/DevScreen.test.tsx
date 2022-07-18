import React from 'react';
import {render} from 'src/testUtils';
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
});
