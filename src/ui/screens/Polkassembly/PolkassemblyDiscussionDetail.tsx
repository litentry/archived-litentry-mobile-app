import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Icon, Chip, Text, useTheme} from '@ui/library';
import * as dateUtils from 'src/utils/date';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Posts, usePolkassemblyDiscussionDetail} from 'src/api/hooks/usePolkassemblyDiscussionDetail';
import {PolkassemblyDiscussionStackParamList} from '@ui/navigation/navigation';
import {polkassemblyDiscussionDetail} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';

type ScreenProps = {
  route: RouteProp<PolkassemblyDiscussionStackParamList, typeof polkassemblyDiscussionDetail>;
};

function DiscussionDetailHeader({post}: {post: Posts}) {
  return (
    <View style={styles.header}>
      <Text variant="headlineSmall">{post.title ?? ''}</Text>
      <View style={styles.postDetailRow}>
        <Text variant="bodySmall">{post.author?.username ?? ''} </Text>
        <Text variant="bodySmall">posted in </Text>
        <Chip>{post.topic.name}</Chip>
      </View>
      <Text variant="bodySmall"> {dateUtils.fromNow(post.created_at)}</Text>
      <View style={styles.content}>
        <Text>{post.content?.trim() ?? ''}</Text>
      </View>
      <View style={styles.reactionRow}>
        {post.comments.length ? (
          <>
            <View style={globalStyles.rowAlignCenter}>
              <Icon name="message-outline" size={15} />
              <Padder scale={0.3} />
              <Text variant="bodySmall">{post.comments.length} comments</Text>
            </View>
            <Padder scale={1} />
          </>
        ) : null}
        <Text variant="bodySmall">{`👍 ${post.likes.aggregate.count} `}</Text>
        <Text variant="bodySmall">{` 👎 ${post.dislikes.aggregate.count}`}</Text>
      </View>
    </View>
  );
}

export function PolkassemblyDiscussionDetail({route}: ScreenProps) {
  const {colors} = useTheme();
  const id = route.params.id;
  const {data} = usePolkassemblyDiscussionDetail(id);

  if (!data || !data.post) {
    return <LoadingView />;
  }

  const {post, externalURL} = data;

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        ListHeaderComponent={<DiscussionDetailHeader post={post} />}
        data={post.comments}
        keyExtractor={(item) => item.id}
        renderItem={({item: comment}) => (
          <View style={styles.comment}>
            <View style={[styles.commentAuthorIcon, {backgroundColor: colors.secondary}]}>
              <Text variant="titleMedium">{comment.author?.username?.[0]?.toUpperCase()}</Text>
            </View>
            <View style={styles.commentRightSide}>
              <View style={styles.commentHeader}>
                <Text variant="bodySmall">{comment.author?.username ?? ''}</Text>
                <Text variant="bodySmall"> commented </Text>
                <Text variant="bodySmall">{dateUtils.fromNow(comment.created_at)}</Text>
              </View>
              <Padder scale={0.5} />
              <Text>{comment.content.trim()}</Text>
              <Padder scale={0.5} />
              <View style={globalStyles.rowAlignCenter}>
                <Text variant="bodySmall">{`👍 ${comment.likes.aggregate.count} `}</Text>
                <Text variant="bodySmall">{` 👎 ${comment.dislikes.aggregate.count}`}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Icon name="information-outline" size={20} />
            <Text variant="bodySmall">{` To comment, like or subscribe please `}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(externalURL)}>
              <Text variant="bodySmall" style={[styles.textUnderline, {color: colors.primary}]}>
                login
              </Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: standardPadding * 2,
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
    marginTop: standardPadding * 2,
    marginBottom: standardPadding * 2,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
});
