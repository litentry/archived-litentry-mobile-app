import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {usePushTopics} from '@hooks/usePushTopics';
import {DrawerParamList} from '@ui/navigation/navigation';
import {Text, List, Divider, Switch, Headline, Subheading, Button, Caption} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {
  hasPermissionsDenied,
  hasPermissionsNotDetermined,
  permissionAllowed,
  usePushAuthorizationStatus,
} from 'src/hooks/usePushNotificationsPermissions';
import {PermissionGrantingPrompt} from './PermissionGrantingPrompt';
import {Linking} from 'react-native';
import {useUpdatePushAuthorizationStatus} from 'src/hooks/useUpdatePushAuthorizationStatus';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

export function NotificationSettingsScreen({}: PropTypes) {
  const {topics, toggleTopic, isLoading, unSubscribeToAllTopics} = usePushTopics();
  const {pushAuthorizationStatus} = usePushAuthorizationStatus();
  useUpdatePushAuthorizationStatus();
  const [switchDisabled, setSwitchDisabled] = useState(false);
  const openAppSetting = async () => {
    await Linking.openSettings();
  };

  useEffect(() => {
    if (hasPermissionsDenied(pushAuthorizationStatus)) {
      unSubscribeToAllTopics().then(() => {
        setSwitchDisabled(true);
      });
    }
    if (permissionAllowed(pushAuthorizationStatus)) {
      setSwitchDisabled(false);
    }
  }, [pushAuthorizationStatus, unSubscribeToAllTopics]);

  if (hasPermissionsNotDetermined(pushAuthorizationStatus)) {
    return <PermissionGrantingPrompt allowSkip={false} />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text>Hi there! To stay informed choose which Push Notifications you'd like to receive.</Text>
        <Padder scale={2} />
        <Divider />
        <Padder scale={1} />
        <View style={globalStyles.flex}>
          {isLoading ? (
            <LoadingView />
          ) : (
            topics.map((item) => (
              <List.Item
                key={item.id}
                title={item.label}
                right={() => (
                  <Switch
                    value={item.selected}
                    onValueChange={(subscribe) => toggleTopic({id: item.id, subscribe})}
                    disabled={switchDisabled}
                  />
                )}
              />
            ))
          )}
          <Padder scale={1} />
          <Divider />
          {!permissionAllowed(pushAuthorizationStatus) && (
            <View style={styles.container}>
              <View style={styles.infoContainer}>
                <View style={[globalStyles.rowContainer, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                  <Headline style={styles.headline}>Turn on notifications?</Headline>
                </View>
                <Subheading>
                  <Caption style={[globalStyles.textCenter]}>
                    To get notifications from Litentry, you'll need to turn them on in your settings
                  </Caption>
                </Subheading>
                <Padder scale={0.5} />
                <Button onPress={openAppSetting} mode="outlined">
                  Open Settings
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 3,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  headline: {
    fontWeight: 'bold',
  },
});
