// import React, {useState} from 'react';
// import {View} from 'react-native';
// import { RadioGroup, Radio} from '@ui-kitten/components';
// import {Subheading, Divider, RadioButton} from '@ui/library'
// import globalStyles from '@ui/styles';
// import {NetworkType} from 'src/types';
// import {isEqual} from 'lodash';
// import { Padder } from './Padder';

// type PropTypes = {
//   items: NetworkType[];
//   selected?: NetworkType;
//   onSelect: (item: NetworkType) => void;
// };

// function NetworkSelectionList(props: PropTypes) {
//   const {items, selected, onSelect} = props;
//   const [selectedIndex, setSelectedIndex] = useState(items.findIndex(({ws}) => isEqual(selected?.ws, ws)));

//   return (
//     <>
//       <View style={globalStyles.alignCenter}>
//         <Subheading>Networks</Subheading>
//         <Padder scale={0.5} />
//       </View>
//       <Divider />

//       <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
//       <RadioButton.Item label="First item" value="first" />
//       <RadioButton.Item label="Second item" value="second" />
//     </RadioButton.Group>

//       {/* <RadioGroup
//         selectedIndex={selectedIndex}
//         onChange={(index) => {
//           if (index !== selectedIndex) {
//             setSelectedIndex(index);
//             const network = items[index];
//             if (network) {
//               onSelect(network);
//             }
//           }
//         }}>
//         {items.map((item, index) => {
//           const key = item.ws ? item.ws[0] : `key-${index}`;
//           return (
//             <Radio checked={isEqual(item.ws, selected.ws)} key={key}>
//               {item.name}
//             </Radio>
//           );
//         })}
//       </RadioGroup> */}
//     </>
//   );
// }

// export default NetworkSelectionList;

import React from 'react';
import {View} from 'react-native';
import {Divider, Subheading, RadioButton} from '@ui/library';
import globalStyles from '@ui/styles';
import {NetworkType} from 'src/types';
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
        <Subheading>Networks</Subheading>
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
