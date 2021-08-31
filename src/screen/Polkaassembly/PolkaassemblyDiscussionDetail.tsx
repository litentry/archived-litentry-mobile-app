import {RouteProp} from '@react-navigation/native';
import {Text, useTheme} from '@ui-kitten/components';
import moment from 'moment';
import Icon from 'presentational/Icon';
import {Label} from 'presentational/Label';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {usePolkaassemblyDiscussionDetail} from 'src/api/hooks/usePolkaassemblyDiscussionDetail';
import {PolkaassemblyDiscussionStackParamList} from 'src/navigation/navigation';
import globalStyles, {standardPadding} from 'src/styles';

export function PolkaassemblyDiscussionDetail({
  route,
}: {
  route: RouteProp<PolkaassemblyDiscussionStackParamList, 'PolkaassemblyDiscussionDetail'>;
}) {
  const theme = useTheme();
  const id = route.params.id;
  const {data} = usePolkaassemblyDiscussionDetail(id);

  if (!data) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Text category="h6">{data.title ?? ''}</Text>
        <View style={styles.postDetailRow}>
          <Text category="c2">{data.author?.username ?? ''} </Text>
          <Text category="c1">posted in </Text>
          <Label text={data.topic.name} />
          <Text category="c1"> {moment(data.created_at).fromNow()}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>{data.content ?? ''}</Text>
        </View>
        <View style={styles.reactionRow}>
          {data.comments.length ? (
            <>
              <View style={globalStyles.rowAlignCenter}>
                <Icon name="message-circle-outline" style={globalStyles.icon15} fill="#ccc" animation="pulse" />
                <Padder scale={0.3} />
                <Text category="label" appearance="hint">
                  {data.comments.length} comments
                </Text>
              </View>
              <Padder scale={1} />
            </>
          ) : null}
          <Text category="c1" appearance="hint">
            👍 {data.likes.aggregate.count}{' '}
          </Text>
          <Text category="c1" appearance="hint">
            {' '}
            👎 {data.dislikes.aggregate.count}
          </Text>
        </View>
        <View style={styles.commentsContainer}>
          {data.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={[styles.commentAuthorIcon, {backgroundColor: theme['text-basic-color']}]}>
                <Text category="h6" appearance="alternative">
                  {comment.author?.username?.substr(0, 1).toUpperCase()}
                </Text>
              </View>
              <View style={styles.commentRightSide}>
                <View style={globalStyles.rowAlignCenter}>
                  <Text category="c2">{comment.author?.username ?? ''}</Text>
                  <Text category="c1"> commented </Text>
                  <Text category="c2">{moment(comment.created_at).fromNow()}</Text>
                </View>
                <Text category="c1">{comment.content.trim()}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: standardPadding * 2,
  },
  postDetailRow: {
    marginTop: standardPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginTop: standardPadding * 4,
    marginBottom: standardPadding * 2,
  },
  contentText: {
    opacity: 0.7,
  },
  reactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    flexDirection: 'row',
    marginTop: standardPadding,
    marginBottom: standardPadding * 2,
  },
  commentAuthorIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: standardPadding * 2,
    marginRight: standardPadding,
  },

  commentRightSide: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    paddingLeft: standardPadding,
    flex: 1,
  },
  commentsContainer: {
    marginVertical: standardPadding * 3,
  },
});
