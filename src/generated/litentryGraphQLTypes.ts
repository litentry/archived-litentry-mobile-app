import {gql} from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: any;
};

export type Bep20Account = {
  __typename?: 'Bep20Account';
  address: Scalars['String'];
  balance: Scalars['BigInt'];
  firstTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  lastTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  totalTransfers: Scalars['BigInt'];
  transfersFrom?: Maybe<Array<Bep20Transfer>>;
  transfersTo?: Maybe<Array<Bep20Transfer>>;
};

export type Bep20AccountTransfersFromArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bep20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bep20Transfer_Filter>;
};

export type Bep20AccountTransfersToArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bep20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bep20Transfer_Filter>;
};

export type Bep20Account_Filter = {
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInBlockNumber?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInTimestamp?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutBlockNumber?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutTimestamp?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastTransferInBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Bep20Account_OrderBy {
  Address = 'address',
  Balance = 'balance',
  FirstTransferInBlockNumber = 'firstTransferInBlockNumber',
  FirstTransferInTimestamp = 'firstTransferInTimestamp',
  FirstTransferOutBlockNumber = 'firstTransferOutBlockNumber',
  FirstTransferOutTimestamp = 'firstTransferOutTimestamp',
  Id = 'id',
  LastTransferInBlockNumber = 'lastTransferInBlockNumber',
  LastTransferInTimestamp = 'lastTransferInTimestamp',
  LastTransferOutBlockNumber = 'lastTransferOutBlockNumber',
  LastTransferOutTimestamp = 'lastTransferOutTimestamp',
  TotalTransfers = 'totalTransfers',
  TransfersFrom = 'transfersFrom',
  TransfersTo = 'transfersTo',
}

export type Bep20Transfer = {
  __typename?: 'Bep20Transfer';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  from: Bep20Account;
  fromAccountBalanceAtBlock: Scalars['BigInt'];
  gas: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  to: Bep20Account;
  toAccountBalanceAtBlock: Scalars['BigInt'];
};

export type Bep20Transfer_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['String']>;
  fromAccountBalanceAtBlock?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fromAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  gas?: InputMaybe<Scalars['BigInt']>;
  gas_gt?: InputMaybe<Scalars['BigInt']>;
  gas_gte?: InputMaybe<Scalars['BigInt']>;
  gas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gas_lt?: InputMaybe<Scalars['BigInt']>;
  gas_lte?: InputMaybe<Scalars['BigInt']>;
  gas_not?: InputMaybe<Scalars['BigInt']>;
  gas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  toAccountBalanceAtBlock?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  toAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Bep20Transfer_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  FromAccountBalanceAtBlock = 'fromAccountBalanceAtBlock',
  Gas = 'gas',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  ToAccountBalanceAtBlock = 'toAccountBalanceAtBlock',
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Erc20Account = {
  __typename?: 'Erc20Account';
  address: Scalars['String'];
  balance: Scalars['BigInt'];
  firstTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  lastTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  totalTransfers: Scalars['BigInt'];
  transfersFrom?: Maybe<Array<Erc20Transfer>>;
  transfersTo?: Maybe<Array<Erc20Transfer>>;
};

export type Erc20AccountTransfersFromArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type Erc20AccountTransfersToArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type Erc20Account_Filter = {
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInBlockNumber?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInTimestamp?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferInTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutBlockNumber?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutTimestamp?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastTransferInBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferInTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutBlockNumber?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Erc20Account_OrderBy {
  Address = 'address',
  Balance = 'balance',
  FirstTransferInBlockNumber = 'firstTransferInBlockNumber',
  FirstTransferInTimestamp = 'firstTransferInTimestamp',
  FirstTransferOutBlockNumber = 'firstTransferOutBlockNumber',
  FirstTransferOutTimestamp = 'firstTransferOutTimestamp',
  Id = 'id',
  LastTransferInBlockNumber = 'lastTransferInBlockNumber',
  LastTransferInTimestamp = 'lastTransferInTimestamp',
  LastTransferOutBlockNumber = 'lastTransferOutBlockNumber',
  LastTransferOutTimestamp = 'lastTransferOutTimestamp',
  TotalTransfers = 'totalTransfers',
  TransfersFrom = 'transfersFrom',
  TransfersTo = 'transfersTo',
}

export type Erc20Transfer = {
  __typename?: 'Erc20Transfer';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  from: Erc20Account;
  fromAccountBalanceAtBlock: Scalars['BigInt'];
  gas: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  to: Erc20Account;
  toAccountBalanceAtBlock: Scalars['BigInt'];
};

export type Erc20Transfer_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['String']>;
  fromAccountBalanceAtBlock?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fromAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  gas?: InputMaybe<Scalars['BigInt']>;
  gas_gt?: InputMaybe<Scalars['BigInt']>;
  gas_gte?: InputMaybe<Scalars['BigInt']>;
  gas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gas_lt?: InputMaybe<Scalars['BigInt']>;
  gas_lte?: InputMaybe<Scalars['BigInt']>;
  gas_not?: InputMaybe<Scalars['BigInt']>;
  gas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  toAccountBalanceAtBlock?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  toAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Erc20Transfer_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  From = 'from',
  FromAccountBalanceAtBlock = 'fromAccountBalanceAtBlock',
  Gas = 'gas',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  ToAccountBalanceAtBlock = 'toAccountBalanceAtBlock',
}

export type Erc1155Token = {
  __typename?: 'Erc1155Token';
  contractAddress: Scalars['String'];
  id: Scalars['ID'];
  ownerAddress: Scalars['String'];
  quantity: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
};

export type Erc1155Token_Filter = {
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  ownerAddress?: InputMaybe<Scalars['String']>;
  ownerAddress_contains?: InputMaybe<Scalars['String']>;
  ownerAddress_ends_with?: InputMaybe<Scalars['String']>;
  ownerAddress_gt?: InputMaybe<Scalars['String']>;
  ownerAddress_gte?: InputMaybe<Scalars['String']>;
  ownerAddress_in?: InputMaybe<Array<Scalars['String']>>;
  ownerAddress_lt?: InputMaybe<Scalars['String']>;
  ownerAddress_lte?: InputMaybe<Scalars['String']>;
  ownerAddress_not?: InputMaybe<Scalars['String']>;
  ownerAddress_not_contains?: InputMaybe<Scalars['String']>;
  ownerAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  ownerAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  ownerAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  ownerAddress_starts_with?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['BigInt']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity_lt?: InputMaybe<Scalars['BigInt']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']>;
  quantity_not?: InputMaybe<Scalars['BigInt']>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Erc1155Token_OrderBy {
  ContractAddress = 'contractAddress',
  Id = 'id',
  OwnerAddress = 'ownerAddress',
  Quantity = 'quantity',
  TokenId = 'tokenId',
}

export type IpfsExample = {
  __typename?: 'IpfsExample';
  anotherProperty?: Maybe<Scalars['String']>;
  property?: Maybe<Scalars['Boolean']>;
  required: Scalars['String'];
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type ProxyAccount = {
  __typename?: 'ProxyAccount';
  address: Scalars['String'];
  display: Scalars['String'];
  registration: ProxyDeriveAccountRegistration;
};

export type ProxyAccountInfo = {
  __typename?: 'ProxyAccountInfo';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyBalance = {
  __typename?: 'ProxyBalance';
  consumers: Scalars['Int'];
  data: ProxyBalanceData;
  nonce: Scalars['Int'];
  providers: Scalars['Int'];
  sufficients: Scalars['Int'];
};

export type ProxyBalanceData = {
  __typename?: 'ProxyBalanceData';
  feeFrozen: Scalars['Float'];
  free: Scalars['Float'];
  miscFrozen: Scalars['Float'];
  reserved: Scalars['Float'];
};

export type ProxyBeneficiary = {
  __typename?: 'ProxyBeneficiary';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyBountiesSummary = {
  __typename?: 'ProxyBountiesSummary';
  activeBounties: Scalars['String'];
  bountyCount: Scalars['String'];
  formattedTotalValue: Scalars['String'];
  pastBounties: Scalars['String'];
  progressPercent: Scalars['Int'];
  timeLeft: Array<Scalars['String']>;
  totalValue: Scalars['String'];
};

export type ProxyBounty = {
  __typename?: 'ProxyBounty';
  bond: Scalars['String'];
  bountyStatus?: Maybe<ProxyBountyStatus>;
  curatorDeposit: Scalars['String'];
  description: Scalars['String'];
  fee: Scalars['String'];
  formattedBond: Scalars['String'];
  formattedCuratorDeposit: Scalars['String'];
  formattedFee: Scalars['String'];
  formattedValue: Scalars['String'];
  index: Scalars['String'];
  proposer: ProxyProposer;
  value: Scalars['String'];
};

export type ProxyBountyStatus = {
  __typename?: 'ProxyBountyStatus';
  beneficiary?: Maybe<ProxyBeneficiary>;
  curator?: Maybe<ProxyCurator>;
  status?: Maybe<Scalars['String']>;
  unlockAt?: Maybe<Scalars['String']>;
  unlockAtTime?: Maybe<Array<Scalars['String']>>;
  updateDue?: Maybe<Scalars['String']>;
  updateDueTime?: Maybe<Array<Scalars['String']>>;
};

export type ProxyChainInfo = {
  __typename?: 'ProxyChainInfo';
  chain: Scalars['String'];
  nodeName: Scalars['String'];
  nodeVersion: Scalars['String'];
};

export type ProxyCollectiveProposal = {
  __typename?: 'ProxyCollectiveProposal';
  callIndex: Scalars['String'];
  hash: Scalars['String'];
  votes: ProxyProposalVotes;
};

export type ProxyContribution = {
  __typename?: 'ProxyContribution';
  contribution: ProxyCrowdloanContribution;
  paraId: Scalars['String'];
};

export type ProxyConviction = {
  __typename?: 'ProxyConviction';
  text: Scalars['String'];
  value: Scalars['Int'];
};

export type ProxyCouncil = {
  __typename?: 'ProxyCouncil';
  candidates: Array<ProxyCouncilCandidate>;
  desiredRunnersUp: Scalars['Int'];
  desiredSeats: Scalars['Int'];
  members: Array<ProxyCouncilMember>;
  primeMember?: Maybe<ProxyCouncilMember>;
  runnersUp: Array<ProxyCouncilMember>;
  termProgress: ProxyTermProgress;
  totalCandidates: Scalars['Int'];
  totalMembers: Scalars['Int'];
  totalRunnersUp: Scalars['Int'];
};

export type ProxyCouncilCandidate = {
  __typename?: 'ProxyCouncilCandidate';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyCouncilMember = {
  __typename?: 'ProxyCouncilMember';
  account: ProxyAccount;
  address: Scalars['String'];
  backing?: Maybe<Scalars['String']>;
  voters: Array<Scalars['String']>;
};

export type ProxyCouncilMotion = {
  __typename?: 'ProxyCouncilMotion';
  hash: Scalars['String'];
  proposal: ProxyMotionProposal;
  votes?: Maybe<ProxyMotionVotes>;
};

export type ProxyCrowdloan = {
  __typename?: 'ProxyCrowdloan';
  cap: Scalars['String'];
  contribution: ProxyContribution;
  depositor: ProxyDepositor;
  ending: Array<Scalars['String']>;
  firstPeriod: Scalars['String'];
  formattedCap: Scalars['String'];
  formattedRaised: Scalars['String'];
  lastPeriod: Scalars['String'];
  paraId: Scalars['String'];
  raised: Scalars['String'];
  status: Scalars['String'];
};

export type ProxyCrowdloanContribution = {
  __typename?: 'ProxyCrowdloanContribution';
  contributorsCount: Scalars['String'];
  paraId: Scalars['String'];
};

export type ProxyCrowdloanSummary = {
  __typename?: 'ProxyCrowdloanSummary';
  activeCap: Scalars['String'];
  activeProgress: Scalars['Float'];
  activeRaised: Scalars['String'];
  formattedActiveCap: Scalars['String'];
  formattedActiveRaised: Scalars['String'];
  formattedTotalCap: Scalars['String'];
  formattedTotalRaised: Scalars['String'];
  totalCap: Scalars['String'];
  totalFunds: Scalars['Int'];
  totalProgress: Scalars['Float'];
  totalRaised: Scalars['String'];
};

export type ProxyCurator = {
  __typename?: 'ProxyCurator';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyDemocracySummary = {
  __typename?: 'ProxyDemocracySummary';
  activeProposals: Scalars['Int'];
  activeReferendums: Scalars['Int'];
  launchPeriodInfo?: Maybe<ProxyLaunchPeriodInfo>;
  proposals: Scalars['String'];
  referendums: Scalars['String'];
};

export type ProxyDepositor = {
  __typename?: 'ProxyDepositor';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyDeriveAccountRegistration = {
  __typename?: 'ProxyDeriveAccountRegistration';
  display?: Maybe<Scalars['String']>;
  displayParent?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  judgements?: Maybe<Array<Maybe<ProxyRegistrationJudgement>>>;
  legal?: Maybe<Scalars['String']>;
  pgp?: Maybe<Scalars['String']>;
  riot?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type ProxyEvent = {
  __typename?: 'ProxyEvent';
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ProxyFinder = {
  __typename?: 'ProxyFinder';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyIdentityJudgement = {
  __typename?: 'ProxyIdentityJudgement';
  isErroneous?: Maybe<Scalars['Boolean']>;
  isFeePaid?: Maybe<Scalars['Boolean']>;
  isKnownGood?: Maybe<Scalars['Boolean']>;
  isLowQuality?: Maybe<Scalars['Boolean']>;
  isOutOfDate?: Maybe<Scalars['Boolean']>;
  isReasonable?: Maybe<Scalars['Boolean']>;
  isUnknown?: Maybe<Scalars['Boolean']>;
};

export type ProxyLaunchPeriodInfo = {
  __typename?: 'ProxyLaunchPeriodInfo';
  progressPercent: Scalars['Int'];
  timeLeft: Scalars['String'];
  timeLeftParts: Array<Scalars['String']>;
};

export type ProxyLease = {
  __typename?: 'ProxyLease';
  blockTime?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
};

export type ProxyLeasePeriod = {
  __typename?: 'ProxyLeasePeriod';
  currentLease: Scalars['String'];
  progressPercent: Scalars['Int'];
  remainder: Scalars['String'];
  totalPeriod: Scalars['String'];
};

export type ProxyModuleElection = {
  __typename?: 'ProxyModuleElection';
  hasElections: Scalars['Boolean'];
  module?: Maybe<Scalars['String']>;
};

export type ProxyMotionProposal = {
  __typename?: 'ProxyMotionProposal';
  args: Array<ProxyProposalArg>;
  hash: Scalars['String'];
  method: Scalars['String'];
  section: Scalars['String'];
};

export type ProxyMotionVotes = {
  __typename?: 'ProxyMotionVotes';
  ayes: Array<Scalars['String']>;
  end: Scalars['String'];
  index: Scalars['Int'];
  nays: Array<Scalars['String']>;
  threshold: Scalars['Int'];
};

export type ProxyPalletProposal = {
  __typename?: 'ProxyPalletProposal';
  beneficiary: Scalars['String'];
  bond: Scalars['String'];
  proposer: Scalars['String'];
  value: Scalars['String'];
};

export type ProxyParachain = {
  __typename?: 'ProxyParachain';
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastBackedBlock: Scalars['String'];
  lastIncludedBlock: Scalars['String'];
  lease?: Maybe<ProxyLease>;
  lifecycle: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nonVoters?: Maybe<Array<ProxyAccountInfo>>;
  validators?: Maybe<ProxyValidatorsGroup>;
};

export type ProxyParachainsInfo = {
  __typename?: 'ProxyParachainsInfo';
  leasePeriod: ProxyLeasePeriod;
  parachainsCount: Scalars['Int'];
  parathreadsCount: Scalars['Int'];
  proposalsCount: Scalars['Int'];
};

export type ProxyProposal = {
  __typename?: 'ProxyProposal';
  args: Array<ProxyProposalArg>;
  balance?: Maybe<Scalars['String']>;
  hash: Scalars['String'];
  index: Scalars['String'];
  meta: Scalars['String'];
  method: Scalars['String'];
  proposer: ProxyProposer;
  seconds: Array<ProxyProposalSecond>;
  section: Scalars['String'];
};

export type ProxyProposalArg = {
  __typename?: 'ProxyProposalArg';
  name?: Maybe<Scalars['String']>;
  subCalls?: Maybe<Array<Maybe<ProxyProposal>>>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProxyProposalSecond = {
  __typename?: 'ProxyProposalSecond';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyProposalVotes = {
  __typename?: 'ProxyProposalVotes';
  ayes?: Maybe<Array<Scalars['String']>>;
  end?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['String']>;
  nays?: Maybe<Array<Scalars['String']>>;
  threshold?: Maybe<Scalars['String']>;
};

export type ProxyProposer = {
  __typename?: 'ProxyProposer';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type ProxyReferendum = {
  __typename?: 'ProxyReferendum';
  activatePeriod: Array<Scalars['String']>;
  args: Array<ProxyProposalArg>;
  endPeriod: Array<Scalars['String']>;
  hash: Scalars['String'];
  index: Scalars['String'];
  meta: Scalars['String'];
  method: Scalars['String'];
  section: Scalars['String'];
  voteCountAye: Scalars['String'];
  voteCountNay: Scalars['String'];
  votedAye: Scalars['String'];
  votedNay: Scalars['String'];
};

export type ProxyRegistrar = {
  __typename?: 'ProxyRegistrar';
  account?: Maybe<ProxyAccount>;
  address?: Maybe<Scalars['String']>;
  fee?: Maybe<Scalars['String']>;
  formattedFee?: Maybe<Scalars['String']>;
  /** id: Registrar index */
  id: Scalars['String'];
};

export type ProxyRegistrationJudgement = {
  __typename?: 'ProxyRegistrationJudgement';
  index?: Maybe<Scalars['Int']>;
  judgement?: Maybe<ProxyIdentityJudgement>;
};

export type ProxyTermProgress = {
  __typename?: 'ProxyTermProgress';
  percentage?: Maybe<Scalars['Int']>;
  termDuration?: Maybe<Scalars['String']>;
  termDurationParts: Array<Scalars['String']>;
  termLeft?: Maybe<Scalars['String']>;
  termLeftParts?: Maybe<Array<Scalars['String']>>;
};

export type ProxyTip = {
  __typename?: 'ProxyTip';
  closes?: Maybe<Scalars['String']>;
  deposit?: Maybe<Scalars['String']>;
  finder?: Maybe<ProxyFinder>;
  formattedMedian?: Maybe<Scalars['String']>;
  /** id: Tip Hash */
  id: Scalars['String'];
  median?: Maybe<Scalars['String']>;
  reason: Scalars['String'];
  tippers: Array<ProxyTipper>;
  tippersCount: Scalars['Int'];
  who: ProxyWho;
};

export type ProxyTipper = {
  __typename?: 'ProxyTipper';
  account: ProxyAccount;
  address: Scalars['String'];
  balance: Scalars['String'];
  formattedBalance: Scalars['String'];
};

export type ProxyTreasury = {
  __typename?: 'ProxyTreasury';
  approvals: Array<ProxyTreasuryProposal>;
  proposals: Array<ProxyTreasuryProposal>;
};

export type ProxyTreasuryBalance = {
  __typename?: 'ProxyTreasuryBalance';
  accountId: Scalars['String'];
  accountNonce: Scalars['String'];
  freeBalance: Scalars['String'];
  frozenFee: Scalars['String'];
  frozenMisc: Scalars['String'];
  reservedBalance: Scalars['String'];
  votingBalance: Scalars['String'];
};

export type ProxyTreasuryProposal = {
  __typename?: 'ProxyTreasuryProposal';
  councils: Array<ProxyCollectiveProposal>;
  id: Scalars['String'];
  proposal: ProxyPalletProposal;
};

export type ProxyTreasurySummary = {
  __typename?: 'ProxyTreasurySummary';
  activeProposals: Scalars['Int'];
  approvedProposals: Scalars['Int'];
  burn?: Maybe<Scalars['String']>;
  proposalCount: Scalars['String'];
  spendPeriod: Scalars['String'];
  treasuryBalance: ProxyTreasuryBalance;
};

export type ProxyValidatorsGroup = {
  __typename?: 'ProxyValidatorsGroup';
  groupIndex?: Maybe<Scalars['String']>;
  validators?: Maybe<Array<ProxyAccountInfo>>;
};

export type ProxyWho = {
  __typename?: 'ProxyWho';
  account: ProxyAccount;
  address: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bep20Account?: Maybe<Bep20Account>;
  bep20Accounts: Array<Bep20Account>;
  bep20Transfer?: Maybe<Bep20Transfer>;
  bep20Transfers: Array<Bep20Transfer>;
  erc20Account?: Maybe<Erc20Account>;
  erc20Accounts: Array<Erc20Account>;
  erc20Transfer?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  erc1155Token?: Maybe<Erc1155Token>;
  erc1155Tokens: Array<Erc1155Token>;
  ipfsexampleQuery?: Maybe<IpfsExample>;
  proxyAccount?: Maybe<ProxyAccount>;
  proxyActiveCrowdloans: Array<ProxyCrowdloan>;
  proxyBalance: ProxyBalance;
  proxyBounties: Array<ProxyBounty>;
  proxyBountiesSummary: ProxyBountiesSummary;
  proxyBounty?: Maybe<ProxyBounty>;
  proxyChainInfo: ProxyChainInfo;
  proxyConvictions?: Maybe<Array<ProxyConviction>>;
  proxyCouncil: ProxyCouncil;
  proxyCouncilMotions: Array<ProxyCouncilMotion>;
  proxyCrowdloan?: Maybe<ProxyCrowdloan>;
  proxyCrowdloanContribution: ProxyCrowdloanContribution;
  proxyCrowdloanSummary: ProxyCrowdloanSummary;
  proxyDemocracyProposal?: Maybe<ProxyProposal>;
  proxyDemocracyProposals: Array<ProxyProposal>;
  proxyDemocracyReferendum?: Maybe<ProxyReferendum>;
  proxyDemocracyReferendums: Array<ProxyReferendum>;
  proxyDemocracySummary: ProxyDemocracySummary;
  proxyEndedCrowdloans: Array<ProxyCrowdloan>;
  proxyEvents: Array<ProxyEvent>;
  proxyModuleElection: ProxyModuleElection;
  proxyParachain?: Maybe<ProxyParachain>;
  proxyParachains?: Maybe<Array<ProxyParachain>>;
  proxyParachainsInfo: ProxyParachainsInfo;
  proxyRegistrars?: Maybe<Array<ProxyRegistrar>>;
  proxyTip?: Maybe<ProxyTip>;
  proxyTips?: Maybe<Array<ProxyTip>>;
  proxyTreasury: ProxyTreasury;
  proxyTreasurySummary: ProxyTreasurySummary;
  substrateAccountById?: Maybe<SubstrateAccount>;
  /** @deprecated Use `substrateAccountById` */
  substrateAccountByUniqueInput?: Maybe<SubstrateAccount>;
  substrateAccounts: Array<SubstrateAccount>;
  substrateAccountsConnection: SubstrateAccountsConnection;
  substrateBalanceById?: Maybe<SubstrateBalance>;
  /** @deprecated Use `substrateBalanceById` */
  substrateBalanceByUniqueInput?: Maybe<SubstrateBalance>;
  substrateBalances: Array<SubstrateBalance>;
  substrateBalancesConnection: SubstrateBalancesConnection;
  substrateCrowdloanContributionById?: Maybe<SubstrateCrowdloanContribution>;
  /** @deprecated Use `substrateCrowdloanContributionById` */
  substrateCrowdloanContributionByUniqueInput?: Maybe<SubstrateCrowdloanContribution>;
  substrateCrowdloanContributions: Array<SubstrateCrowdloanContribution>;
  substrateCrowdloanContributionsConnection: SubstrateCrowdloanContributionsConnection;
  substrateTransferById?: Maybe<SubstrateTransfer>;
  /** @deprecated Use `substrateTransferById` */
  substrateTransferByUniqueInput?: Maybe<SubstrateTransfer>;
  substrateTransfers: Array<SubstrateTransfer>;
  substrateTransfersConnection: SubstrateTransfersConnection;
  substrateVoteById?: Maybe<SubstrateVote>;
  /** @deprecated Use `substrateVoteById` */
  substrateVoteByUniqueInput?: Maybe<SubstrateVote>;
  substrateVotes: Array<SubstrateVote>;
  substrateVotesConnection: SubstrateVotesConnection;
  web2exampleQuery?: Maybe<Web2Example>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryBep20AccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBep20AccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bep20Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bep20Account_Filter>;
};

export type QueryBep20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBep20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bep20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bep20Transfer_Filter>;
};

export type QueryErc20AccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryErc20AccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Account_Filter>;
};

export type QueryErc20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryErc20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type QueryErc1155TokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryErc1155TokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc1155Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Token_Filter>;
};

export type QueryIpfsexampleQueryArgs = {
  address: Scalars['String'];
};

export type QueryProxyAccountArgs = {
  address: Scalars['String'];
};

export type QueryProxyBalanceArgs = {
  address: Scalars['String'];
  blockNumber?: InputMaybe<Scalars['Int']>;
};

export type QueryProxyBountyArgs = {
  index: Scalars['String'];
};

export type QueryProxyCrowdloanArgs = {
  paraId: Scalars['String'];
};

export type QueryProxyCrowdloanContributionArgs = {
  paraId: Scalars['String'];
};

export type QueryProxyDemocracyProposalArgs = {
  index: Scalars['String'];
};

export type QueryProxyDemocracyReferendumArgs = {
  index: Scalars['String'];
};

export type QueryProxyParachainArgs = {
  id: Scalars['String'];
};

export type QueryProxyTipArgs = {
  id: Scalars['String'];
};

export type QuerySubstrateAccountByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateAccountByUniqueInputArgs = {
  where: SubstrateAccountWhereUniqueInput;
};

export type QuerySubstrateAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateAccountOrderByInput>>>;
  where?: InputMaybe<SubstrateAccountWhereInput>;
};

export type QuerySubstrateAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateAccountOrderByInput>;
  where?: InputMaybe<SubstrateAccountWhereInput>;
};

export type QuerySubstrateBalanceByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateBalanceByUniqueInputArgs = {
  where: SubstrateBalanceWhereUniqueInput;
};

export type QuerySubstrateBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceWhereInput>;
};

export type QuerySubstrateBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateBalanceOrderByInput>;
  where?: InputMaybe<SubstrateBalanceWhereInput>;
};

export type QuerySubstrateCrowdloanContributionByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateCrowdloanContributionByUniqueInputArgs = {
  where: SubstrateCrowdloanContributionWhereUniqueInput;
};

export type QuerySubstrateCrowdloanContributionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateCrowdloanContributionOrderByInput>>>;
  where?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
};

export type QuerySubstrateCrowdloanContributionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateCrowdloanContributionOrderByInput>;
  where?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
};

export type QuerySubstrateTransferByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateTransferByUniqueInputArgs = {
  where: SubstrateTransferWhereUniqueInput;
};

export type QuerySubstrateTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateTransferOrderByInput>>>;
  where?: InputMaybe<SubstrateTransferWhereInput>;
};

export type QuerySubstrateTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateTransferOrderByInput>;
  where?: InputMaybe<SubstrateTransferWhereInput>;
};

export type QuerySubstrateVoteByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateVoteByUniqueInputArgs = {
  where: SubstrateVoteWhereUniqueInput;
};

export type QuerySubstrateVotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateVoteOrderByInput>>>;
  where?: InputMaybe<SubstrateVoteWhereInput>;
};

export type QuerySubstrateVotesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateVoteOrderByInput>;
  where?: InputMaybe<SubstrateVoteWhereInput>;
};

export type QueryWeb2exampleQueryArgs = {
  address: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bep20Account?: Maybe<Bep20Account>;
  bep20Accounts: Array<Bep20Account>;
  bep20Transfer?: Maybe<Bep20Transfer>;
  bep20Transfers: Array<Bep20Transfer>;
  erc20Account?: Maybe<Erc20Account>;
  erc20Accounts: Array<Erc20Account>;
  erc20Transfer?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  erc1155Token?: Maybe<Erc1155Token>;
  erc1155Tokens: Array<Erc1155Token>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionBep20AccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBep20AccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bep20Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bep20Account_Filter>;
};

export type SubscriptionBep20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBep20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bep20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bep20Transfer_Filter>;
};

