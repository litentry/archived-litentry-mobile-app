import React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Icon, Button} from '@ui-kitten/components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'src/navigation/navigation';
import FormLabel from 'presentational/FormLabel';
import Padder from 'presentational/Padder';
import {verifyMnemonicScreen} from 'src/navigation/routeKeys';
import {AccountsContext} from 'context/AccountsContext'


export function MnemonicScreen({navigation}: {navigation: NavigationProp<AccountsStackParamList>}) {
  const [mnemonic, setMnemonic] = React.useState('');
  const {webviewRef, setCallback} = React.useContext(AccountsContext)

  setCallback((data) => {
    setMnemonic(data.payload.mnemonic)
  })

  React.useEffect(() => {
    if(webviewRef.current != null) {
      webviewRef.current.postMessage(JSON.stringify({
        type: 'MNEMONIC_GENERATE'
      }))
    }
  }, [webviewRef])

  // ios
  // RNFS.readFile(`${RNFS.MainBundlePath}/litentry-keyring/index.html`, 'utf8').then((html) => {
  //   setHtml(html);
  // });

  // android
  // RNFS.readFileAssets('index.html', 'utf8').then((html) => {
  //   setHtml(html)
  // })

  // React.useEffect(() => {
  //   if(webviewRef.current != null && html) {

  //     setTimeout(() => {
  //       webviewRef.current.postMessage(JSON.stringify({type: 'MNEMONIC_GENERATE'}))
  //     }, 500)

  //     // setTimeout(() => {
  //     //   webviewRef.current.postMessage(JSON.stringify({
  //     //     type: 'SET_LOCAL_STORAGE',
  //     //     payload: {
  //     //       key: 'account:0xd24bfd0e9491fb1a84c36e0df30e2ddafcd7d27f0abd0d0c3c77b5cc996efa01',
  //     //       value: {
  //     //         "encoded":"kBu2BuSX12ve974g/OXOl3sgLlppomrzdtCIYodgjJcAgAAAAQAAAAgAAAAm8VLg6T9nq9oBkDK6sexH/AL79BA7mdAalSTufvXUsr5mjMim+BnycYr0jaWzs6H4IVEtgPFgY3mGqjWtmD4waczUz2gO2MZ4iwl4etWFVDJy979mRqsGHZicVyaUo30pg7qnDZu/di+k5ADhqlXg+h0fciVIWME1TBq13CKHIU5DfTREJKwdtxMP2m8dNkLPGMq9cOwG8QQPZ2lz",
  //     //         "encoding":{
  //     //            "content":[
  //     //               "pkcs8",
  //     //               "sr25519"
  //     //            ],
  //     //            "type":[
  //     //               "scrypt",
  //     //               "xsalsa20-poly1305"
  //     //            ],
  //     //            "version":"3"
  //     //         },
  //     //         "address":"15kjdVFjx9d7ZHQYwd4E7VTcPhjY1pvmC65xDthEbaUd1KHa",
  //     //         "meta":{
  //     //            "name":"Webview account",
  //     //            "whenCreated":1636031671596
  //     //         }
  //     //      }
  //     //     }
  //     //   }))
  //     // }, 3000)

  //     setTimeout(() => {
  //       webviewRef.current.postMessage(JSON.stringify({type: 'LOAD_ALL'}))
  //     }, 500)


  //   }
  // }, [html, webviewRef])

  // const onMessage = (event: WebViewMessageEvent) => {
  //   const data = JSON.parse(event.nativeEvent.data)
  //   console.log('Msg from webview :::: ', event.nativeEvent.data);

  //   switch(data.type) {
  //     case 'MNEMONIC':
  //       setMnemonic(data.payload.mnemonic)
  //       break
  //   }
  // };

  // const onSubmit = () => {

  //   setTimeout(() => {
  //     webviewRef.current.postMessage(JSON.stringify({
  //       type: 'CREATE_PAIR',
  //       payload: {mnemonic, password: '123456', name: 'Webview account'}
  //     }))
  //   }, 2000)

  //   setTimeout(() => {
  //     webviewRef.current.postMessage(JSON.stringify({
  //       type: 'GET_ALL_ACCOUNTS'
  //     }))
  //   }, 4000)
  // }

  return (
    <SafeView edges={noTopEdges}>
      <View style={globalStyles.paddedContainer}>
        <Input
          label={() => <FormLabel text="Generated mnemonic seed" />}
          style={styles.input}
          value={mnemonic}
          disabled
          multiline
          caption={() => (
            <View style={styles.caption}>
              <Text category="c1" appearance="hint">
                {`Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.`}
              </Text>
            </View>
          )}
        />
        <Padder scale={2} />
        <Button
          status="basic"
          accessoryLeft={(p) => <Icon {...p} name="arrow-circle-right-outline" />}
          onPress={() => {
            navigation.navigate(verifyMnemonicScreen, {mnemonic})
          }}>
          Next
        </Button>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginTop: standardPadding,
  },
  input: {
    fontSize: 16,
    fontFamily: monofontFamily,
  },
});
