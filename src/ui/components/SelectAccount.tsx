import React from 'react';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {Account} from 'context/AccountsContext';

interface Props {
  accounts: Account[];
  selected?: string;
  onSelect: (address: string) => void;
}

export function SelectAccount({selected, onSelect, accounts}: Props) {
  const selectedIndex = accounts.findIndex((a) => a.address === selected);
  const selectedIndexPath = selectedIndex > -1 ? new IndexPath(selectedIndex) : undefined;

  return (
    <Select
      label="Account"
      multiSelect={false}
      value={selected}
      selectedIndex={selectedIndexPath}
      onSelect={(index) => {
        if (!Array.isArray(index)) {
          const selectedAddress = accounts[index.row]?.address;
          if (selectedAddress) {
            onSelect(selectedAddress);
          }
        }
      }}>
      {accounts.map((item) => (
        <SelectItem key={item.address} title={item.address} />
      ))}
    </Select>
  );
}
