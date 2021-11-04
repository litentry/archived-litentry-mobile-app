import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {useAccounts} from 'context/AccountsContext';
import {NetworkContext} from 'context/NetworkContext';
import React, {useContext} from 'react';

interface Props {
  selected?: string;
  onSelect: (address: string) => void;
}

export function SelectAccount({selected, onSelect}: Props) {
  const {accounts} = useAccounts();
  const {currentNetwork} = useContext(NetworkContext);
  const networkAccounts = Object.values(accounts).filter((account) => account.meta.network === currentNetwork.key);

  const selectedIndex = networkAccounts.findIndex((a) => a.address === selected);
  const selectedIndexPath = selectedIndex > -1 ? new IndexPath(selectedIndex) : undefined;

  return (
    <Select
      label="Account"
      multiSelect={false}
      value={selected}
      selectedIndex={selectedIndexPath}
      onSelect={(index) => {
        if (!Array.isArray(index)) {
          const selectedAddress = networkAccounts[index.row]?.address;
          if (selectedAddress) {
            onSelect(selectedAddress);
          }
        }
      }}>
      {networkAccounts.map((item) => (
        <SelectItem key={item.address} title={item.address} />
      ))}
    </Select>
  );
}
