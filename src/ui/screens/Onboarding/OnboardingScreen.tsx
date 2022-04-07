import React, {useRef} from 'react';
import {View, Image, ImageProps, StyleSheet, Dimensions} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {useTheme, Headline, Subheading} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles from '@ui/styles';
import {Paginator} from './Paginator';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

interface CarouselItem extends Pick<ImageProps, 'source'> {
  title: string;
  description: string;
}

const ITEMS: CarouselItem[] = [
  {
    title: 'Welcome!',
    description: 'Let me give you a quick tour and some tips to have the best start on our app',
    source: require('../../../image/onboarding_1.png'),
  },
  {
    title: 'Pick a network',
    description: 'Tap on that button to switch from Polkadot to Kusama and vice-versa',
    source: require('../../../image/onboarding_2.png'),
  },
  {
    title: 'Create an account',
    description: 'To have full access to all the features, create or add an existing account',
    source: require('../../../image/onboarding_3.png'),
  },
  {
    title: 'Transfer fund',
    description: 'You can easily receive and send funds with our native wallet',
    source: require('../../../image/onboarding_4.png'),
  },
  {
    title: 'Let’s go !',
    description: 'You can now vote, elect, make proposals, run for election... and so much more !',
    source: require('../../../image/onboarding_5.png'),
  },
];

export function OnboardingScreen() {
  const carouselRef = useRef<ICarouselInstance>(null);
  const activeIndex = useSharedValue(0);

  return (
    <View style={globalStyles.flex}>
      <Carousel
        ref={carouselRef}
        height={SCREEN_HEIGHT * 0.95}
        width={SCREEN_WIDTH}
        mode={'horizontal-stack'}
        loop={false}
        data={ITEMS}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 20,
          rotateZDeg: 0,
        }}
        customConfig={() => ({type: 'positive', viewCount: ITEMS.length})}
        renderItem={({index, item}) => <CarouselItem key={index} item={item} />}
        onProgressChange={(_, indexProgress) => {
          activeIndex.value = Math.round(indexProgress);
        }}
      />
      <Paginator
        items={ITEMS}
        onNextPress={() => carouselRef.current?.next()}
        onSkipPress={() => console.log('skipping')}
        activeIndex={activeIndex}
      />
    </View>
  );
}

function CarouselItem({item}: {item: CarouselItem}) {
  const {colors} = useTheme();

  return (
    <View style={globalStyles.fillCenter}>
      <View style={[itemStyles.contentContainer, {backgroundColor: colors.background}]}>
        <Image style={itemStyles.image} source={item.source} />
        <View style={globalStyles.paddedContainer}>
          <Headline style={[globalStyles.textCenter, {color: colors.primary}]}>{item.title}</Headline>
          <Padder scale={1} />
          <Subheading style={globalStyles.textCenter}>{item.description}</Subheading>
          <Padder scale={1} />
        </View>
      </View>
    </View>
  );
}

const itemStyles = StyleSheet.create({
  contentContainer: {
    width: '85%',
    height: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    ...globalStyles.shadow,
  },
  image: {
    width: '90%',
    height: '55%',
    resizeMode: 'contain',
  },
});
