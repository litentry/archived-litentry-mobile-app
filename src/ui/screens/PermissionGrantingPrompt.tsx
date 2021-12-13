import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import {Padder} from '@ui/components/Padder';
import SafeView from '@ui/components/SafeView';
import {usePushNotificationsPermissions} from '@hooks/usePushNotificationsPermissions';
import globalStyles, {standardPadding} from '@ui/styles';

export function PermissionGrantingPrompt() {
  const theme = useTheme();

  const {requestPermissions} = usePushNotificationsPermissions();
  // We request permissions on mount, so we can only relay on messaging().hasPermission()
  // result instead of storing a seperate state in persistent storage.
  // this way we remove the component from the stack when the user has granted permissions
  // or declined them.
  useEffect(() => requestPermissions(), [requestPermissions]);
  const [error, setError] = useState<string>();

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
          <Button
            status={'success'}
            onPress={() =>
              requestPermissions(undefined, {
                onError(e) {
                  console.log(e);
                  setError('Permission denied, please turn the notification on in the settings app!');
                },
              })
            }>
            Allow Notifications
          </Button>
          <Padder scale={0.5} />
          <Button appearance={'ghost'} status={'success'}>
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
