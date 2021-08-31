import {RouteProp} from '@react-navigation/native';
import {Text, useTheme} from '@ui-kitten/components';
import moment from 'moment';
import Icon from 'presentational/Icon';
import {Label} from 'presentational/Label';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {Linking, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
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

  if (!data || !data.post) {
    return <LoadingView />;
  }

  const {post, externalURL} = data;

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={styles.container}>
        <Text category="h6">{post.title ?? ''}</Text>
        <View style={styles.postDetailRow}>
          <Text category="c2">{post.author?.username ?? ''} </Text>
          <Text category="c1">posted in </Text>
          <Label text={post.topic.name} />
          <Text category="c1"> {moment(post.created_at).fromNow()}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>{post.content ?? ''}</Text>
        </View>
        <View style={styles.reactionRow}>
          {post.comments.length ? (
            <>
              <View style={globalStyles.rowAlignCenter}>
                <Icon name="message-circle-outline" style={globalStyles.icon15} fill="#ccc" animation="pulse" />
                <Padder scale={0.3} />
                <Text category="label" appearance="hint">
                  {post.comments.length} comments
                </Text>
              </View>
              <Padder scale={1} />
            </>
          ) : null}
          <Text category="c1" appearance="hint">
            👍 {post.likes.aggregate.count}{' '}
          </Text>
          <Text category="c1" appearance="hint">
            {' '}
            👎 {post.dislikes.aggregate.count}
          </Text>
        </View>
        <View style={styles.commentsContainer}>
          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={[styles.commentAuthorIcon, {backgroundColor: theme['text-basic-color']}]}>
                <Text category="h6" appearance="alternative">
                  {comment.author?.username?.substr(0, 1).toUpperCase()}
                </Text>
              </View>
              <View style={styles.commentRightSide}>
                <View style={styles.commentHeader}>
                  <Text category="c2" numberOfLines={1} style={styles.commentAuthor}>
                    {comment.author?.username ?? ''}
                  </Text>
                  <Text category="c1"> commented </Text>
                  <Text category="c2">{moment(comment.created_at).fromNow()}</Text>
                </View>
                <Padder scale={0.5} />
                <Text category="c1">{comment.content.trim()}</Text>
                <Padder scale={0.5} />
                <View style={globalStyles.rowAlignCenter}>
                  <Text category="c1" appearance="hint">
                    👍 {comment.likes.aggregate.count}{' '}
                  </Text>
                  <Text category="c1" appearance="hint">
                    {' '}
                    👎 {comment.dislikes.aggregate.count}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={globalStyles.rowAlignCenter}>
          <Icon style={globalStyles.icon15} name="info-outline" fill={theme['text-hint-color']} />
          <Text appearance="hint"> To comment, like or subscribe please </Text>
          <TouchableOpacity onPress={() => Linking.openURL(externalURL)}>
            <Text appearance="hint" category="s1">
              login
            </Text>
          </TouchableOpacity>
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
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  commentAuthor: {
    maxWidth: '50%',
  },
});
