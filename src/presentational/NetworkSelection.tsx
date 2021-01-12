import React, {useState, useCallback} from 'react';
import {Select, SelectItem, IndexPath} from '@ui-kitten/components';
import {NetworkType} from 'src/types';

type PropTypes = {
  data: NetworkType[];
  onSelect: (item: NetworkType) => void;
};

function NetworkSelection({data, onSelect}: PropTypes) {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );

  const handleSelection = useCallback(
    (index: IndexPath) => {
      setSelectedIndex(index);
      console.log(onSelect);
      onSelect(data[index.row]);
    },
    [data, onSelect],
  );

  return (
    <Select
      label="Network"
      multiSelect={false}
      caption="Select network for this account"
      value={data[selectedIndex.row].name}
      selectedIndex={selectedIndex}
      onSelect={(index) => handleSelection(index as IndexPath)}>
      {data.map((item) => (
        <SelectItem key={item.key} title={item.name} />
      ))}
    </Select>
  );
}

export default NetworkSelection;
