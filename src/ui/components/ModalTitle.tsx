import React from 'react';
import {View, StyleSheet} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import {Caption, Subheading} from '@ui/library';

type PropTypes = {title: string; subtitle?: string};

function ModalTitle(props: PropTypes) {
  const {title, subtitle = ''} = props;

  return (
    <View style={[globalStyles.rowContainer, globalStyles.fillCenter, styles.container]}>
      <Subheading numberOfLines={1} ellipsizeMode="middle" selectable>
        {title}
      </Subheading>
      {subtitle ? <Caption>{subtitle}</Caption> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: standardPadding,
  },
});

export default ModalTitle;
