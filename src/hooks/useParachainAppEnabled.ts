import {useAccounts} from 'context/AccountsContext';
import {useRemoteConfig} from 'src/hooks/useRemoteConfig';

export function useParachainAppEnabled() {
  const {accounts} = useAccounts();
  const {getValue} = useRemoteConfig();

  // TODO: add specific config to enable the "parachainApp"
  const configValue = getValue('token_bridge_test');
  const testAddress = JSON.parse(configValue.asString())?.test_address ?? '';
  const parachainAppEnabled = accounts[testAddress] ? true : false;

  return {parachainAppEnabled};
}
