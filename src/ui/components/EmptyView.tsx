import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import EmptyState from 'image/EmptyState.png';
import {Subheading} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {standardPadding} from '@ui/styles';
import {isString} from 'lodash';

const DEFAULT_TEXT = 'Here is nothing but space';

type Props = {
  children?: React.ReactNode;
  height?: number;
};

export function EmptyView({children = DEFAULT_TEXT, height = 400}: Props) {
  return (
    <View style={styles.container}>
      <Image source={EmptyState} style={{height}} resizeMode="contain" />
      <Padder scale={2} />
      {isString(children) ? <Subheading>{children}</Subheading> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: standardPadding * 3,
  },
});
