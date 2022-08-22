import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Icon, Headline, Caption, Chip, Text, useTheme, Subheading, FlatList} from '@ui/library';
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
      <Headline>{post.title ?? ''}</Headline>
      <View style={styles.postDetailRow}>
        <Caption>{post.author?.username ?? ''} </Caption>
        <Caption>posted in </Caption>
        <Chip>{post.topic.name}</Chip>
      </View>
      <Caption> {dateUtils.fromNow(post.created_at)}</Caption>
      <View style={styles.content}>
        <Text>{post.content?.trim() ?? ''}</Text>
      </View>
      <View style={styles.reactionRow}>
        {post.comments.length ? (
          <>
            <View style={globalStyles.rowAlignCenter}>
              <Icon name="message-outline" size={15} />
              <Padder scale={0.3} />
              <Caption>{post.comments.length} comments</Caption>
            </View>
            <Padder scale={1} />
          </>
        ) : null}
        <Caption>{`👍 ${post.likes.aggregate.count} `}</Caption>
        <Caption>{` 👎 ${post.dislikes.aggregate.count}`}</Caption>
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
            <View style={[styles.commentAuthorIcon, {backgroundColor: colors.accent}]}>
              <Subheading>{comment.author?.username?.[0]?.toUpperCase()}</Subheading>
            </View>
            <View style={styles.commentRightSide}>
              <View style={styles.commentHeader}>
                <Caption>{comment.author?.username ?? ''}</Caption>
                <Caption> commented </Caption>
                <Caption>{dateUtils.fromNow(comment.created_at)}</Caption>
              </View>
              <Padder scale={0.5} />
              <Text>{comment.content.trim()}</Text>
              <Padder scale={0.5} />
              <View style={globalStyles.rowAlignCenter}>
                <Caption>{`👍 ${comment.likes.aggregate.count} `}</Caption>
                <Caption>{` 👎 ${comment.dislikes.aggregate.count}`}</Caption>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Icon name="information-outline" size={20} />
            <Caption>{` To comment, like or subscribe please `}</Caption>
            <TouchableOpacity onPress={() => Linking.openURL(externalURL)}>
              <Caption style={[styles.textUnderline, {color: colors.primary}]}>login</Caption>
            </TouchableOpacity>
          </View>
        }
        // estimatedItemSize={post.comments.length}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: standardPadding * 2,
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
    padding: standardPadding * 2,
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
