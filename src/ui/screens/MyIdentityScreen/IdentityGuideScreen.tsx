import React, {useEffect, useRef} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Layout} from '@ui/components/Layout';
import {Text, Button} from '@ui/library';
import ModalTitle from '@ui/components/ModalTitle';
import {Modalize} from 'react-native-modalize';
import {AppStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import PagerView from 'react-native-pager-view';

export function IdentityGuideScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);

  return (
    <Modalize ref={modalRef} adjustToContentHeight onClose={navigation.goBack} panGestureEnabled={false}>
      <Layout style={globalStyles.paddedContainer}>
        <ModalTitle title={'Set Identity'} />
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
        <View style={styles.footer}>
          <Button
            mode="text"
            uppercase={false}
            icon="skip-next-outline"
            onPress={() => modalRef.current?.close()}>{`Skip`}</Button>
        </View>
      </Layout>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  pager: {
    height: 350,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: standardPadding,
    marginBottom: standardPadding * 3,
  },
});

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
    <View style={[rowStyles.row, {flexDirection: direction}]}>
      <View style={rowStyles.imageContainer}>
        <Image source={image} style={rowStyles.image} />
      </View>
      <View style={rowStyles.textContainer}>
        <Text style={rowStyles.text}>{text}</Text>
      </View>
    </View>
  );
}

const rowStyles = StyleSheet.create({
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
