import {useInfiniteQuery} from 'react-query';

const endpoint = 'https://polkadot.polkassembly.io/v1/graphql';

const orderByMap = {
  lastCommented: {last_update: {last_update: 'desc'}},
  dateAddedNewest: {id: 'desc'},
  dateAddedOldest: {id: 'asc'},
};

export const topicIdMap = {
  Democracy: 1,
  Council: 2,
  'Tech Committee': 3,
  Treasury: 4,
  General: 5,
};

export type OrderByType = keyof typeof orderByMap;

export function usePolkadotDiscussions({orderBy = 'lastCommented', topicId}: {orderBy: OrderByType; topicId?: number}) {
  return useInfiniteQuery(
    ['polkadot-discussions', {orderBy, topicId}],
    async ({pageParam = 0}: {pageParam?: number}) => {
      const variables = {
        limit: 20,
        offset: pageParam * 20,
        orderBy: orderByMap[orderBy],
        topicId: topicId ? {_eq: topicId} : null,
      };

      const response = await fetch(endpoint, {
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          operationName: 'LatestDiscussionPosts',
          variables,
          query: `
          query LatestDiscussionPosts($limit: Int!, $orderBy: [posts_order_by!], $topicId: Int_comparison_exp, $offset: Int!) {
            posts(
              order_by: $orderBy
              limit: $limit
              where: {topic_id: $topicId, type: {id: {_eq: 1}}}
              offset: $offset
            ) {
              ...postFields
              __typename
            }
          }
          
          fragment postFields on posts {
            id
            title
            author {
              ...authorFields
              __typename
            }
            created_at
            updated_at
            content
            comments_aggregate {
              aggregate {
                count
                __typename
              }
              __typename
            }
            type {
              name
              id
              __typename
            }
            last_update {
              comment_id
              last_update
              __typename
            }
            topic {
              id
              name
              __typename
            }
            __typename
          }
          
          fragment authorFields on User {
            id
            kusama_default_address
            polkadot_default_address
            username
            __typename
          }
      `,
        }),
        method: 'POST',
      });
      const posts: Posts[] = (await response.json()).data.posts;

      return posts;
    },
    {
      getNextPageParam: (lastPage, pages) => (lastPage.length === 20 ? pages.length : undefined),
    },
  );
}

// generated via: https://www.graphql-code-generator.com/

export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'posts';
  /** Remote relationship field */
  author?: Maybe<User>;
  author_id: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An aggregated array relationship */
  comments_aggregate: Comments_Aggregate;
  title?: Maybe<Scalars['String']>;
  /** An object relationship */
  type: Post_Types;
  /** An object relationship */
  last_update?: Maybe<Post_Last_Update>;
  /** Define the main suject of the post */
  topic_id: Scalars['Int'];
  type_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
  topic: Topic;
};

type Topic = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  kusama_default_address?: Maybe<Scalars['String']>;
  polkadot_default_address?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  web3signup?: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "comments" */
type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
};

/** aggregate fields of "comments" */
type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "post_types" */
type Post_Types = {
  __typename?: 'post_types';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** columns and relationships of "post_last_update" */
type Post_Last_Update = {
  __typename?: 'post_last_update';
  comment_id?: Maybe<Scalars['uuid']>;
  last_update?: Maybe<Scalars['timestamptz']>;
  post_id?: Maybe<Scalars['Int']>;
};