export type SubscriptionErc20AccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionErc20AccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Account_Filter>;
};

export type SubscriptionErc20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionErc20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Transfer_Filter>;
};

export type SubscriptionErc1155TokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionErc1155TokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc1155Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc1155Token_Filter>;
};

export type SubstrateAccount = {
  __typename?: 'SubstrateAccount';
  balances: Array<SubstrateBalance>;
  crowdloanContributions: Array<SubstrateCrowdloanContribution>;
  /** address */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  prefix: Scalars['Int'];
  /** hex address */
  rootAccount: Scalars['String'];
  totalCrowdloanContributions?: Maybe<Scalars['Int']>;
  totalVotes?: Maybe<Scalars['Int']>;
  votes: Array<SubstrateVote>;
};

export type SubstrateAccountBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceWhereInput>;
};

export type SubstrateAccountCrowdloanContributionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateCrowdloanContributionOrderByInput>>>;
  where?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
};

export type SubstrateAccountVotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateVoteOrderByInput>>>;
  where?: InputMaybe<SubstrateVoteWhereInput>;
};

export type SubstrateAccountEdge = {
  __typename?: 'SubstrateAccountEdge';
  cursor: Scalars['String'];
  node: SubstrateAccount;
};

export enum SubstrateAccountOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PrefixAsc = 'prefix_ASC',
  PrefixDesc = 'prefix_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  TotalCrowdloanContributionsAsc = 'totalCrowdloanContributions_ASC',
  TotalCrowdloanContributionsDesc = 'totalCrowdloanContributions_DESC',
  TotalVotesAsc = 'totalVotes_ASC',
  TotalVotesDesc = 'totalVotes_DESC',
}

