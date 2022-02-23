import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {usePushTopics} from '@hooks/usePushTopics';
import {DrawerParamList} from '@ui/navigation/navigation';
import {Text, List, Divider, Icon, Switch} from '@ui/library';
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
      Alert.alert('Enable notifications', "Click on OK to enable notifications on your phone's settings manually", [
        {
          text: 'Cancel',
          onPress: () => {
            unSubscribeToAllTopics().then(() => {
              setSwitchDisabled(true);
            });
          },
          style: 'cancel',
        },
        {text: 'OK', onPress: openAppSetting},
      ]);
    }
    if (permissionAllowed(pushAuthorizationStatus)) {
      setSwitchDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushAuthorizationStatus]);

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
        </View>
        {!permissionAllowed(pushAuthorizationStatus) && (
          <View style={styles.infoContainer}>
            <Icon name="information-outline" />
            <Padder scale={1} />
            <TouchableOpacity activeOpacity={0.5} onPress={openAppSetting}>
              <Text>
                Currently, Your phone notification is disabled. Please, click here to enable notifications on your
                phone's settings
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});
