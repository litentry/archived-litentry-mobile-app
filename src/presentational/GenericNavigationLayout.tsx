import React from 'react';
import {StyleSheet} from 'react-native';
import SafeView from 'presentational/SafeView';
import {
  TopNavigation,
  Icon,
  IconProps,
  Layout,
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
      <Layout style={styles.container}>
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
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default GenericNavigationLayout;