export type SubstrateAccountWhereInput = {
  AND?: InputMaybe<Array<SubstrateAccountWhereInput>>;
  OR?: InputMaybe<Array<SubstrateAccountWhereInput>>;
  balances_every?: InputMaybe<SubstrateBalanceWhereInput>;
  balances_none?: InputMaybe<SubstrateBalanceWhereInput>;
  balances_some?: InputMaybe<SubstrateBalanceWhereInput>;
  crowdloanContributions_every?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
  crowdloanContributions_none?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
  crowdloanContributions_some?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_endsWith?: InputMaybe<Scalars['ID']>;
  id_eq?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_endsWith?: InputMaybe<Scalars['ID']>;
  id_not_eq?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_startsWith?: InputMaybe<Scalars['ID']>;
  id_startsWith?: InputMaybe<Scalars['ID']>;
  network_eq?: InputMaybe<SubstrateNetwork>;
  network_in?: InputMaybe<Array<SubstrateNetwork>>;
  network_not_eq?: InputMaybe<SubstrateNetwork>;
  network_not_in?: InputMaybe<Array<SubstrateNetwork>>;
  prefix_eq?: InputMaybe<Scalars['Int']>;
  prefix_gt?: InputMaybe<Scalars['Int']>;
  prefix_gte?: InputMaybe<Scalars['Int']>;
  prefix_in?: InputMaybe<Array<Scalars['Int']>>;
  prefix_lt?: InputMaybe<Scalars['Int']>;
  prefix_lte?: InputMaybe<Scalars['Int']>;
  prefix_not_eq?: InputMaybe<Scalars['Int']>;
  prefix_not_in?: InputMaybe<Array<Scalars['Int']>>;
  rootAccount_contains?: InputMaybe<Scalars['String']>;
  rootAccount_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_eq?: InputMaybe<Scalars['String']>;
  rootAccount_gt?: InputMaybe<Scalars['String']>;
  rootAccount_gte?: InputMaybe<Scalars['String']>;
  rootAccount_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_lt?: InputMaybe<Scalars['String']>;
  rootAccount_lte?: InputMaybe<Scalars['String']>;
  rootAccount_not_contains?: InputMaybe<Scalars['String']>;
  rootAccount_not_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_not_eq?: InputMaybe<Scalars['String']>;
  rootAccount_not_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_not_startsWith?: InputMaybe<Scalars['String']>;
  rootAccount_startsWith?: InputMaybe<Scalars['String']>;
  totalCrowdloanContributions_eq?: InputMaybe<Scalars['Int']>;
  totalCrowdloanContributions_gt?: InputMaybe<Scalars['Int']>;
  totalCrowdloanContributions_gte?: InputMaybe<Scalars['Int']>;
  totalCrowdloanContributions_in?: InputMaybe<Array<Scalars['Int']>>;
  totalCrowdloanContributions_lt?: InputMaybe<Scalars['Int']>;
  totalCrowdloanContributions_lte?: InputMaybe<Scalars['Int']>;
  totalCrowdloanContributions_not_eq?: InputMaybe<Scalars['Int']>;
  totalCrowdloanContributions_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalVotes_eq?: InputMaybe<Scalars['Int']>;
  totalVotes_gt?: InputMaybe<Scalars['Int']>;
  totalVotes_gte?: InputMaybe<Scalars['Int']>;
  totalVotes_in?: InputMaybe<Array<Scalars['Int']>>;
  totalVotes_lt?: InputMaybe<Scalars['Int']>;
  totalVotes_lte?: InputMaybe<Scalars['Int']>;
  totalVotes_not_eq?: InputMaybe<Scalars['Int']>;
  totalVotes_not_in?: InputMaybe<Array<Scalars['Int']>>;
  votes_every?: InputMaybe<SubstrateVoteWhereInput>;
  votes_none?: InputMaybe<SubstrateVoteWhereInput>;
  votes_some?: InputMaybe<SubstrateVoteWhereInput>;
};

