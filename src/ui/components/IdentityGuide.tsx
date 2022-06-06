import React from 'react';
import {Image, StyleSheet, View, ImageProps, Dimensions} from 'react-native';
import {Layout} from '@ui/components/Layout';
import {Text, Button, Subheading, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import Animated, {FadeIn, FadeOut, useSharedValue} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {Padder} from './Padder';
import {Paginator} from '@ui/components/Paginator';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type Props = {
  onSkip: () => void;
};

interface CarouselItem extends Pick<ImageProps, 'source'> {
  text: string;
  direction: 'row' | 'row-reverse';
}

const ITEMS: CarouselItem[][] = [
  [
    {
      text: '1. Fill out information you wanna submit to set your identity',
      source: require('src/image/identity_guide/step1.jpg'),
      direction: 'row-reverse',
    },
    {
      text: '2. Submission fees will be given, if you wanna continue click on “ Continue „ ',
      source: require('src/image/identity_guide/step2.jpg'),
      direction: 'row',
    },
  ],
  [
    {
      text: '3. Scan the QR code on Parity Signer with the help of another device',
      source: require('src/image/identity_guide/step3.jpg'),
      direction: 'row-reverse',
    },
    {
      text: '4. Scan the QR code shown on your Parity Signer',
      source: require('src/image/identity_guide/step4.jpg'),
      direction: 'row',
    },
  ],
  [
    {
      text: '5. Wait for your information to be submitted',
      source: require('src/image/identity_guide/step5.jpg'),
      direction: 'row-reverse',
    },
    {
      text: '6. Once your identity has been set you should see a successful message',
      source: require('src/image/identity_guide/step6.jpg'),
      direction: 'row',
    },
  ],
];

export function IdentityGuide({onSkip}: Props) {
  const {colors} = useTheme();
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const activeIndex = useSharedValue(0);
  const lastItemIndex = ITEMS.length - 1;
  const [isLastItem, setIsLastItem] = React.useState(false);

  return (
    <Layout>
      <Subheading style={globalStyles.textCenter}>{`Identity Guide`}</Subheading>
      <Padder scale={1} />

      <Carousel
        ref={carouselRef}
        height={350}
        width={SCREEN_WIDTH}
        mode={'horizontal-stack'}
        loop={false}
        data={ITEMS}
        modeConfig={{
          stackInterval: 20,
          rotateZDeg: 0,
        }}
        customConfig={() => ({type: 'positive', viewCount: ITEMS.length})}
        renderItem={({index, item}) => (
          <View key={index}>
            {item.map((carouselItem, nestedIndex) => (
              <View key={nestedIndex} style={{backgroundColor: colors.background}}>
                <GuideRow {...carouselItem} />
              </View>
            ))}
          </View>
        )}
        onProgressChange={(_, indexProgress) => {
          const currentIndex = Math.round(indexProgress);
          activeIndex.value = currentIndex;
          if (currentIndex === lastItemIndex) {
            setIsLastItem(true);
          } else if (isLastItem) {
            setIsLastItem(false);
          }
        }}
      />

      {isLastItem ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Button onPress={onSkip} compact>
            Close!
          </Button>
        </Animated.View>
      ) : (
        <Paginator
          items={ITEMS}
          onNextPress={() => {
            carouselRef.current?.next();
          }}
          onSkipPress={onSkip}
          activeIndex={activeIndex}
        />
      )}

      <Padder scale={2} />
    </Layout>
  );
}

function GuideRow({text, source, direction}: CarouselItem) {
  return (
    <View style={[styles.row, {flexDirection: direction}]}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
