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

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

export function NotificationSettingsScreen({}: PropTypes) {
  const {topics, toggleTopic, isLoading} = usePushTopics();

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
                  <Switch value={item.selected} onValueChange={(subscribe) => toggleTopic({id: item.id, subscribe})} />
                )}
              />
            ))
          )}
          <Padder scale={1} />
          <Divider />
        </View>
        <View style={styles.infoContainer}>
          <Icon name="information-outline" />
          <Padder scale={0.5} />
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
    paddingHorizontal: 20,
    width: '90%',
  },
});