export type SubstrateAccountWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateAccountsConnection = {
  __typename?: 'SubstrateAccountsConnection';
  edges: Array<SubstrateAccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateBalance = {
  __typename?: 'SubstrateBalance';
  /** address */
  account: SubstrateAccount;
  balance: Scalars['BigInt'];
  decimals: Scalars['Int'];
  firstTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferInDate?: Maybe<Scalars['DateTime']>;
  firstTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferOutDate?: Maybe<Scalars['DateTime']>;
  /** address:tokenSymbol */
  id: Scalars['ID'];
  lastTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferInDate?: Maybe<Scalars['DateTime']>;
  lastTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferOutDate?: Maybe<Scalars['DateTime']>;
  network: SubstrateNetwork;
  /** hex address */
  rootAccount: Scalars['String'];
  symbol: Scalars['String'];
  totalTransfers?: Maybe<Scalars['Int']>;
  transfersFrom: Array<SubstrateTransfer>;
  transfersTo: Array<SubstrateTransfer>;
};

export type SubstrateBalanceTransfersFromArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateTransferOrderByInput>>>;
  where?: InputMaybe<SubstrateTransferWhereInput>;
};

export type SubstrateBalanceTransfersToArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateTransferOrderByInput>>>;
  where?: InputMaybe<SubstrateTransferWhereInput>;
};

