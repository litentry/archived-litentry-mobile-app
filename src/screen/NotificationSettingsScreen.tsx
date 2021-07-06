import React from 'react';
import {Divider, Icon, Layout, ListItem, Text} from '@ui-kitten/components';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StyleSheet, Switch, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import LoadingView from 'presentational/LoadingView';
import messaging from '@react-native-firebase/messaging';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {DrawerParamList} from 'src/navigation/navigation';
import * as AsyncStorage from 'src/service/AsyncStorage';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

export function NotificationSettingsScreen({}: PropTypes) {
  const {topics, toggleTopic, isLoading} = useTopics();

  return (
    <SafeView edges={noTopEdges}>
      <Layout level="1" style={styles.container}>
        <Text>Hi there! To stay informed choose which Push Notifications you'd like to receive.</Text>
        <Padder scale={2} />
        <Divider />
        <Padder scale={1} />
        <View style={globalStyles.flex}>
          {isLoading ? (
            <LoadingView />
          ) : (
            topics.map((item) => (
              <ListItem
                key={item.id}
                title={item.label}
                accessoryRight={() => (
                  <Switch value={item.selected} onValueChange={(subscribe) => toggleTopic({id: item.id, subscribe})} />
                )}
              />
            ))
          )}
          <Padder scale={1} />
          <Divider />
        </View>
        <ListItem
          accessoryLeft={(p) => <Icon {...p} name={'info-outline'} />}
          title={"Don't forget to enable notifications in your phone's settings"}
        />
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 3,
  },
});


const TOPICS = [
  {id: 'treasury.Proposed', label: 'New Treasury Proposal'},
  {id: 'tips.NewTip', label: 'Tip Suggestion'},
];

function useTopics() {
  const queryClient = useQueryClient();

  const {data, isLoading, isError} = useQuery('selected_push_topics', () =>
    AsyncStorage.getItem<string[]>('selected_push_topics', []),
  );

  const {mutate: toggleTopic} = useMutation(
    async ({id, subscribe}: {id: string; subscribe: boolean}) => {
      if (!data) {
        throw new Error('DATA NOT LOADED YET!');
      }
      const updatedData = subscribe ? [...data, id] : data.filter((t) => t !== id);
      await AsyncStorage.setItem('selected_push_topics', updatedData);
      if (subscribe) {
        await messaging().subscribeToTopic(id);
      } else {
        await messaging().unsubscribeFromTopic(id);
      }
    },
    {
      onSettled: () => queryClient.invalidateQueries('selected_push_topics'),

      /**
       * optimistic update
       * more info: https://react-query.tanstack.com/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
       * */
      onMutate: async ({id, subscribe}) => {
        await queryClient.cancelQueries('selected_push_topics');
        const previousTopics = queryClient.getQueryData('selected_push_topics');
        queryClient.setQueryData<string[]>('selected_push_topics', (data) => {
          if (!data) {
            return [];
          }
          return subscribe ? [...data, id] : data.filter((t) => t !== id);
        });
        return {previousTopics};
      },
      onError: (err, vars, context: any) => {
        console.error(err);
        queryClient.setQueryData('selected_push_topics', context.previousTopics);
      },
    },
  );

  return {
    topics: TOPICS.map((t) => ({...t, selected: !!data?.includes(t.id)})),
    toggleTopic,
    isError,
    isLoading,
  };
}
