import React from 'react';
import {View} from 'react-native';
import {Divider, Text, RadioButton} from '@ui/library';
import globalStyles from '@ui/styles';
import type {NetworkType} from '@atoms/network';
import {Padder} from '@ui/components/Padder';

type PropTypes = {
  items: NetworkType[];
  selected: NetworkType;
  onSelect: (item: NetworkType) => void;
};

function NetworkSelectionList(props: PropTypes) {
  const {items, selected, onSelect} = props;
  const [selectedNetwork, setSelectedNetwork] = React.useState(selected);

  const onChange = (value: string) => {
    const network = items.find((item) => item.ws.some((ws) => ws === value));
    if (network) {
      setSelectedNetwork(network);
      onSelect(network);
    }
  };

  return (
    <>
      <View style={globalStyles.alignCenter}>
        <Text variant="titleMedium">Networks</Text>
      </View>
      <Padder scale={0.5} />
      <Divider />

      <RadioButton.Group onValueChange={onChange} value={selectedNetwork.ws[0] as string}>
        {items.map((item) => {
          const value = item.ws[0] as string;
          return <RadioButton.Item label={item.name} value={value} key={value} />;
        })}
      </RadioButton.Group>
    </>
  );
}

export default NetworkSelectionList;
