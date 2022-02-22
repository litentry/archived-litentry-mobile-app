import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {usePushTopics} from '@hooks/usePushTopics';
import {DrawerParamList} from '@ui/navigation/navigation';
import {Text, List, Divider, Icon, Switch} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {
  permissionAllowed,
  usePushAuthorizationStatus,
  usePushNotificationsPermissions,
} from 'src/hooks/usePushNotificationsPermissions';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

export function NotificationSettingsScreen({}: PropTypes) {
  const {topics, toggleTopic, isLoading} = usePushTopics();
  const {isLoading: loading, pushAuthorizationStatus} = usePushAuthorizationStatus();
  const {requestPermissions} = usePushNotificationsPermissions();
  const [error, setError] = React.useState<string>();

  const pushAuthorization = (id: string, subscribe: boolean) => {
    if (loading) return;
    if (!permissionAllowed(pushAuthorizationStatus)) {
      requestPermissions(undefined, {
        onError(e) {
          console.log(e);
          setError('Permission denied, please turn the notification on in the settings app!');
        },
      });
    } else {
      toggleTopic({id, subscribe});
    }
  };

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
                    key={item.id}
                    value={item.selected}
                    onValueChange={(subscribe) => pushAuthorization(item.id, subscribe)}
                  />
                )}
              />
            ))
          )}
          <Padder scale={1} />
          <Divider />
        </View>
        <View style={styles.infoContainer}>
          <Icon name="information-outline" />
          <Padder scale={1} />
          <Text>Don't forget to enable notifications in your phone's settings</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});
