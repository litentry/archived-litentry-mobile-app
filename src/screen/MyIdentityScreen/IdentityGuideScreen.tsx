import {NavigationProp} from '@react-navigation/native';
import {Button, Icon, Layout, Text, useTheme, ViewPager} from '@ui-kitten/components';
import ModalTitle from 'presentational/ModalTitle';
import React, {useEffect, useRef} from 'react';
import {Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {AppStackParamList} from 'src/navigation/navigation';
import globalStyles, {standardPadding} from 'src/styles';

export function IdentityGuideScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const theme = useTheme();
  const selectedColor = theme['color-primary-default'];
  const unselectedColor = theme['color-basic-500'];

  return (
    <Modalize
      ref={modalRef}
      threshold={250}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      adjustToContentHeight
      handlePosition="outside"
      onClose={navigation.goBack}
      closeOnOverlayTap
      panGestureEnabled>
      <Layout level="1" style={[globalStyles.paddedContainer]}>
        <ModalTitle title={'Set Identity'} />
        <ViewPager selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
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
        </ViewPager>
        <View style={styles.indicators}>
          <TouchableOpacity
            onPress={() => setSelectedIndex(0)}
            style={[styles.indicator, {backgroundColor: selectedIndex === 0 ? selectedColor : unselectedColor}]}
          />
          <TouchableOpacity
            onPress={() => setSelectedIndex(1)}
            style={[styles.indicator, {backgroundColor: selectedIndex === 1 ? selectedColor : unselectedColor}]}
          />
          <TouchableOpacity
            onPress={() => setSelectedIndex(2)}
            style={[styles.indicator, {backgroundColor: selectedIndex === 2 ? selectedColor : unselectedColor}]}
          />
        </View>
        <View style={styles.footer}>
          <Button
            appearance="ghost"
            status="basic"
            onPress={() => modalRef.current?.close()}
            accessoryRight={(p) => <Icon {...p} name="arrow-forward-outline" />}>
            SKIP
          </Button>
        </View>
      </Layout>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: standardPadding,
    marginBottom: standardPadding * 3,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: standardPadding * 2,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
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
        <Text category="s2" style={rowStyles.text}>
          {text}
        </Text>
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
