import React from 'react';
import {IconProps, Icon as KittenIcon} from '@ui-kitten/components';

type PropTypes = {
  name: string;
} & IconProps;

function Icon(props: PropTypes) {
  return <KittenIcon {...props} name={props.name} />;
}

export default Icon;
