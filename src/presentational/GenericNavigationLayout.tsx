import React from 'react';
import SafeView from 'presentational/SafeView';
import {TopNavigation, Icon, IconProps, TopNavigationAction, Divider, Text} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import {monofontFamily} from 'src/styles';

type PropTypes = {
  title: string;
  children: React.ReactNode;
  onBackPressed: () => void;
  rightActions?: RenderProp;
};

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back-outline" />;

function GenericNavigationLayout(props: PropTypes) {
  const {children, title, onBackPressed, rightActions} = props;

  return (
    <SafeView>
      <TopNavigation
        alignment="center"
        title={() => (
          <Text category="s1" style={{fontFamily: monofontFamily}}>
            {title}
          </Text>
        )}
        accessoryLeft={() => <TopNavigationAction onPress={onBackPressed} icon={BackIcon} />}
        accessoryRight={rightActions}
      />
      <Divider />
      {children}
    </SafeView>
  );
}

export default GenericNavigationLayout;
