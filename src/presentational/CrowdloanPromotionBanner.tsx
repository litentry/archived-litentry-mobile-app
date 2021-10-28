import React from 'react';
import {StyleSheet, TouchableOpacity, View, Linking} from 'react-native';
import {Icon, Text, Button} from '@ui-kitten/components';
import Padder from 'presentational/Padder';

const CROWDLOAN_LINK = 'https://crowdloan.litentry.com/';

export function PromotionBanner() {
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => setVisible(false)}>
        <Icon name="close" pack="ionic" style={{color: 'white', width: 25, height: 25}} />
      </TouchableOpacity>
      <View style={styles.promotionContainer}>
        <View style={{justifyContent: 'center'}}>
          <Icon name="megaphone" pack="ionic" style={{width: 35, height: 35, color: 'white'}} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, {fontSize: 16, fontWeight: 'bold'}]}>
            We, Litentry, are launching a Parachain Crowdloan on Polkadot
          </Text>
          <Padder scale={0.5} />
          <Text style={[styles.text, {fontSize: 14}]}>Contribute your DOT to help build a Web 3 Identity</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          size="small"
          status="control"
          onPress={() => {
            Linking.canOpenURL(CROWDLOAN_LINK).then((supported) => {
              if (supported) {
                Linking.openURL(CROWDLOAN_LINK);
              }
            });
          }}>
          Join our crowdloan
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: '#2dcbd4',
    padding: 15,
    justifyContent: 'space-around',
  },
  promotionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {flex: 2},
  text: {
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {flexDirection: 'row', justifyContent: 'center'},
});
