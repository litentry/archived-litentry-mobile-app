import React from 'react';
import {Divider, Icon, Layout, ListItem, Text} from '@ui-kitten/components';
import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StyleSheet, Switch, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import {useDataContext} from 'context/DataContext';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {xor} from 'lodash';
import LoadingView from 'presentational/LoadingView';

type PropTypes = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

export function PushSettingsScreen(props: PropTypes) {
  const {navigation} = props;
  const {topics, toggleTopic, isLoading} = useTopics();

  return (
    <GenericNavigationLayout title="Push Notifications" onBackPressed={() => navigation.goBack()}>
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
                accessoryRight={() => <Switch value={item.selected} onValueChange={() => toggleTopic(item.id)} />}
              />
            ))
          )}
          <Divider />
        </View>
        <ListItem
          accessoryLeft={(p) => <Icon {...p} name={'info-outline'} />}
          title={"Don't forget to enable notifications in your phone setting in the app section"}
        />
      </Layout>
    </GenericNavigationLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 3,
  },
});

const TOPICS = [
  {id: 'REF_BEGIN', label: 'New referendum has begun'},
  {id: 'REF_RESULT', label: 'Results of the referendum'},
  {id: 'COUNCIL_ELECTION', label: 'Election of a new council'},
  {id: 'SECOND_PROPOSAL_REMINDER', label: 'Reminder to second proposal'},
];

function useTopics() {
  const {asyncStorage} = useDataContext();
  const queryClient = useQueryClient();

  const {data, isLoading, isError} = useQuery('selected_push_topics', () =>
    asyncStorage.get<string[]>('selected_push_topics', []),
  );

  const {mutate: toggleTopic} = useMutation(
    (id: string) => {
      if (!data) {
        throw new Error('DATA NOT LOADED YET!');
      }
      return asyncStorage.set('selected_push_topics', JSON.stringify(xor(data, [id])));
    },
    {
      onSettled: () => queryClient.invalidateQueries('selected_push_topics'),

      /**
       * optimistic update
       * more info: https://react-query.tanstack.com/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
       * */
      onMutate: async (id) => {
        await queryClient.cancelQueries('selected_push_topics');
        const previousTopics = queryClient.getQueryData('selected_push_topics');
        queryClient.setQueryData<string[]>('selected_push_topics', (data) => xor(data, [id]));
        return {previousTopics};
      },
      onError: (err, id, context: any) => {
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
