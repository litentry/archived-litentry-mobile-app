import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {usePushTopics, usePermissions, SUBSCRIPTION_ID} from '@atoms/pushNotification';

import {DrawerParamList} from '@ui/navigation/navigation';
import {Text, List, Divider, Switch, Headline, Subheading, Button, Caption} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {PermissionPromptScreen} from '@ui/screens/PermissionPromptScreen';
import {Linking} from 'react-native';

type ScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

type SubscriptionItemProps = {
  subscription: {
    id: SUBSCRIPTION_ID;
    isSubscribed: boolean;
    label: string;
  };
  toggleSubscription: (_: {id: SUBSCRIPTION_ID; subscribe: boolean}) => void;
  disabled: boolean;
};

function SubscriptionItem({subscription, toggleSubscription, disabled}: SubscriptionItemProps) {
  const NotificationSwitch = React.useCallback(
    () => (
      <Switch
        value={subscription.isSubscribed}
        onValueChange={(subscribe) => toggleSubscription({id: subscription.id, subscribe})}
        disabled={disabled}
      />
    ),
    [subscription, toggleSubscription, disabled],
  );

  return <List.Item key={subscription.id} title={subscription.label} right={NotificationSwitch} />;
}

export function NotificationSettingsScreen({}: ScreenProps) {
  const {subscriptions, toggleSubscription} = usePushTopics();
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
          {subscriptions.map((subscription) => (
            <SubscriptionItem
              key={subscription.id}
              subscription={subscription}
              toggleSubscription={toggleSubscription}
              disabled={isPermissionDenied}
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
