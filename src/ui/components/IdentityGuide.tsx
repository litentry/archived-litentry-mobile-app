import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {Layout} from '@ui/components/Layout';
import {Text, Button, Subheading} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import PagerView from 'react-native-pager-view';
import {Padder} from './Padder';

type Props = {
  onClose: () => void;
};

export function IdentityGuide({onClose}: Props) {
  return (
    <Layout>
      <Subheading style={globalStyles.textCenter}>{`Identity Guid`}</Subheading>
      <Padder scale={1} />
      <PagerView style={styles.pager} showPageIndicator>
        <View>
          <GuideRow
            text="1. Fill out information you wanna submit to set your identity"
            image={require('src/image/identity_guide/step1.jpg')}
            direction="row-reverse"
          />
          <GuideRow
            text={'2. Submission fees will be given, if you wanna continue click on “ Continue „ '}
            image={require('src/image/identity_guide/step2.jpg')}
            direction="row"
          />
        </View>
        <View>
          <GuideRow
            text="3. Scan the QR code on Parity Signer with the help of another device"
            image={require('src/image/identity_guide/step3.jpg')}
            direction="row-reverse"
          />
          <GuideRow
            text="4. Scan the QR code shown on your Parity Signer"
            image={require('src/image/identity_guide/step4.jpg')}
            direction="row"
          />
        </View>
        <View>
          <GuideRow
            text="5. Wait for your information to be submitted"
            image={require('src/image/identity_guide/step5.jpg')}
            direction="row-reverse"
          />
          <GuideRow
            text="6. Once your identity has been set you should see a successful message"
            image={require('src/image/identity_guide/step6.jpg')}
            direction="row"
          />
        </View>
      </PagerView>
      <Padder scale={1} />
      <View style={styles.footer}>
        <Button mode="outlined" onPress={onClose}>{`Skip`}</Button>
      </View>
      <Padder scale={2} />
    </Layout>
  );
}

function GuideRow({
  text,
  image,
  direction,
}: {
  text: string;
  image: ImageSourcePropType;
  direction: 'row' | 'row-reverse';
}) {
  return (
    <View style={[styles.row, {flexDirection: direction}]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pager: {
    height: 350,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: standardPadding * 3,
  },
  row: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: standardPadding * 2,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    width: 140,
  },
  image: {
    borderRadius: 130,
    width: 130,
    height: 130,
  },
});
