import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {usePushTopics, usePermissions} from '@atoms/pushNotification';

import {DrawerParamList} from '@ui/navigation/navigation';
import {Text, List, Divider, Switch, Headline, Subheading, Button, Caption} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {PermissionPromptScreen} from '@ui/screens/PermissionPromptScreen';
import {Linking} from 'react-native';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

export function NotificationSettingsScreen({}: PropTypes) {
  const {topics, toggleTopic} = usePushTopics();
  const {isPermissionNotDetermined, isPermissionDenied} = usePermissions();

  const openAppSetting = async () => {
    await Linking.openSettings();
  };

  if (isPermissionNotDetermined) {
    return <PermissionPromptScreen allowSkip={false} />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text>Hi there! To stay informed choose which Push Notifications you'd like to receive.</Text>
        <Padder scale={2} />
        <Divider />
        <Padder scale={1} />
        <View style={globalStyles.flex}>
          {topics.map((item) => (
            <List.Item
              key={item.id}
              title={item.label}
              right={() => (
                <Switch
                  value={item.isSubscribed}
                  onValueChange={(subscribe) => toggleTopic({id: item.id, subscribe})}
                  disabled={isPermissionDenied}
                />
              )}
            />
          ))}
          <Padder scale={1} />
          <Divider />
          {isPermissionDenied && (
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
