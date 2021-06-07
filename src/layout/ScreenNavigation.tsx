import React from 'react';
import {TopNavigation, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type PropTypes = {
  accessoryLeft?: React.ReactElement;
  accessoryRight?: React.ReactElement;
  renderTitle: () => React.ReactElement;
};

export default function ScreenNavigation({accessoryLeft, accessoryRight, renderTitle}: PropTypes) {
  const themeVars = useTheme();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={{backgroundColor: themeVars['background-basic-color-1']}}>
      <View style={styles.container}>
        <TopNavigation
          alignment="center"
          title={renderTitle}
          accessoryLeft={accessoryLeft ? () => accessoryLeft : undefined}
          accessoryRight={accessoryRight ? () => accessoryRight : undefined}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
  },
});
