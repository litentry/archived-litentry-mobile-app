/** @deprecated use @ui/components/Account/JudgmentStatus instead */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, useTheme, Caption} from '@ui/library';
import {mapStatusText} from 'src/utils/identity';
import {colorGreen, colorRed, colorGray} from '@ui/styles';
import {Popable} from 'react-native-popable';
import type {SubstrateChainDeriveAccountRegistration} from 'src/generated/litentryGraphQLTypes';

type PropTypes = {
  judgement: any; // change to SubstrateChainRegistrationJudgement
  registration?: SubstrateChainDeriveAccountRegistration;
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
  const {judgement, registration} = props;
  const status = mapStatusText(judgement, Boolean(registration?.displayParent));

  return (
    <Popable
      content={
        <View style={styles.container}>
          <Caption>{`"${status.text}" provided by Registrar #${judgement}`}</Caption>
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