export type SubstrateBalanceEdge = {
  __typename?: 'SubstrateBalanceEdge';
  cursor: Scalars['String'];
  node: SubstrateBalance;
};

export enum SubstrateBalanceOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountNetworkAsc = 'account_network_ASC',
  AccountNetworkDesc = 'account_network_DESC',
  AccountPrefixAsc = 'account_prefix_ASC',
  AccountPrefixDesc = 'account_prefix_DESC',
  AccountRootAccountAsc = 'account_rootAccount_ASC',
  AccountRootAccountDesc = 'account_rootAccount_DESC',
  AccountTotalCrowdloanContributionsAsc = 'account_totalCrowdloanContributions_ASC',
  AccountTotalCrowdloanContributionsDesc = 'account_totalCrowdloanContributions_DESC',
  AccountTotalVotesAsc = 'account_totalVotes_ASC',
  AccountTotalVotesDesc = 'account_totalVotes_DESC',
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC',
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  FirstTransferInBlockNumberAsc = 'firstTransferInBlockNumber_ASC',
  FirstTransferInBlockNumberDesc = 'firstTransferInBlockNumber_DESC',
  FirstTransferInDateAsc = 'firstTransferInDate_ASC',
  FirstTransferInDateDesc = 'firstTransferInDate_DESC',
  FirstTransferOutBlockNumberAsc = 'firstTransferOutBlockNumber_ASC',
  FirstTransferOutBlockNumberDesc = 'firstTransferOutBlockNumber_DESC',
  FirstTransferOutDateAsc = 'firstTransferOutDate_ASC',
  FirstTransferOutDateDesc = 'firstTransferOutDate_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LastTransferInBlockNumberAsc = 'lastTransferInBlockNumber_ASC',
  LastTransferInBlockNumberDesc = 'lastTransferInBlockNumber_DESC',
  LastTransferInDateAsc = 'lastTransferInDate_ASC',
  LastTransferInDateDesc = 'lastTransferInDate_DESC',
  LastTransferOutBlockNumberAsc = 'lastTransferOutBlockNumber_ASC',
  LastTransferOutBlockNumberDesc = 'lastTransferOutBlockNumber_DESC',
  LastTransferOutDateAsc = 'lastTransferOutDate_ASC',
  LastTransferOutDateDesc = 'lastTransferOutDate_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
  TotalTransfersAsc = 'totalTransfers_ASC',
  TotalTransfersDesc = 'totalTransfers_DESC',
}

