import React from 'react';
import {View} from 'react-native';
import globalStyles from '@ui/styles';
import {Caption, Subheading} from '@ui/library';

type PropTypes = {title: string; subtitle?: string};

function ModalTitle(props: PropTypes) {
  const {title, subtitle = ''} = props;

  return (
    <View style={[globalStyles.rowContainer, globalStyles.centeredContainer]}>
      <Subheading numberOfLines={1} ellipsizeMode="middle" selectable>
        {title}
      </Subheading>
      {subtitle ? <Caption>{subtitle}</Caption> : null}
    </View>
  );
}

export default ModalTitle;
