import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text, Divider, RadioGroup, Radio} from '@ui-kitten/components';
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
    <Layout style={styles.container} level="1">
      <Layout level="1" style={styles.header}>
        <Text category="h4">Networks</Text>
        <Divider style={globalStyles.divider} />
      </Layout>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          if (index !== selectedIndex) {
            setSelectedIndex(index);
            onSelect(items[index]!);
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
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {alignItems: 'center'},
});

export default NetworkSelectionList;
