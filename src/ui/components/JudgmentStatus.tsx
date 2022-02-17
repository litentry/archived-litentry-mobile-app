/** @deprecated use @ui/components/Account/JudgmentStatus instead */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RegistrationJudgement} from '@polkadot/types/interfaces';
import {Icon, useTheme, Caption} from '@ui/library';
import {mapStatusText} from 'src/utils/identity';
import {colorGreen, colorRed, colorGray} from '@ui/styles';
import {Popable} from 'react-native-popable';

type PropTypes = {
  judgement: RegistrationJudgement;
  hasParent: boolean;
};

function getIconColor(status: string) {
  if (status === 'good') {
    return colorGreen;
  } else if (status === 'bad') {
    return colorRed;
  }
  return colorGray;
}

function JudgmentStatus(props: PropTypes) {
  const {colors} = useTheme();
  const {judgement, hasParent} = props;
  const status = mapStatusText(judgement[1], hasParent);

  return (
    <Popable
      content={
        <View style={styles.container}>
          <Caption>{`"${status.text}" provided by Registrar #${judgement[0]}`}</Caption>
        </View>
      }
      backgroundColor={colors.accent}>
      <Icon name={status.icon} size={20} color={getIconColor(status.category)} />
    </Popable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JudgmentStatus;