export type SubstrateBalanceWhereInput = {
  AND?: InputMaybe<Array<SubstrateBalanceWhereInput>>;
  OR?: InputMaybe<Array<SubstrateBalanceWhereInput>>;
  account?: InputMaybe<SubstrateAccountWhereInput>;
  balance_eq?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_eq?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  firstTransferInBlockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInDate_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_gt?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_gte?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  firstTransferInDate_lt?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_lte?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_not_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  firstTransferOutBlockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutDate_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_gt?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_gte?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  firstTransferOutDate_lt?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_lte?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_not_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_endsWith?: InputMaybe<Scalars['ID']>;
  id_eq?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_endsWith?: InputMaybe<Scalars['ID']>;
  id_not_eq?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_startsWith?: InputMaybe<Scalars['ID']>;
  id_startsWith?: InputMaybe<Scalars['ID']>;
  lastTransferInBlockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInDate_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_gt?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_gte?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  lastTransferInDate_lt?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_lte?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_not_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  lastTransferOutBlockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutDate_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_gt?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_gte?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  lastTransferOutDate_lt?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_lte?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_not_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  network_eq?: InputMaybe<SubstrateNetwork>;
  network_in?: InputMaybe<Array<SubstrateNetwork>>;
  network_not_eq?: InputMaybe<SubstrateNetwork>;
  network_not_in?: InputMaybe<Array<SubstrateNetwork>>;
  rootAccount_contains?: InputMaybe<Scalars['String']>;
  rootAccount_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_eq?: InputMaybe<Scalars['String']>;
  rootAccount_gt?: InputMaybe<Scalars['String']>;
  rootAccount_gte?: InputMaybe<Scalars['String']>;
  rootAccount_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_lt?: InputMaybe<Scalars['String']>;
  rootAccount_lte?: InputMaybe<Scalars['String']>;
  rootAccount_not_contains?: InputMaybe<Scalars['String']>;
  rootAccount_not_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_not_eq?: InputMaybe<Scalars['String']>;
  rootAccount_not_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_not_startsWith?: InputMaybe<Scalars['String']>;
  rootAccount_startsWith?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_endsWith?: InputMaybe<Scalars['String']>;
  symbol_eq?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']>;
  symbol_not_eq?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']>;
  symbol_startsWith?: InputMaybe<Scalars['String']>;
  totalTransfers_eq?: InputMaybe<Scalars['Int']>;
  totalTransfers_gt?: InputMaybe<Scalars['Int']>;
  totalTransfers_gte?: InputMaybe<Scalars['Int']>;
  totalTransfers_in?: InputMaybe<Array<Scalars['Int']>>;
  totalTransfers_lt?: InputMaybe<Scalars['Int']>;
  totalTransfers_lte?: InputMaybe<Scalars['Int']>;
  totalTransfers_not_eq?: InputMaybe<Scalars['Int']>;
  totalTransfers_not_in?: InputMaybe<Array<Scalars['Int']>>;
  transfersFrom_every?: InputMaybe<SubstrateTransferWhereInput>;
  transfersFrom_none?: InputMaybe<SubstrateTransferWhereInput>;
  transfersFrom_some?: InputMaybe<SubstrateTransferWhereInput>;
  transfersTo_every?: InputMaybe<SubstrateTransferWhereInput>;
  transfersTo_none?: InputMaybe<SubstrateTransferWhereInput>;
  transfersTo_some?: InputMaybe<SubstrateTransferWhereInput>;
};

