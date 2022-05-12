import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Subheading, Divider, Button} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles, {standardPadding, colorGreen} from '@ui/styles';
import {Padder} from '@ui/components/Padder';

type PropTypes = {
  text: string;
  onClosePress?: () => void;
};

export function SuccessDialog({text, onClosePress}: PropTypes) {
  return (
    <Layout style={globalStyles.paddedContainer}>
      <View style={styles.textContainer}>
        <Icon color={colorGreen} name="check-circle-outline" />
        <Subheading numberOfLines={2} style={{marginLeft: standardPadding}}>
          {text}
        </Subheading>
      </View>
      <Padder scale={1} />
      {onClosePress ? (
        <>
          <Divider />
          <Padder scale={1} />
          <Button onPress={onClosePress}>Close</Button>
        </>
      ) : null}
    </Layout>
  );
}

const styles = StyleSheet.create({
  textContainer: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
});
