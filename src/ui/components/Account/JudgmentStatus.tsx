import type {ProxyRegistrationJudgement} from 'src/generated/litentryGraphQLTypes';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, useTheme, Caption} from '@ui/library';
import {mapStatusText} from 'src/utils/identity';
import {colorGreen, colorRed, colorGray} from '@ui/styles';
import {Popable} from 'react-native-popable';

type JudgmentStatusProps = {
  registrationJudgement: ProxyRegistrationJudgement;
  hasParent: boolean;
};

export function JudgmentStatus(props: JudgmentStatusProps) {
  const {colors} = useTheme();
  const {registrationJudgement, hasParent} = props;

  if (!registrationJudgement.judgement) {
    return null;
  }

  const status = mapStatusText(registrationJudgement.judgement, hasParent);

  return (
    <Popable
      content={
        <View style={styles.container}>
          <Caption>{`"${status.text}" provided by Registrar #${registrationJudgement.index}`}</Caption>
        </View>
      }
      backgroundColor={colors.accent}>
      <Icon name={status.icon} size={20} color={getIconColor(status.category)} />
    </Popable>
  );
}

function getIconColor(status: string) {
  if (status === 'good') {
    return colorGreen;
  } else if (status === 'bad') {
    return colorRed;
  }
  return colorGray;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