export type SubstrateBalanceWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateBalancesConnection = {
  __typename?: 'SubstrateBalancesConnection';
  edges: Array<SubstrateBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateCrowdloanContribution = {
  __typename?: 'SubstrateCrowdloanContribution';
  account: SubstrateAccount;
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  paraId: Scalars['Int'];
  rootAccount: Scalars['String'];
  symbol: Scalars['String'];
};

export type SubstrateCrowdloanContributionEdge = {
  __typename?: 'SubstrateCrowdloanContributionEdge';
  cursor: Scalars['String'];
  node: SubstrateCrowdloanContribution;
};

export enum SubstrateCrowdloanContributionOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountNetworkAsc = 'account_network_ASC',
  AccountNetworkDesc = 'account_network_DESC',
  AccountPrefixAsc = 'account_prefix_ASC',
  AccountPrefixDesc = 'account_prefix_DESC',
  AccountRootAccountAsc = 'account_rootAccount_ASC',
  AccountRootAccountDesc = 'account_rootAccount_DESC',
  AccountTotalCrowdloanContributionsAsc = 'account_totalCrowdloanContributions_ASC',
  AccountTotalCrowdloanContributionsDesc = 'account_totalCrowdloanContributions_DESC',
  AccountTotalVotesAsc = 'account_totalVotes_ASC',
  AccountTotalVotesDesc = 'account_totalVotes_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ParaIdAsc = 'paraId_ASC',
  ParaIdDesc = 'paraId_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type SubstrateCrowdloanContributionWhereInput = {
  AND?: InputMaybe<Array<SubstrateCrowdloanContributionWhereInput>>;
  OR?: InputMaybe<Array<SubstrateCrowdloanContributionWhereInput>>;
  account?: InputMaybe<SubstrateAccountWhereInput>;
  amount_eq?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  date_eq?: InputMaybe<Scalars['DateTime']>;
  date_gt?: InputMaybe<Scalars['DateTime']>;
  date_gte?: InputMaybe<Scalars['DateTime']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']>>;
  date_lt?: InputMaybe<Scalars['DateTime']>;
  date_lte?: InputMaybe<Scalars['DateTime']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  decimals_eq?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_endsWith?: InputMaybe<Scalars['ID']>;
  id_eq?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_endsWith?: InputMaybe<Scalars['ID']>;
  id_not_eq?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_startsWith?: InputMaybe<Scalars['ID']>;
  id_startsWith?: InputMaybe<Scalars['ID']>;
  network_eq?: InputMaybe<SubstrateNetwork>;
  network_in?: InputMaybe<Array<SubstrateNetwork>>;
  network_not_eq?: InputMaybe<SubstrateNetwork>;
  network_not_in?: InputMaybe<Array<SubstrateNetwork>>;
  paraId_eq?: InputMaybe<Scalars['Int']>;
  paraId_gt?: InputMaybe<Scalars['Int']>;
  paraId_gte?: InputMaybe<Scalars['Int']>;
  paraId_in?: InputMaybe<Array<Scalars['Int']>>;
  paraId_lt?: InputMaybe<Scalars['Int']>;
  paraId_lte?: InputMaybe<Scalars['Int']>;
  paraId_not_eq?: InputMaybe<Scalars['Int']>;
  paraId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  rootAccount_contains?: InputMaybe<Scalars['String']>;
  rootAccount_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_eq?: InputMaybe<Scalars['String']>;
  rootAccount_gt?: InputMaybe<Scalars['String']>;
  rootAccount_gte?: InputMaybe<Scalars['String']>;
  rootAccount_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_lt?: InputMaybe<Scalars['String']>;
  rootAccount_lte?: InputMaybe<Scalars['String']>;
  rootAccount_not_contains?: InputMaybe<Scalars['String']>;
  rootAccount_not_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_not_eq?: InputMaybe<Scalars['String']>;
  rootAccount_not_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_not_startsWith?: InputMaybe<Scalars['String']>;
  rootAccount_startsWith?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_endsWith?: InputMaybe<Scalars['String']>;
  symbol_eq?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']>;
  symbol_not_eq?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']>;
  symbol_startsWith?: InputMaybe<Scalars['String']>;
};

export type SubstrateCrowdloanContributionWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateCrowdloanContributionsConnection = {
  __typename?: 'SubstrateCrowdloanContributionsConnection';
  edges: Array<SubstrateCrowdloanContributionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum SubstrateNetwork {
  Kusama = 'kusama',
  Phala = 'phala',
  Polkadot = 'polkadot',
}

export type SubstrateTransfer = {
  __typename?: 'SubstrateTransfer';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  from: SubstrateBalance;
  fromAccountBalanceAtBlock: Scalars['BigInt'];
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
  tip: Scalars['BigInt'];
  to: SubstrateBalance;
  toAccountBalanceAtBlock: Scalars['BigInt'];
};

export type SubstrateTransferEdge = {
  __typename?: 'SubstrateTransferEdge';
  cursor: Scalars['String'];
  node: SubstrateTransfer;
};

export enum SubstrateTransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  FromAccountBalanceAtBlockAsc = 'fromAccountBalanceAtBlock_ASC',
  FromAccountBalanceAtBlockDesc = 'fromAccountBalanceAtBlock_DESC',
  FromBalanceAsc = 'from_balance_ASC',
  FromBalanceDesc = 'from_balance_DESC',
  FromDecimalsAsc = 'from_decimals_ASC',
  FromDecimalsDesc = 'from_decimals_DESC',
  FromFirstTransferInBlockNumberAsc = 'from_firstTransferInBlockNumber_ASC',
  FromFirstTransferInBlockNumberDesc = 'from_firstTransferInBlockNumber_DESC',
  FromFirstTransferInDateAsc = 'from_firstTransferInDate_ASC',
  FromFirstTransferInDateDesc = 'from_firstTransferInDate_DESC',
  FromFirstTransferOutBlockNumberAsc = 'from_firstTransferOutBlockNumber_ASC',
  FromFirstTransferOutBlockNumberDesc = 'from_firstTransferOutBlockNumber_DESC',
  FromFirstTransferOutDateAsc = 'from_firstTransferOutDate_ASC',
  FromFirstTransferOutDateDesc = 'from_firstTransferOutDate_DESC',
  FromIdAsc = 'from_id_ASC',
  FromIdDesc = 'from_id_DESC',
  FromLastTransferInBlockNumberAsc = 'from_lastTransferInBlockNumber_ASC',
  FromLastTransferInBlockNumberDesc = 'from_lastTransferInBlockNumber_DESC',
  FromLastTransferInDateAsc = 'from_lastTransferInDate_ASC',
  FromLastTransferInDateDesc = 'from_lastTransferInDate_DESC',
  FromLastTransferOutBlockNumberAsc = 'from_lastTransferOutBlockNumber_ASC',
  FromLastTransferOutBlockNumberDesc = 'from_lastTransferOutBlockNumber_DESC',
  FromLastTransferOutDateAsc = 'from_lastTransferOutDate_ASC',
  FromLastTransferOutDateDesc = 'from_lastTransferOutDate_DESC',
  FromNetworkAsc = 'from_network_ASC',
  FromNetworkDesc = 'from_network_DESC',
  FromRootAccountAsc = 'from_rootAccount_ASC',
  FromRootAccountDesc = 'from_rootAccount_DESC',
  FromSymbolAsc = 'from_symbol_ASC',
  FromSymbolDesc = 'from_symbol_DESC',
  FromTotalTransfersAsc = 'from_totalTransfers_ASC',
  FromTotalTransfersDesc = 'from_totalTransfers_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
  TipAsc = 'tip_ASC',
  TipDesc = 'tip_DESC',
  ToAccountBalanceAtBlockAsc = 'toAccountBalanceAtBlock_ASC',
  ToAccountBalanceAtBlockDesc = 'toAccountBalanceAtBlock_DESC',
  ToBalanceAsc = 'to_balance_ASC',
  ToBalanceDesc = 'to_balance_DESC',
  ToDecimalsAsc = 'to_decimals_ASC',
  ToDecimalsDesc = 'to_decimals_DESC',
  ToFirstTransferInBlockNumberAsc = 'to_firstTransferInBlockNumber_ASC',
  ToFirstTransferInBlockNumberDesc = 'to_firstTransferInBlockNumber_DESC',
  ToFirstTransferInDateAsc = 'to_firstTransferInDate_ASC',
  ToFirstTransferInDateDesc = 'to_firstTransferInDate_DESC',
  ToFirstTransferOutBlockNumberAsc = 'to_firstTransferOutBlockNumber_ASC',
  ToFirstTransferOutBlockNumberDesc = 'to_firstTransferOutBlockNumber_DESC',
  ToFirstTransferOutDateAsc = 'to_firstTransferOutDate_ASC',
  ToFirstTransferOutDateDesc = 'to_firstTransferOutDate_DESC',
  ToIdAsc = 'to_id_ASC',
  ToIdDesc = 'to_id_DESC',
  ToLastTransferInBlockNumberAsc = 'to_lastTransferInBlockNumber_ASC',
  ToLastTransferInBlockNumberDesc = 'to_lastTransferInBlockNumber_DESC',
  ToLastTransferInDateAsc = 'to_lastTransferInDate_ASC',
  ToLastTransferInDateDesc = 'to_lastTransferInDate_DESC',
  ToLastTransferOutBlockNumberAsc = 'to_lastTransferOutBlockNumber_ASC',
  ToLastTransferOutBlockNumberDesc = 'to_lastTransferOutBlockNumber_DESC',
  ToLastTransferOutDateAsc = 'to_lastTransferOutDate_ASC',
  ToLastTransferOutDateDesc = 'to_lastTransferOutDate_DESC',
  ToNetworkAsc = 'to_network_ASC',
  ToNetworkDesc = 'to_network_DESC',
  ToRootAccountAsc = 'to_rootAccount_ASC',
  ToRootAccountDesc = 'to_rootAccount_DESC',
  ToSymbolAsc = 'to_symbol_ASC',
  ToSymbolDesc = 'to_symbol_DESC',
  ToTotalTransfersAsc = 'to_totalTransfers_ASC',
  ToTotalTransfersDesc = 'to_totalTransfers_DESC',
}

