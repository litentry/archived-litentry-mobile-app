import {RegistrationJudgement} from '@polkadot/types/interfaces';
import {Icon, Tooltip} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {mapStatusText} from 'src/identityUtils';
import {colorGreen} from 'src/styles';

type PropTypes = {
  judgement: RegistrationJudgement;
  hasParent: boolean;
};

function JudgmentStatus(props: PropTypes) {
  const {judgement, hasParent} = props;
  const status = mapStatusText(judgement[1], hasParent);
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
        style={[styles.icon, styles[status.category as 'good' | 'bad' | 'neutral']]}
      />
    </TouchableOpacity>
  );

  return (
    <Tooltip anchor={renderIcon} visible={visible} onBackdropPress={() => setVisible(false)}>
      {`"${status.text}" provided by Registrar #${judgement[0]}`}
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
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
