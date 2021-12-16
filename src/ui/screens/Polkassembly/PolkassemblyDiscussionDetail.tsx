import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Text, useTheme} from '@ui-kitten/components';
import dayjs from 'dayjs';
import Icon from '@ui/components/Icon';
import {Label} from '@ui/components/Label';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {usePolkassemblyDiscussionDetail} from 'src/api/hooks/usePolkassemblyDiscussionDetail';
import {PolkassemblyDiscussionStackParamList} from '@ui/navigation/navigation';
import {polkassemblyDiscussionDetail} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';

export function PolkassemblyDiscussionDetail({
  route,
}: {
  route: RouteProp<PolkassemblyDiscussionStackParamList, typeof polkassemblyDiscussionDetail>;
}) {
  const theme = useTheme();
  const id = route.params.id;
  const {data} = usePolkassemblyDiscussionDetail(id);

  if (!data || !data.post) {
    return <LoadingView />;
  }

  const {post, externalURL} = data;

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text category="h6">{post.title ?? ''}</Text>
            <View style={styles.postDetailRow}>
              <Text category="c2">{post.author?.username ?? ''} </Text>
              <Text category="c1">posted in </Text>
              <Label text={post.topic.name} />
              <Text category="c1"> {dayjs(post.created_at).fromNow()}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText} category="c1">
                {post.content?.trim() ?? ''}
              </Text>
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
                {`👍 ${post.likes.aggregate.count} `}
              </Text>
              <Text category="c1" appearance="hint">
                {` 👎 ${post.dislikes.aggregate.count}`}
              </Text>
            </View>
          </View>
        )}
        data={post.comments}
        keyExtractor={(item) => item.id}
        renderItem={({item: comment}) => (
          <View style={styles.comment}>
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
                <Text category="c2">{dayjs(comment.created_at).fromNow()}</Text>
              </View>
              <Padder scale={0.5} />
              <Text category="c1">{comment.content.trim()}</Text>
              <Padder scale={0.5} />
              <View style={globalStyles.rowAlignCenter}>
                <Text category="c1" appearance="hint">
                  {`👍 ${comment.likes.aggregate.count} `}
                </Text>
                <Text category="c1" appearance="hint">
                  {` 👎 ${comment.dislikes.aggregate.count}`}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Icon style={globalStyles.icon15} name="info-outline" fill={theme['text-hint-color']} />
            <Text appearance="hint" category="c1">
              {` To comment, like or subscribe please `}
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(externalURL)}>
              <Text status="primary" category="c2" style={styles.textUnderline}>
                login
              </Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: standardPadding * 3,
  },
  contentContainer: {
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
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  commentAuthor: {
    maxWidth: '50%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
});
