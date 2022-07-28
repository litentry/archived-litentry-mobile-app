import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, useTheme, Text} from '@ui/library';
import {mapStatusText} from 'src/utils/identity';
import {colorGreen, colorRed, colorGray} from '@ui/styles';
import {Popable} from 'react-native-popable';
import type {RegistrationJudgment} from 'src/api/hooks/useAccount';

type Props = {
  registrationJudgement: RegistrationJudgment;
  hasParent: boolean;
};

export function JudgmentStatus({registrationJudgement, hasParent}: Props) {
  const {colors} = useTheme();

  if (!registrationJudgement.judgement) {
    return null;
  }

  const status = mapStatusText(registrationJudgement.judgement, hasParent);

  return (
    <Popable
      content={
        <View style={styles.container}>
          <Text variant="bodySmall">{`"${status.text}" provided by Registrar #${registrationJudgement.registrarIndex}`}</Text>
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
