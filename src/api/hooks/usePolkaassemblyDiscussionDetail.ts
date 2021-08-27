import {NetworkContext} from 'context/NetworkContext';
import gql from 'graphql-tag';
import {print} from 'graphql/language/printer';
import {useContext} from 'react';
import {useQuery} from 'react-query';

export function usePolkaassemblyDiscussionDetail(id: number) {
  const {currentNetwork} = useContext(NetworkContext);

  return useQuery(['polkaassemblyDiscussionDetail', {network: currentNetwork.key, id}], async () => {
    // Only polkadot & kusama are supported
    const network = currentNetwork.key === 'kusama' ? 'kusama' : 'polkadot';
    const endpoint = `https://${network}.polkassembly.io/v1/graphql`;
    const variables = {id};

    const res = await fetch(endpoint, {
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        operationName: 'DiscussionPostAndComments',
        variables,
        query: discussionPostAndCommnetsQuery,
      }),
      method: 'POST',
    });
    const posts: Posts[] = (await res.json()).data.posts;

    return posts[0];
  });
}

const discussionPostAndCommnetsQuery = print(gql`
  query DiscussionPostAndComments($id: Int!) {
    posts(where: {id: {_eq: $id}}) {
      ...discussionPost
      __typename
    }
  }

  fragment discussionPost on posts {
    author {
      ...authorFields
      __typename
    }
    content
    created_at
    id
    updated_at
    comments(order_by: {created_at: asc}) {
      ...commentFields
      __typename
    }
    onchain_link {
      ...onchainLinkDiscussion
      __typename
    }
    title
    topic {
      id
      name
      __typename
    }
    type {
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

  fragment commentFields on comments {
    id
    author {
      ...authorFields
      __typename
    }
    content
    created_at
    updated_at
    __typename
  }

  fragment onchainLinkDiscussion on onchain_links {
    id
    onchain_referendum_id
    onchain_motion_id
    onchain_proposal_id
    onchain_treasury_proposal_id
    __typename
  }
`);

// generate by graphql-code-generator

type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

type Posts = {
  __typename?: 'posts';
  /** Remote relationship field */
  author?: Maybe<User>;
  author_id: Scalars['Int'];
  /** An array relationship */
  comments: Array<Comments>;
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  onchain_link?: Maybe<Onchain_Links>;
  title?: Maybe<Scalars['String']>;
  /** An object relationship */
  topic: Post_Topics;
  /** Define the main suject of the post */
  topic_id: Scalars['Int'];
  /** An object relationship */
  type: Post_Types;
  type_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};

type PostsCommentsArgs = {
  order_by?: Maybe<Array<Comments_Order_By>>;
};

type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  kusama_default_address?: Maybe<Scalars['String']>;
  polkadot_default_address?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

type Comments = {
  __typename?: 'comments';
  /** Remote relationship field */
  author?: Maybe<User>;
  content: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};

type Onchain_Links = {
  __typename?: 'onchain_links';
  id: Scalars['Int'];
  onchain_motion_id?: Maybe<Scalars['Int']>;
  onchain_proposal_id?: Maybe<Scalars['Int']>;
  onchain_referendum_id?: Maybe<Scalars['Int']>;
  onchain_treasury_proposal_id?: Maybe<Scalars['Int']>;
};

type Post_Topics = {
  __typename?: 'post_topics';
  id: Scalars['Int'];
  name: Scalars['String'];
};

type Comments_Order_By = {
  created_at?: Maybe<Order_By>;
};

type Post_Types = {
  __typename?: 'post_types';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** column ordering options */
enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}