export type SubstrateTransferWhereInput = {
  AND?: InputMaybe<Array<SubstrateTransferWhereInput>>;
  OR?: InputMaybe<Array<SubstrateTransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  date_eq?: InputMaybe<Scalars['DateTime']>;
  date_gt?: InputMaybe<Scalars['DateTime']>;
  date_gte?: InputMaybe<Scalars['DateTime']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']>>;
  date_lt?: InputMaybe<Scalars['DateTime']>;
  date_lte?: InputMaybe<Scalars['DateTime']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  decimals_eq?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  from?: InputMaybe<SubstrateBalanceWhereInput>;
  fromAccountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fromAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  fromAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_endsWith?: InputMaybe<Scalars['ID']>;
  id_eq?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_endsWith?: InputMaybe<Scalars['ID']>;
  id_not_eq?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_startsWith?: InputMaybe<Scalars['ID']>;
  id_startsWith?: InputMaybe<Scalars['ID']>;
  network_eq?: InputMaybe<SubstrateNetwork>;
  network_in?: InputMaybe<Array<SubstrateNetwork>>;
  network_not_eq?: InputMaybe<SubstrateNetwork>;
  network_not_in?: InputMaybe<Array<SubstrateNetwork>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_endsWith?: InputMaybe<Scalars['String']>;
  symbol_eq?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']>;
  symbol_not_eq?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']>;
  symbol_startsWith?: InputMaybe<Scalars['String']>;
  tip_eq?: InputMaybe<Scalars['BigInt']>;
  tip_gt?: InputMaybe<Scalars['BigInt']>;
  tip_gte?: InputMaybe<Scalars['BigInt']>;
  tip_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tip_lt?: InputMaybe<Scalars['BigInt']>;
  tip_lte?: InputMaybe<Scalars['BigInt']>;
  tip_not_eq?: InputMaybe<Scalars['BigInt']>;
  tip_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<SubstrateBalanceWhereInput>;
  toAccountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  toAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type SubstrateTransferWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateTransfersConnection = {
  __typename?: 'SubstrateTransfersConnection';
  edges: Array<SubstrateTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateVote = {
  __typename?: 'SubstrateVote';
  account: SubstrateAccount;
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  rootAccount: Scalars['String'];
};

export type SubstrateVoteEdge = {
  __typename?: 'SubstrateVoteEdge';
  cursor: Scalars['String'];
  node: SubstrateVote;
};

export enum SubstrateVoteOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountNetworkAsc = 'account_network_ASC',
  AccountNetworkDesc = 'account_network_DESC',
  AccountPrefixAsc = 'account_prefix_ASC',
  AccountPrefixDesc = 'account_prefix_DESC',
  AccountRootAccountAsc = 'account_rootAccount_ASC',
  AccountRootAccountDesc = 'account_rootAccount_DESC',
  AccountTotalCrowdloanContributionsAsc = 'account_totalCrowdloanContributions_ASC',
  AccountTotalCrowdloanContributionsDesc = 'account_totalCrowdloanContributions_DESC',
  AccountTotalVotesAsc = 'account_totalVotes_ASC',
  AccountTotalVotesDesc = 'account_totalVotes_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
}

export type SubstrateVoteWhereInput = {
  AND?: InputMaybe<Array<SubstrateVoteWhereInput>>;
  OR?: InputMaybe<Array<SubstrateVoteWhereInput>>;
  account?: InputMaybe<SubstrateAccountWhereInput>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  date_eq?: InputMaybe<Scalars['DateTime']>;
  date_gt?: InputMaybe<Scalars['DateTime']>;
  date_gte?: InputMaybe<Scalars['DateTime']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']>>;
  date_lt?: InputMaybe<Scalars['DateTime']>;
  date_lte?: InputMaybe<Scalars['DateTime']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_endsWith?: InputMaybe<Scalars['ID']>;
  id_eq?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_endsWith?: InputMaybe<Scalars['ID']>;
  id_not_eq?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_startsWith?: InputMaybe<Scalars['ID']>;
  id_startsWith?: InputMaybe<Scalars['ID']>;
  network_eq?: InputMaybe<SubstrateNetwork>;
  network_in?: InputMaybe<Array<SubstrateNetwork>>;
  network_not_eq?: InputMaybe<SubstrateNetwork>;
  network_not_in?: InputMaybe<Array<SubstrateNetwork>>;
  rootAccount_contains?: InputMaybe<Scalars['String']>;
  rootAccount_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_eq?: InputMaybe<Scalars['String']>;
  rootAccount_gt?: InputMaybe<Scalars['String']>;
  rootAccount_gte?: InputMaybe<Scalars['String']>;
  rootAccount_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_lt?: InputMaybe<Scalars['String']>;
  rootAccount_lte?: InputMaybe<Scalars['String']>;
  rootAccount_not_contains?: InputMaybe<Scalars['String']>;
  rootAccount_not_endsWith?: InputMaybe<Scalars['String']>;
  rootAccount_not_eq?: InputMaybe<Scalars['String']>;
  rootAccount_not_in?: InputMaybe<Array<Scalars['String']>>;
  rootAccount_not_startsWith?: InputMaybe<Scalars['String']>;
  rootAccount_startsWith?: InputMaybe<Scalars['String']>;
};

export type SubstrateVoteWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateVotesConnection = {
  __typename?: 'SubstrateVotesConnection';
  edges: Array<SubstrateVoteEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Web2Example = {
  __typename?: 'Web2Example';
  anotherProperty?: Maybe<Scalars['String']>;
  property?: Maybe<Scalars['Boolean']>;
  required: Scalars['String'];
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
