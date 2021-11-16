import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Divider, RadioGroup, Radio} from '@ui-kitten/components';
import globalStyles from 'src/styles';
import {NetworkType} from 'src/types';
import {isEqual} from 'lodash';

type PropTypes = {
  items: NetworkType[];
  selected?: NetworkType;
  onSelect: (item: NetworkType) => void;
};

function NetworkSelectionList(props: PropTypes) {
  const {items, selected, onSelect} = props;
  const [selectedIndex, setSelectedIndex] = useState(items.findIndex(({ws}) => isEqual(selected?.ws, ws)));

  if (!selected) {
    return null;
  }

  return (
    <>
      <View style={styles.header}>
        <Text category="h6">Networks</Text>
        <Divider style={globalStyles.divider} />
      </View>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          if (index !== selectedIndex) {
            setSelectedIndex(index);
            const network = items[index];
            if (network) {
              onSelect(network);
            }
          }
        }}>
        {items.map((item, index) => {
          const key = item.ws ? item.ws[0] : `key-${index}`;
          return (
            <Radio checked={isEqual(item.ws, selected.ws)} key={key}>
              {item.name}
            </Radio>
          );
        })}
      </RadioGroup>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {alignItems: 'center'},
});

export default NetworkSelectionList;
