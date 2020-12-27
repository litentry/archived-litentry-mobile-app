import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RegistrationJudgement} from '@polkadot/types/interfaces';
import {Icon, Tooltip} from '@ui-kitten/components';
import {standardPadding, colorGreen} from 'src/styles';
import {mapStatusText} from 'src/identityUtils';

type PropTypes = {
  judgement: RegistrationJudgement;
};

function JudgmentStatus(props: PropTypes) {
  const {judgement} = props;
  const status = mapStatusText(judgement[1]);
  const [visible, setVisible] = useState(false);

  const renderIcon = () => (
    <TouchableOpacity
      onPress={() => {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 3000);
      }}>
      <Icon
        pack="ionic"
        name={status.icon}
        style={[
          styles.icon,
          styles[status.category as 'good' | 'bad' | 'neutral'],
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <Tooltip
      anchor={renderIcon}
      visible={visible}
      onBackdropPress={() => setVisible(false)}>
      {`"${status.text}" provided by Registrar #${judgement[0]}`}
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorGreen,
    // opacity: 0.9,
    paddingVertical: standardPadding / 2,
    paddingHorizontal: standardPadding,
    borderRadius: 3,
    marginLeft: standardPadding / 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: standardPadding,
  },
  good: {color: colorGreen},
  bad: {color: 'red'},
  neutral: {color: '#ccc'},
  text: {
    fontSize: 11,
    color: 'white',
  },
});

export default JudgmentStatus;
