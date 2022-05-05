import {useAccounts} from 'context/AccountsContext';
import {useRemoteConfig} from 'src/hooks/useRemoteConfig';

export function useParachainAppEnabled() {
  const {accounts} = useAccounts();
  const {getValue} = useRemoteConfig();

  // TODO: add specific config to enable the "parachainApp"
  const configValue = getValue('token_bridge_test');
  let parachainAppEnabled = false;

  try {
    const parsedValue = JSON.parse(configValue.asString());
    const testAddress = parsedValue?.test_address ?? '';

    parachainAppEnabled = accounts[testAddress] ? true : false;
  } catch (error) {
    console.error(error);
  }

  return {parachainAppEnabled};
}
