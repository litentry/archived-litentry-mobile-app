import {NavigationProp, RouteProp} from '@react-navigation/core';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {AccountsStackParamList} from 'src/navigation/navigation';
import {StyleSheet, Headline, View, Button, IconButton, Caption} from 'src/packages/base_components';
import globalStyles, {standardPadding} from 'src/styles';
import {receiveFundScreen} from 'src/navigation/routeKeys';
import {Image, Share} from 'react-native';
import {useTheme} from 'context/ThemeContext';
import Clipboard from '@react-native-community/clipboard';

type Props = {
  navigation: NavigationProp<AccountsStackParamList, typeof receiveFundScreen>;
  route: RouteProp<AccountsStackParamList, typeof receiveFundScreen>;
};

export function ReceiveFundScreen({navigation, route}: Props) {
  const theme = useTheme();
  const {address} = route.params;
  const ref = useRef<Modalize>(null);

  useEffect(() => {
    ref.current?.open();
  }, []);

  return (
    <Modalize ref={ref} adjustToContentHeight onClose={navigation.goBack} closeOnOverlayTap panGestureEnabled={false}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Headline>Receive</Headline>
          <Image source={{uri: qrCode(address)}} style={styles.qrCode} />
          <View style={globalStyles.rowAlignCenter}>
            <Caption style={styles.address}>{address}</Caption>
            <IconButton
              icon="content-copy"
              color={theme.colors.disabled}
              onPress={() => Clipboard.setString(address)}
            />
          </View>
          <Button icon="share-variant" onPress={() => share(address)}>
            Share
          </Button>
        </View>
      </SafeView>
    </Modalize>
  );
}

// share string via react-native
function share(string: string) {
  Share.share({
    message: string,
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: standardPadding * 2,
  },
  address: {
    flex: 1,
    textAlign: 'center',
    marginVertical: standardPadding,
  },
  qrCode: {
    width: 250,
    height: 250,
  },
});

function qrCode(string: string) {
  return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${string}`;
}
