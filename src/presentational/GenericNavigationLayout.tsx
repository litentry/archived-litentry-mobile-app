import React from 'react';
import SafeView from 'presentational/SafeView';
import {
  TopNavigation,
  Icon,
  IconProps,
  TopNavigationAction,
  Divider,
  Text,
} from '@ui-kitten/components';
import {monofontFamily} from 'src/styles';

type PropTypes = {
  title: string;
  children: React.ReactNode;
  onBackPressed: () => void;
};

const BackIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-back-outline" />
);

function GenericNavigationLayout(props: PropTypes) {
  const {children, title, onBackPressed} = props;

  return (
    <SafeView>
      <TopNavigation
        alignment="center"
        title={() => (
          <Text category="s1" style={{fontFamily: monofontFamily}}>
            {title}
          </Text>
        )}
        accessoryLeft={() => (
          <TopNavigationAction onPress={onBackPressed} icon={BackIcon} />
        )}
      />
      <Divider />
      {children}
    </SafeView>
  );
}

export default GenericNavigationLayout;
