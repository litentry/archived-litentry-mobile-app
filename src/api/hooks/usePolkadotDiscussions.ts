import useApiQuery from 'src/api/hooks/useApiQuery';

export function usePolkadotDiscussions() {
  return useApiQuery('polkadot-discussions', async () => {
    const r = await fetch('https://polkadot.polkassembly.io/v1/graphql', {
      headers: {
        'content-type': 'application/json',
      },
      // body: '{"operationName":"LatestDiscussionPosts","variables":{"limit":20},"query":"query LatestDiscussionPosts($limit: Int! = 20) {\\n  posts(\\n    order_by: {last_update: {last_update: desc}}\\n    limit: $limit\\n    where: {type: {id: {_eq: 1}}}\\n  ) {\\n    ...postFields\\n    __typename\\n  }\\n}\\n\\nfragment postFields on posts {\\n  id\\n  title\\n  author {\\n    ...authorFields\\n    __typename\\n  }\\n  created_at\\n  updated_at\\n  comments_aggregate {\\n    aggregate {\\n      count\\n      __typename\\n    }\\n    __typename\\n  }\\n  type {\\n    name\\n    id\\n    __typename\\n  }\\n  last_update {\\n    last_update\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment authorFields on User {\\n  id\\n  kusama_default_address\\n  polkadot_default_address\\n  username\\n  __typename\\n}\\n"}',
      body: JSON.stringify({
        operationName: 'LatestDiscussionPosts',
        variables: {limit: 20},
        query: `
          query LatestDiscussionPosts($limit: Int! = 20) {
            posts(
              order_by: {last_update: {last_update: desc}}
              limit: $limit
              where: {type: {id: {_eq: 1}}}
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
              last_update
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
    const posts: Posts[] = (await r.json()).data.posts;

    return posts;
  });
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
};

export type User = {
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
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "post_types" */
export type Post_Types = {
  __typename?: 'post_types';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** columns and relationships of "post_last_update" */
export type Post_Last_Update = {
  __typename?: 'post_last_update';
  comment_id?: Maybe<Scalars['uuid']>;
  last_update?: Maybe<Scalars['timestamptz']>;
  post_id?: Maybe<Scalars['Int']>;
};
