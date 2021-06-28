import React, {useState} from 'react';
import {Button, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import SafeView from 'presentational/SafeView';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import {NavigationProp, useNavigationState} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

export function PermissionGrantingPrompt({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const routeNames = useNavigationState((state) => state.routeNames);
  const theme = useTheme();

  const [error, setError] = useState<string>();

  const onSkip = () => navigation.navigate(routeNames.includes('App') ? 'App' : 'ApiNavigator');
  const onRequestPermissions = () =>
    messaging()
      .requestPermission()
      .then((authorizationStatus) => {
        if (
          authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          onSkip();
        } else {
          setError('Permission denied, please turn the notification on in the settings app!');
        }
      })
      .catch((e) => setError(e.message));

  return (
    <Layout style={globalStyles.flex}>
      <SafeView>
        <View style={styles.container}>
          <Icon style={styles.icon} name={'bell-outline'} fill={theme['color-success-500']} />
          <Padder scale={1} />
          <Text category={'h4'}>Turn on Notifications</Text>
          <Padder scale={1} />
          <Text category={'p1'} style={globalStyles.textCenter}>
            Enable notifications to make sure you don't miss out on important events
          </Text>
          {error ? (
            <>
              <Padder scale={1} />
              <Text status={'danger'} style={globalStyles.textCenter}>
                {error}
              </Text>
            </>
          ) : null}
          <Padder scale={2} />
          <Button status={'success'} onPress={onRequestPermissions}>
            Allow Notifications
          </Button>
          <Padder scale={0.5} />
          <Button appearance={'ghost'} status={'success'} onPress={onSkip}>
            Skip
          </Button>
        </View>
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  icon: {width: 180, height: 180},
  container: {alignItems: 'center', justifyContent: 'center', flex: 1, padding: standardPadding * 4},
});
