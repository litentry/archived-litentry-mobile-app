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
  contractAddress: Scalars['String'];
  decimals: Scalars['Int'];
  firstTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  lastTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  symbol: Scalars['String'];
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalTransfers?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transfersFrom_?: InputMaybe<Bep20Transfer_Filter>;
  transfersTo_?: InputMaybe<Bep20Transfer_Filter>;
};

export enum Bep20Account_OrderBy {
  Address = 'address',
  Balance = 'balance',
  ContractAddress = 'contractAddress',
  Decimals = 'decimals',
  FirstTransferInBlockNumber = 'firstTransferInBlockNumber',
  FirstTransferInTimestamp = 'firstTransferInTimestamp',
  FirstTransferOutBlockNumber = 'firstTransferOutBlockNumber',
  FirstTransferOutTimestamp = 'firstTransferOutTimestamp',
  Id = 'id',
  LastTransferInBlockNumber = 'lastTransferInBlockNumber',
  LastTransferInTimestamp = 'lastTransferInTimestamp',
  LastTransferOutBlockNumber = 'lastTransferOutBlockNumber',
  LastTransferOutTimestamp = 'lastTransferOutTimestamp',
  Symbol = 'symbol',
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  from_?: InputMaybe<Bep20Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  to_?: InputMaybe<Bep20Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type EvmChainLpData = {
  __typename?: 'EVMChainLPData';
  address: Scalars['String'];
  contract: Scalars['String'];
  liquidityProvided: Scalars['Float'];
  percentageOfPool: Scalars['Float'];
  totalSupply: Scalars['Float'];
};

export enum EvmChainSwapPlatform {
  Pancakeswap = 'pancakeswap',
  Uniswap = 'uniswap',
}

export type Erc20Account = {
  __typename?: 'Erc20Account';
  address: Scalars['String'];
  balance: Scalars['BigInt'];
  contractAddress: Scalars['String'];
  decimals: Scalars['Int'];
  firstTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  firstTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  lastTransferInBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferInTimestamp?: Maybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber?: Maybe<Scalars['BigInt']>;
  lastTransferOutTimestamp?: Maybe<Scalars['BigInt']>;
  symbol: Scalars['String'];
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalTransfers?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransfers_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not?: InputMaybe<Scalars['BigInt']>;
  totalTransfers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transfersFrom_?: InputMaybe<Erc20Transfer_Filter>;
  transfersTo_?: InputMaybe<Erc20Transfer_Filter>;
};

export enum Erc20Account_OrderBy {
  Address = 'address',
  Balance = 'balance',
  ContractAddress = 'contractAddress',
  Decimals = 'decimals',
  FirstTransferInBlockNumber = 'firstTransferInBlockNumber',
  FirstTransferInTimestamp = 'firstTransferInTimestamp',
  FirstTransferOutBlockNumber = 'firstTransferOutBlockNumber',
  FirstTransferOutTimestamp = 'firstTransferOutTimestamp',
  Id = 'id',
  LastTransferInBlockNumber = 'lastTransferInBlockNumber',
  LastTransferInTimestamp = 'lastTransferInTimestamp',
  LastTransferOutBlockNumber = 'lastTransferOutBlockNumber',
  LastTransferOutTimestamp = 'lastTransferOutTimestamp',
  Symbol = 'symbol',
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  from_?: InputMaybe<Erc20Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  to_?: InputMaybe<Erc20Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  contractAddress?: InputMaybe<Scalars['String']>;
  contractAddress_contains?: InputMaybe<Scalars['String']>;
  contractAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_gt?: InputMaybe<Scalars['String']>;
  contractAddress_gte?: InputMaybe<Scalars['String']>;
  contractAddress_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_lt?: InputMaybe<Scalars['String']>;
  contractAddress_lte?: InputMaybe<Scalars['String']>;
  contractAddress_not?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']>;
  contractAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']>;
  contractAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  ownerAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  ownerAddress_ends_with?: InputMaybe<Scalars['String']>;
  ownerAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ownerAddress_gt?: InputMaybe<Scalars['String']>;
  ownerAddress_gte?: InputMaybe<Scalars['String']>;
  ownerAddress_in?: InputMaybe<Array<Scalars['String']>>;
  ownerAddress_lt?: InputMaybe<Scalars['String']>;
  ownerAddress_lte?: InputMaybe<Scalars['String']>;
  ownerAddress_not?: InputMaybe<Scalars['String']>;
  ownerAddress_not_contains?: InputMaybe<Scalars['String']>;
  ownerAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ownerAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  ownerAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ownerAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  ownerAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  ownerAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ownerAddress_starts_with?: InputMaybe<Scalars['String']>;
  ownerAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
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

export enum GalaxyCredentialCampaignStatus {
  Active = 'Active',
  Deleted = 'Deleted',
  Draft = 'Draft',
  Expired = 'Expired',
  PrivateActive = 'PrivateActive',
  PublicActive = 'PublicActive',
}

export enum GalaxyCredentialChain {
  Arbitrum = 'ARBITRUM',
  ArbitrumTestnet = 'ARBITRUM_TESTNET',
  Avalanche = 'AVALANCHE',
  AvalancheTestnet = 'AVALANCHE_TESTNET',
  Bsc = 'BSC',
  BscTestnet = 'BSC_TESTNET',
  Ethereum = 'ETHEREUM',
  Fantom = 'FANTOM',
  FantomTestnet = 'FANTOM_TESTNET',
  Goerli = 'GOERLI',
  Heco = 'HECO',
  HecoTestnet = 'HECO_TESTNET',
  Kovan = 'KOVAN',
  Matic = 'MATIC',
  Mumbai = 'MUMBAI',
  Rinkeby = 'RINKEBY',
  Ropsten = 'ROPSTEN',
  Solana = 'SOLANA',
  SolanaDevnet = 'SOLANA_DEVNET',
  Xdai = 'XDAI',
}

export type GalaxyCredentialEligibleCredentials = {
  __typename?: 'GalaxyCredentialEligibleCredentials';
  list: Array<GalaxyCredentialEligibleCredentialsList>;
  totalCount: Scalars['Int'];
};

export type GalaxyCredentialEligibleCredentialsItems = {
  __typename?: 'GalaxyCredentialEligibleCredentialsItems';
  list: Array<Scalars['String']>;
};

export type GalaxyCredentialEligibleCredentialsList = {
  __typename?: 'GalaxyCredentialEligibleCredentialsList';
  description: Scalars['String'];
  id: Scalars['String'];
  itemCount: Scalars['Int'];
  items: GalaxyCredentialEligibleCredentialsItems;
  name: Scalars['String'];
};

export enum GalaxyCredentialListNftOrderBy {
  CreateTime = 'CreateTime',
}

export enum GalaxyCredentialListOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum GalaxyCredentialNftStatus {
  Alive = 'Alive',
  Burned = 'Burned',
}

export type GalaxyCredentialNfts = {
  __typename?: 'GalaxyCredentialNfts';
  list: Array<GalaxyCredentialNftsList>;
  totalCount: Scalars['Int'];
};

export type GalaxyCredentialNftsList = {
  __typename?: 'GalaxyCredentialNftsList';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  ipfsImage?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status: GalaxyCredentialNftStatus;
};

export enum GalaxyCredentialParticipationStatus {
  Failed = 'Failed',
  Generated = 'Generated',
  Pending = 'Pending',
  Queueing = 'Queueing',
  Success = 'Success',
}

export type GalaxyCredentialRecentParticipation = {
  __typename?: 'GalaxyCredentialRecentParticipation';
  list: Array<GalaxyCredentialRecentParticipationList>;
  totalCount: Scalars['Int'];
};

export type GalaxyCredentialRecentParticipationList = {
  __typename?: 'GalaxyCredentialRecentParticipationList';
  address: GalaxyCredentialRecentParticipationListAddress;
  campaign: GalaxyCredentialRecentParticipationListCampaign;
  id?: Maybe<Scalars['ID']>;
  status: GalaxyCredentialParticipationStatus;
  tx: Scalars['String'];
};

export type GalaxyCredentialRecentParticipationListAddress = {
  __typename?: 'GalaxyCredentialRecentParticipationListAddress';
  email: Scalars['String'];
  id: Scalars['String'];
  twitterUserID: Scalars['String'];
  twitterUserName: Scalars['String'];
};

export type GalaxyCredentialRecentParticipationListCampaign = {
  __typename?: 'GalaxyCredentialRecentParticipationListCampaign';
  description: Scalars['String'];
  id: Scalars['ID'];
  info: Scalars['String'];
  name: Scalars['String'];
  status: GalaxyCredentialCampaignStatus;
  thumbnail: Scalars['String'];
};

export type GalaxyCredentialUserData = {
  __typename?: 'GalaxyCredentialUserData';
  address: Scalars['String'];
  avatar: Scalars['String'];
  eligibleCredentials: GalaxyCredentialEligibleCredentials;
  email: Scalars['String'];
  hasEmail: Scalars['Boolean'];
  id: Scalars['String'];
  nfts: GalaxyCredentialNfts;
  recentParticipation: GalaxyCredentialRecentParticipation;
  username: Scalars['String'];
};

/** Defines the order direction, either ascending or descending */
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

export type PoapCredentialEvent = {
  __typename?: 'PoapCredentialEvent';
  id: Scalars['String'];
};

export type PoapCredentialTokenData = {
  __typename?: 'PoapCredentialTokenData';
  id: Scalars['String'];
  tokens: Array<Maybe<PoapCredentialTokens>>;
  tokensOwned: Scalars['String'];
};

export type PoapCredentialTokens = {
  __typename?: 'PoapCredentialTokens';
  created: Scalars['String'];
  event: PoapCredentialEvent;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  EVMChainLiquidityProvidedByAccount: EvmChainLpData;
  GalaxyCredentialDataByAddress: GalaxyCredentialUserData;
  PoapCredentialTokensByAddress: PoapCredentialTokenData;
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
  substrateBalanceAccountById?: Maybe<SubstrateBalanceAccount>;
  /** @deprecated Use `substrateBalanceAccountById` */
  substrateBalanceAccountByUniqueInput?: Maybe<SubstrateBalanceAccount>;
  substrateBalanceAccounts: Array<SubstrateBalanceAccount>;
  substrateBalanceAccountsConnection: SubstrateBalanceAccountsConnection;
  substrateBalanceDepositById?: Maybe<SubstrateBalanceDeposit>;
  /** @deprecated Use `substrateBalanceDepositById` */
  substrateBalanceDepositByUniqueInput?: Maybe<SubstrateBalanceDeposit>;
  substrateBalanceDeposits: Array<SubstrateBalanceDeposit>;
  substrateBalanceDepositsConnection: SubstrateBalanceDepositsConnection;
  substrateBalanceEndowedById?: Maybe<SubstrateBalanceEndowed>;
  /** @deprecated Use `substrateBalanceEndowedById` */
  substrateBalanceEndowedByUniqueInput?: Maybe<SubstrateBalanceEndowed>;
  substrateBalanceEndoweds: Array<SubstrateBalanceEndowed>;
  substrateBalanceEndowedsConnection: SubstrateBalanceEndowedsConnection;
  substrateBalanceSetById?: Maybe<SubstrateBalanceSet>;
  /** @deprecated Use `substrateBalanceSetById` */
  substrateBalanceSetByUniqueInput?: Maybe<SubstrateBalanceSet>;
  substrateBalanceSets: Array<SubstrateBalanceSet>;
  substrateBalanceSetsConnection: SubstrateBalanceSetsConnection;
  substrateBalanceTransferById?: Maybe<SubstrateBalanceTransfer>;
  /** @deprecated Use `substrateBalanceTransferById` */
  substrateBalanceTransferByUniqueInput?: Maybe<SubstrateBalanceTransfer>;
  substrateBalanceTransfers: Array<SubstrateBalanceTransfer>;
  substrateBalanceTransfersConnection: SubstrateBalanceTransfersConnection;
  substrateChainAccount?: Maybe<SubstrateChainAccount>;
  substrateChainAccounts: Array<SubstrateChainAccount>;
  substrateChainActiveCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainAuctionsSummary: SubstrateChainAuctionsSummary;
  substrateChainBalance: SubstrateChainBalance;
  substrateChainBounties: Array<SubstrateChainBounty>;
  substrateChainBountiesSummary: SubstrateChainBountiesSummary;
  substrateChainBounty?: Maybe<SubstrateChainBounty>;
  substrateChainCalendarEvents: Array<SubstrateChainCalendarEvent>;
  substrateChainChainInfo: SubstrateChainChainInfo;
  substrateChainConvictions?: Maybe<Array<SubstrateChainConviction>>;
  substrateChainCouncil: SubstrateChainCouncil;
  substrateChainCouncilMotionDetail?: Maybe<SubstrateChainCouncilMotion>;
  substrateChainCouncilMotions: Array<SubstrateChainCouncilMotion>;
  substrateChainCouncilVote: SubstrateChainCouncilVote;
  substrateChainCrowdloan?: Maybe<SubstrateChainCrowdloan>;
  substrateChainCrowdloanContribution: SubstrateChainCrowdloanContribution;
  substrateChainCrowdloanSummary: SubstrateChainCrowdloanSummary;
  substrateChainCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainDemocracyProposal?: Maybe<SubstrateChainDemocracyProposal>;
  substrateChainDemocracyProposals?: Maybe<Array<SubstrateChainDemocracyProposal>>;
  substrateChainDemocracyReferendum?: Maybe<SubstrateChainDemocracyReferendum>;
  substrateChainDemocracyReferendums?: Maybe<Array<SubstrateChainDemocracyReferendum>>;
  substrateChainDemocracySummary: SubstrateChainDemocracySummary;
  substrateChainEndedCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainModuleElection: SubstrateChainModuleElection;
  substrateChainParachain?: Maybe<SubstrateChainParachain>;
  substrateChainParachains?: Maybe<Array<SubstrateChainParachain>>;
  substrateChainParachainsSummary: SubstrateChainParachainsSummary;
  substrateChainParathreads: Array<SubstrateChainParathread>;
  substrateChainRegistrarsSummary: SubstrateChainRegistrarsSummary;
  substrateChainTechnicalCommitteeSummary: SubstrateChainTechnicalCommitteeSummary;
  substrateChainTip?: Maybe<SubstrateChainTip>;
  substrateChainTips?: Maybe<Array<SubstrateChainTip>>;
  substrateChainTreasury: SubstrateChainTreasury;
  substrateChainTreasurySummary: SubstrateChainTreasurySummary;
  substrateCrowdloanContributionAccountById?: Maybe<SubstrateCrowdloanContributionAccount>;
  /** @deprecated Use `substrateCrowdloanContributionAccountById` */
  substrateCrowdloanContributionAccountByUniqueInput?: Maybe<SubstrateCrowdloanContributionAccount>;
  substrateCrowdloanContributionAccounts: Array<SubstrateCrowdloanContributionAccount>;
  substrateCrowdloanContributionAccountsConnection: SubstrateCrowdloanContributionAccountsConnection;
  substrateCrowdloanContributionById?: Maybe<SubstrateCrowdloanContribution>;
  /** @deprecated Use `substrateCrowdloanContributionById` */
  substrateCrowdloanContributionByUniqueInput?: Maybe<SubstrateCrowdloanContribution>;
  substrateCrowdloanContributions: Array<SubstrateCrowdloanContribution>;
  substrateCrowdloanContributionsConnection: SubstrateCrowdloanContributionsConnection;
  substrateTreasuryAwardedById?: Maybe<SubstrateTreasuryAwarded>;
  /** @deprecated Use `substrateTreasuryAwardedById` */
  substrateTreasuryAwardedByUniqueInput?: Maybe<SubstrateTreasuryAwarded>;
  substrateTreasuryAwardeds: Array<SubstrateTreasuryAwarded>;
  substrateTreasuryAwardedsConnection: SubstrateTreasuryAwardedsConnection;
  substrateTreasuryDepositById?: Maybe<SubstrateTreasuryDeposit>;
  /** @deprecated Use `substrateTreasuryDepositById` */
  substrateTreasuryDepositByUniqueInput?: Maybe<SubstrateTreasuryDeposit>;
  substrateTreasuryDeposits: Array<SubstrateTreasuryDeposit>;
  substrateTreasuryDepositsConnection: SubstrateTreasuryDepositsConnection;
};

export type QueryEvmChainLiquidityProvidedByAccountArgs = {
  address: Scalars['String'];
  contract: Scalars['String'];
  platform: EvmChainSwapPlatform;
};

export type QueryGalaxyCredentialDataByAddressArgs = {
  address: Scalars['String'];
  chain: GalaxyCredentialChain;
};

export type QueryPoapCredentialTokensByAddressArgs = {
  address: Scalars['String'];
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

export type QuerySubstrateBalanceAccountByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateBalanceAccountByUniqueInputArgs = {
  where: SubstrateBalanceAccountWhereUniqueInput;
};

export type QuerySubstrateBalanceAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceAccountOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceAccountWhereInput>;
};

export type QuerySubstrateBalanceAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateBalanceAccountOrderByInput>;
  where?: InputMaybe<SubstrateBalanceAccountWhereInput>;
};

export type QuerySubstrateBalanceDepositByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateBalanceDepositByUniqueInputArgs = {
  where: SubstrateBalanceDepositWhereUniqueInput;
};

export type QuerySubstrateBalanceDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceDepositOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceDepositWhereInput>;
};

export type QuerySubstrateBalanceDepositsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateBalanceDepositOrderByInput>;
  where?: InputMaybe<SubstrateBalanceDepositWhereInput>;
};

export type QuerySubstrateBalanceEndowedByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateBalanceEndowedByUniqueInputArgs = {
  where: SubstrateBalanceEndowedWhereUniqueInput;
};

export type QuerySubstrateBalanceEndowedsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceEndowedOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceEndowedWhereInput>;
};

export type QuerySubstrateBalanceEndowedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateBalanceEndowedOrderByInput>;
  where?: InputMaybe<SubstrateBalanceEndowedWhereInput>;
};

export type QuerySubstrateBalanceSetByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateBalanceSetByUniqueInputArgs = {
  where: SubstrateBalanceSetWhereUniqueInput;
};

export type QuerySubstrateBalanceSetsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceSetOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceSetWhereInput>;
};

export type QuerySubstrateBalanceSetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateBalanceSetOrderByInput>;
  where?: InputMaybe<SubstrateBalanceSetWhereInput>;
};

export type QuerySubstrateBalanceTransferByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateBalanceTransferByUniqueInputArgs = {
  where: SubstrateBalanceTransferWhereUniqueInput;
};

export type QuerySubstrateBalanceTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceTransferOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceTransferWhereInput>;
};

export type QuerySubstrateBalanceTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateBalanceTransferOrderByInput>;
  where?: InputMaybe<SubstrateBalanceTransferWhereInput>;
};

export type QuerySubstrateChainAccountArgs = {
  address: Scalars['String'];
};

export type QuerySubstrateChainAccountsArgs = {
  addresses: Array<Scalars['String']>;
};

export type QuerySubstrateChainBalanceArgs = {
  address: Scalars['String'];
  blockNumber?: InputMaybe<Scalars['Int']>;
};

export type QuerySubstrateChainBountyArgs = {
  index: Scalars['String'];
};

export type QuerySubstrateChainCouncilArgs = {
  address?: InputMaybe<Scalars['String']>;
};

export type QuerySubstrateChainCouncilMotionDetailArgs = {
  hash: Scalars['String'];
};

export type QuerySubstrateChainCouncilVoteArgs = {
  address: Scalars['String'];
};

export type QuerySubstrateChainCrowdloanArgs = {
  paraId: Scalars['String'];
};

export type QuerySubstrateChainCrowdloanContributionArgs = {
  paraId: Scalars['String'];
};

export type QuerySubstrateChainCrowdloansArgs = {
  status?: InputMaybe<SubstrateChainCrowdloanStatus>;
};

export type QuerySubstrateChainDemocracyProposalArgs = {
  id: Scalars['String'];
};

export type QuerySubstrateChainDemocracyProposalsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubstrateChainDemocracyProposalOrderByInput>;
  status?: InputMaybe<Array<SubstrateChainDemocracyProposalStatus>>;
};

export type QuerySubstrateChainDemocracyReferendumArgs = {
  id: Scalars['String'];
};

export type QuerySubstrateChainDemocracyReferendumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubstrateChainDemocracyReferendumOrderByInput>;
  status?: InputMaybe<Array<SubstrateChainDemocracyReferendumStatus>>;
};

export type QuerySubstrateChainParachainArgs = {
  id: Scalars['String'];
};

export type QuerySubstrateChainTipArgs = {
  id: Scalars['String'];
};

export type QuerySubstrateChainTipsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SubstrateChainTipsOrderByInput>;
  status?: InputMaybe<Array<SubstrateChainTipStatus>>;
};

export type QuerySubstrateCrowdloanContributionAccountByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateCrowdloanContributionAccountByUniqueInputArgs = {
  where: SubstrateCrowdloanContributionAccountWhereUniqueInput;
};

export type QuerySubstrateCrowdloanContributionAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateCrowdloanContributionAccountOrderByInput>>>;
  where?: InputMaybe<SubstrateCrowdloanContributionAccountWhereInput>;
};

export type QuerySubstrateCrowdloanContributionAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateCrowdloanContributionAccountOrderByInput>;
  where?: InputMaybe<SubstrateCrowdloanContributionAccountWhereInput>;
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

export type QuerySubstrateTreasuryAwardedByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateTreasuryAwardedByUniqueInputArgs = {
  where: SubstrateTreasuryAwardedWhereUniqueInput;
};

export type QuerySubstrateTreasuryAwardedsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateTreasuryAwardedOrderByInput>>>;
  where?: InputMaybe<SubstrateTreasuryAwardedWhereInput>;
};

export type QuerySubstrateTreasuryAwardedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateTreasuryAwardedOrderByInput>;
  where?: InputMaybe<SubstrateTreasuryAwardedWhereInput>;
};

export type QuerySubstrateTreasuryDepositByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySubstrateTreasuryDepositByUniqueInputArgs = {
  where: SubstrateTreasuryDepositWhereUniqueInput;
};

export type QuerySubstrateTreasuryDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateTreasuryDepositOrderByInput>>>;
  where?: InputMaybe<SubstrateTreasuryDepositWhereInput>;
};

export type QuerySubstrateTreasuryDepositsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: Array<SubstrateTreasuryDepositOrderByInput>;
  where?: InputMaybe<SubstrateTreasuryDepositWhereInput>;
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

export type SubstrateBalanceAccount = {
  __typename?: 'SubstrateBalanceAccount';
  /** address */
  account: Scalars['String'];
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
  totalTransfers: Scalars['Int'];
  transfersFrom: Array<SubstrateBalanceTransfer>;
  transfersTo: Array<SubstrateBalanceTransfer>;
  treasuryDeposits: Array<SubstrateTreasuryDeposit>;
};

export type SubstrateBalanceAccountTransfersFromArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceTransferOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceTransferWhereInput>;
};

export type SubstrateBalanceAccountTransfersToArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateBalanceTransferOrderByInput>>>;
  where?: InputMaybe<SubstrateBalanceTransferWhereInput>;
};

export type SubstrateBalanceAccountTreasuryDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateTreasuryDepositOrderByInput>>>;
  where?: InputMaybe<SubstrateTreasuryDepositWhereInput>;
};

export type SubstrateBalanceAccountEdge = {
  __typename?: 'SubstrateBalanceAccountEdge';
  cursor: Scalars['String'];
  node: SubstrateBalanceAccount;
};

export enum SubstrateBalanceAccountOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
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

export type SubstrateBalanceAccountWhereInput = {
  AND?: InputMaybe<Array<SubstrateBalanceAccountWhereInput>>;
  OR?: InputMaybe<Array<SubstrateBalanceAccountWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_endsWith?: InputMaybe<Scalars['String']>;
  account_eq?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_endsWith?: InputMaybe<Scalars['String']>;
  account_not_eq?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']>;
  account_startsWith?: InputMaybe<Scalars['String']>;
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
  firstTransferInBlockNumber_isNull?: InputMaybe<Scalars['Boolean']>;
  firstTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferInDate_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_gt?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_gte?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  firstTransferInDate_isNull?: InputMaybe<Scalars['Boolean']>;
  firstTransferInDate_lt?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_lte?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_not_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferInDate_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  firstTransferOutBlockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutBlockNumber_isNull?: InputMaybe<Scalars['Boolean']>;
  firstTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  firstTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstTransferOutDate_eq?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_gt?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_gte?: InputMaybe<Scalars['DateTime']>;
  firstTransferOutDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  firstTransferOutDate_isNull?: InputMaybe<Scalars['Boolean']>;
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
  lastTransferInBlockNumber_isNull?: InputMaybe<Scalars['Boolean']>;
  lastTransferInBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferInBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferInDate_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_gt?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_gte?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  lastTransferInDate_isNull?: InputMaybe<Scalars['Boolean']>;
  lastTransferInDate_lt?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_lte?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_not_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferInDate_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  lastTransferOutBlockNumber_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutBlockNumber_isNull?: InputMaybe<Scalars['Boolean']>;
  lastTransferOutBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']>;
  lastTransferOutBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastTransferOutDate_eq?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_gt?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_gte?: InputMaybe<Scalars['DateTime']>;
  lastTransferOutDate_in?: InputMaybe<Array<Scalars['DateTime']>>;
  lastTransferOutDate_isNull?: InputMaybe<Scalars['Boolean']>;
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
  transfersFrom_every?: InputMaybe<SubstrateBalanceTransferWhereInput>;
  transfersFrom_none?: InputMaybe<SubstrateBalanceTransferWhereInput>;
  transfersFrom_some?: InputMaybe<SubstrateBalanceTransferWhereInput>;
  transfersTo_every?: InputMaybe<SubstrateBalanceTransferWhereInput>;
  transfersTo_none?: InputMaybe<SubstrateBalanceTransferWhereInput>;
  transfersTo_some?: InputMaybe<SubstrateBalanceTransferWhereInput>;
  treasuryDeposits_every?: InputMaybe<SubstrateTreasuryDepositWhereInput>;
  treasuryDeposits_none?: InputMaybe<SubstrateTreasuryDepositWhereInput>;
  treasuryDeposits_some?: InputMaybe<SubstrateTreasuryDepositWhereInput>;
};

export type SubstrateBalanceAccountWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateBalanceAccountsConnection = {
  __typename?: 'SubstrateBalanceAccountsConnection';
  edges: Array<SubstrateBalanceAccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateBalanceDeposit = {
  __typename?: 'SubstrateBalanceDeposit';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  depositee: SubstrateBalanceAccount;
  depositor: SubstrateBalanceAccount;
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
};

export type SubstrateBalanceDepositEdge = {
  __typename?: 'SubstrateBalanceDepositEdge';
  cursor: Scalars['String'];
  node: SubstrateBalanceDeposit;
};

export enum SubstrateBalanceDepositOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  DepositeeAccountAsc = 'depositee_account_ASC',
  DepositeeAccountDesc = 'depositee_account_DESC',
  DepositeeBalanceAsc = 'depositee_balance_ASC',
  DepositeeBalanceDesc = 'depositee_balance_DESC',
  DepositeeDecimalsAsc = 'depositee_decimals_ASC',
  DepositeeDecimalsDesc = 'depositee_decimals_DESC',
  DepositeeFirstTransferInBlockNumberAsc = 'depositee_firstTransferInBlockNumber_ASC',
  DepositeeFirstTransferInBlockNumberDesc = 'depositee_firstTransferInBlockNumber_DESC',
  DepositeeFirstTransferInDateAsc = 'depositee_firstTransferInDate_ASC',
  DepositeeFirstTransferInDateDesc = 'depositee_firstTransferInDate_DESC',
  DepositeeFirstTransferOutBlockNumberAsc = 'depositee_firstTransferOutBlockNumber_ASC',
  DepositeeFirstTransferOutBlockNumberDesc = 'depositee_firstTransferOutBlockNumber_DESC',
  DepositeeFirstTransferOutDateAsc = 'depositee_firstTransferOutDate_ASC',
  DepositeeFirstTransferOutDateDesc = 'depositee_firstTransferOutDate_DESC',
  DepositeeIdAsc = 'depositee_id_ASC',
  DepositeeIdDesc = 'depositee_id_DESC',
  DepositeeLastTransferInBlockNumberAsc = 'depositee_lastTransferInBlockNumber_ASC',
  DepositeeLastTransferInBlockNumberDesc = 'depositee_lastTransferInBlockNumber_DESC',
  DepositeeLastTransferInDateAsc = 'depositee_lastTransferInDate_ASC',
  DepositeeLastTransferInDateDesc = 'depositee_lastTransferInDate_DESC',
  DepositeeLastTransferOutBlockNumberAsc = 'depositee_lastTransferOutBlockNumber_ASC',
  DepositeeLastTransferOutBlockNumberDesc = 'depositee_lastTransferOutBlockNumber_DESC',
  DepositeeLastTransferOutDateAsc = 'depositee_lastTransferOutDate_ASC',
  DepositeeLastTransferOutDateDesc = 'depositee_lastTransferOutDate_DESC',
  DepositeeNetworkAsc = 'depositee_network_ASC',
  DepositeeNetworkDesc = 'depositee_network_DESC',
  DepositeeRootAccountAsc = 'depositee_rootAccount_ASC',
  DepositeeRootAccountDesc = 'depositee_rootAccount_DESC',
  DepositeeSymbolAsc = 'depositee_symbol_ASC',
  DepositeeSymbolDesc = 'depositee_symbol_DESC',
  DepositeeTotalTransfersAsc = 'depositee_totalTransfers_ASC',
  DepositeeTotalTransfersDesc = 'depositee_totalTransfers_DESC',
  DepositorAccountAsc = 'depositor_account_ASC',
  DepositorAccountDesc = 'depositor_account_DESC',
  DepositorBalanceAsc = 'depositor_balance_ASC',
  DepositorBalanceDesc = 'depositor_balance_DESC',
  DepositorDecimalsAsc = 'depositor_decimals_ASC',
  DepositorDecimalsDesc = 'depositor_decimals_DESC',
  DepositorFirstTransferInBlockNumberAsc = 'depositor_firstTransferInBlockNumber_ASC',
  DepositorFirstTransferInBlockNumberDesc = 'depositor_firstTransferInBlockNumber_DESC',
  DepositorFirstTransferInDateAsc = 'depositor_firstTransferInDate_ASC',
  DepositorFirstTransferInDateDesc = 'depositor_firstTransferInDate_DESC',
  DepositorFirstTransferOutBlockNumberAsc = 'depositor_firstTransferOutBlockNumber_ASC',
  DepositorFirstTransferOutBlockNumberDesc = 'depositor_firstTransferOutBlockNumber_DESC',
  DepositorFirstTransferOutDateAsc = 'depositor_firstTransferOutDate_ASC',
  DepositorFirstTransferOutDateDesc = 'depositor_firstTransferOutDate_DESC',
  DepositorIdAsc = 'depositor_id_ASC',
  DepositorIdDesc = 'depositor_id_DESC',
  DepositorLastTransferInBlockNumberAsc = 'depositor_lastTransferInBlockNumber_ASC',
  DepositorLastTransferInBlockNumberDesc = 'depositor_lastTransferInBlockNumber_DESC',
  DepositorLastTransferInDateAsc = 'depositor_lastTransferInDate_ASC',
  DepositorLastTransferInDateDesc = 'depositor_lastTransferInDate_DESC',
  DepositorLastTransferOutBlockNumberAsc = 'depositor_lastTransferOutBlockNumber_ASC',
  DepositorLastTransferOutBlockNumberDesc = 'depositor_lastTransferOutBlockNumber_DESC',
  DepositorLastTransferOutDateAsc = 'depositor_lastTransferOutDate_ASC',
  DepositorLastTransferOutDateDesc = 'depositor_lastTransferOutDate_DESC',
  DepositorNetworkAsc = 'depositor_network_ASC',
  DepositorNetworkDesc = 'depositor_network_DESC',
  DepositorRootAccountAsc = 'depositor_rootAccount_ASC',
  DepositorRootAccountDesc = 'depositor_rootAccount_DESC',
  DepositorSymbolAsc = 'depositor_symbol_ASC',
  DepositorSymbolDesc = 'depositor_symbol_DESC',
  DepositorTotalTransfersAsc = 'depositor_totalTransfers_ASC',
  DepositorTotalTransfersDesc = 'depositor_totalTransfers_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type SubstrateBalanceDepositWhereInput = {
  AND?: InputMaybe<Array<SubstrateBalanceDepositWhereInput>>;
  OR?: InputMaybe<Array<SubstrateBalanceDepositWhereInput>>;
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
  depositee?: InputMaybe<SubstrateBalanceAccountWhereInput>;
  depositor?: InputMaybe<SubstrateBalanceAccountWhereInput>;
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
};

export type SubstrateBalanceDepositWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateBalanceDepositsConnection = {
  __typename?: 'SubstrateBalanceDepositsConnection';
  edges: Array<SubstrateBalanceDepositEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateBalanceEndowed = {
  __typename?: 'SubstrateBalanceEndowed';
  account: SubstrateBalanceAccount;
  accountBalanceAtBlock: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
};

export type SubstrateBalanceEndowedEdge = {
  __typename?: 'SubstrateBalanceEndowedEdge';
  cursor: Scalars['String'];
  node: SubstrateBalanceEndowed;
};

export enum SubstrateBalanceEndowedOrderByInput {
  AccountBalanceAtBlockAsc = 'accountBalanceAtBlock_ASC',
  AccountBalanceAtBlockDesc = 'accountBalanceAtBlock_DESC',
  AccountAccountAsc = 'account_account_ASC',
  AccountAccountDesc = 'account_account_DESC',
  AccountBalanceAsc = 'account_balance_ASC',
  AccountBalanceDesc = 'account_balance_DESC',
  AccountDecimalsAsc = 'account_decimals_ASC',
  AccountDecimalsDesc = 'account_decimals_DESC',
  AccountFirstTransferInBlockNumberAsc = 'account_firstTransferInBlockNumber_ASC',
  AccountFirstTransferInBlockNumberDesc = 'account_firstTransferInBlockNumber_DESC',
  AccountFirstTransferInDateAsc = 'account_firstTransferInDate_ASC',
  AccountFirstTransferInDateDesc = 'account_firstTransferInDate_DESC',
  AccountFirstTransferOutBlockNumberAsc = 'account_firstTransferOutBlockNumber_ASC',
  AccountFirstTransferOutBlockNumberDesc = 'account_firstTransferOutBlockNumber_DESC',
  AccountFirstTransferOutDateAsc = 'account_firstTransferOutDate_ASC',
  AccountFirstTransferOutDateDesc = 'account_firstTransferOutDate_DESC',
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountLastTransferInBlockNumberAsc = 'account_lastTransferInBlockNumber_ASC',
  AccountLastTransferInBlockNumberDesc = 'account_lastTransferInBlockNumber_DESC',
  AccountLastTransferInDateAsc = 'account_lastTransferInDate_ASC',
  AccountLastTransferInDateDesc = 'account_lastTransferInDate_DESC',
  AccountLastTransferOutBlockNumberAsc = 'account_lastTransferOutBlockNumber_ASC',
  AccountLastTransferOutBlockNumberDesc = 'account_lastTransferOutBlockNumber_DESC',
  AccountLastTransferOutDateAsc = 'account_lastTransferOutDate_ASC',
  AccountLastTransferOutDateDesc = 'account_lastTransferOutDate_DESC',
  AccountNetworkAsc = 'account_network_ASC',
  AccountNetworkDesc = 'account_network_DESC',
  AccountRootAccountAsc = 'account_rootAccount_ASC',
  AccountRootAccountDesc = 'account_rootAccount_DESC',
  AccountSymbolAsc = 'account_symbol_ASC',
  AccountSymbolDesc = 'account_symbol_DESC',
  AccountTotalTransfersAsc = 'account_totalTransfers_ASC',
  AccountTotalTransfersDesc = 'account_totalTransfers_DESC',
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
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type SubstrateBalanceEndowedWhereInput = {
  AND?: InputMaybe<Array<SubstrateBalanceEndowedWhereInput>>;
  OR?: InputMaybe<Array<SubstrateBalanceEndowedWhereInput>>;
  account?: InputMaybe<SubstrateBalanceAccountWhereInput>;
  accountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export type SubstrateBalanceEndowedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateBalanceEndowedsConnection = {
  __typename?: 'SubstrateBalanceEndowedsConnection';
  edges: Array<SubstrateBalanceEndowedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateBalanceSet = {
  __typename?: 'SubstrateBalanceSet';
  account: SubstrateBalanceAccount;
  accountBalanceAtBlock: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
};

export type SubstrateBalanceSetEdge = {
  __typename?: 'SubstrateBalanceSetEdge';
  cursor: Scalars['String'];
  node: SubstrateBalanceSet;
};

export enum SubstrateBalanceSetOrderByInput {
  AccountBalanceAtBlockAsc = 'accountBalanceAtBlock_ASC',
  AccountBalanceAtBlockDesc = 'accountBalanceAtBlock_DESC',
  AccountAccountAsc = 'account_account_ASC',
  AccountAccountDesc = 'account_account_DESC',
  AccountBalanceAsc = 'account_balance_ASC',
  AccountBalanceDesc = 'account_balance_DESC',
  AccountDecimalsAsc = 'account_decimals_ASC',
  AccountDecimalsDesc = 'account_decimals_DESC',
  AccountFirstTransferInBlockNumberAsc = 'account_firstTransferInBlockNumber_ASC',
  AccountFirstTransferInBlockNumberDesc = 'account_firstTransferInBlockNumber_DESC',
  AccountFirstTransferInDateAsc = 'account_firstTransferInDate_ASC',
  AccountFirstTransferInDateDesc = 'account_firstTransferInDate_DESC',
  AccountFirstTransferOutBlockNumberAsc = 'account_firstTransferOutBlockNumber_ASC',
  AccountFirstTransferOutBlockNumberDesc = 'account_firstTransferOutBlockNumber_DESC',
  AccountFirstTransferOutDateAsc = 'account_firstTransferOutDate_ASC',
  AccountFirstTransferOutDateDesc = 'account_firstTransferOutDate_DESC',
  AccountIdAsc = 'account_id_ASC',
  AccountIdDesc = 'account_id_DESC',
  AccountLastTransferInBlockNumberAsc = 'account_lastTransferInBlockNumber_ASC',
  AccountLastTransferInBlockNumberDesc = 'account_lastTransferInBlockNumber_DESC',
  AccountLastTransferInDateAsc = 'account_lastTransferInDate_ASC',
  AccountLastTransferInDateDesc = 'account_lastTransferInDate_DESC',
  AccountLastTransferOutBlockNumberAsc = 'account_lastTransferOutBlockNumber_ASC',
  AccountLastTransferOutBlockNumberDesc = 'account_lastTransferOutBlockNumber_DESC',
  AccountLastTransferOutDateAsc = 'account_lastTransferOutDate_ASC',
  AccountLastTransferOutDateDesc = 'account_lastTransferOutDate_DESC',
  AccountNetworkAsc = 'account_network_ASC',
  AccountNetworkDesc = 'account_network_DESC',
  AccountRootAccountAsc = 'account_rootAccount_ASC',
  AccountRootAccountDesc = 'account_rootAccount_DESC',
  AccountSymbolAsc = 'account_symbol_ASC',
  AccountSymbolDesc = 'account_symbol_DESC',
  AccountTotalTransfersAsc = 'account_totalTransfers_ASC',
  AccountTotalTransfersDesc = 'account_totalTransfers_DESC',
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
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type SubstrateBalanceSetWhereInput = {
  AND?: InputMaybe<Array<SubstrateBalanceSetWhereInput>>;
  OR?: InputMaybe<Array<SubstrateBalanceSetWhereInput>>;
  account?: InputMaybe<SubstrateBalanceAccountWhereInput>;
  accountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export type SubstrateBalanceSetWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateBalanceSetsConnection = {
  __typename?: 'SubstrateBalanceSetsConnection';
  edges: Array<SubstrateBalanceSetEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateBalanceTransfer = {
  __typename?: 'SubstrateBalanceTransfer';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  from: SubstrateBalanceAccount;
  fromAccountBalanceAtBlock: Scalars['BigInt'];
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
  tip: Scalars['BigInt'];
  to: SubstrateBalanceAccount;
  toAccountBalanceAtBlock: Scalars['BigInt'];
};

export type SubstrateBalanceTransferEdge = {
  __typename?: 'SubstrateBalanceTransferEdge';
  cursor: Scalars['String'];
  node: SubstrateBalanceTransfer;
};

export enum SubstrateBalanceTransferOrderByInput {
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
  FromAccountAsc = 'from_account_ASC',
  FromAccountDesc = 'from_account_DESC',
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
  ToAccountAsc = 'to_account_ASC',
  ToAccountDesc = 'to_account_DESC',
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

export type SubstrateBalanceTransferWhereInput = {
  AND?: InputMaybe<Array<SubstrateBalanceTransferWhereInput>>;
  OR?: InputMaybe<Array<SubstrateBalanceTransferWhereInput>>;
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
  from?: InputMaybe<SubstrateBalanceAccountWhereInput>;
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
  to?: InputMaybe<SubstrateBalanceAccountWhereInput>;
  toAccountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  toAccountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  toAccountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type SubstrateBalanceTransferWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateBalanceTransfersConnection = {
  __typename?: 'SubstrateBalanceTransfersConnection';
  edges: Array<SubstrateBalanceTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateChainAccount = {
  __typename?: 'SubstrateChainAccount';
  address: Scalars['String'];
  balance?: Maybe<SubstrateChainAccountBalance>;
  display: Scalars['String'];
  hasIdentity: Scalars['Boolean'];
  registration?: Maybe<SubstrateChainDeriveAccountRegistration>;
  subAccounts?: Maybe<Array<SubstrateChainAccountInfo>>;
};

export type SubstrateChainAccountBalance = {
  __typename?: 'SubstrateChainAccountBalance';
  feeFrozen: Scalars['String'];
  formattedFeeFrozen: Scalars['String'];
  formattedFree: Scalars['String'];
  formattedMiscFrozen: Scalars['String'];
  formattedReserved: Scalars['String'];
  formattedTotal: Scalars['String'];
  free: Scalars['String'];
  miscFrozen: Scalars['String'];
  reserved: Scalars['String'];
  total: Scalars['String'];
};

export type SubstrateChainAccountInfo = {
  __typename?: 'SubstrateChainAccountInfo';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainAuction = {
  __typename?: 'SubstrateChainAuction';
  endingPeriod?: Maybe<SubstrateChainAuctionEndingPeriod>;
  formattedRaised: Scalars['String'];
  leasePeriod?: Maybe<SubstrateChainAuctionLeasePeriod>;
  raised: Scalars['String'];
  raisedPercent: Scalars['Float'];
  winningBid?: Maybe<SubstrateChainAuctionBid>;
};

export type SubstrateChainAuctionBid = {
  __typename?: 'SubstrateChainAuctionBid';
  amount: Scalars['String'];
  blockNumber: Scalars['String'];
  firstSlot: Scalars['String'];
  isCrowdloan: Scalars['Boolean'];
  lastSlot: Scalars['String'];
  projectId: Scalars['String'];
  projectName: Scalars['String'];
};

export type SubstrateChainAuctionEndingPeriod = {
  __typename?: 'SubstrateChainAuctionEndingPeriod';
  endingIn: Array<Scalars['String']>;
  remaining: Array<Scalars['String']>;
  remainingPercent: Scalars['Float'];
};

export type SubstrateChainAuctionLeasePeriod = {
  __typename?: 'SubstrateChainAuctionLeasePeriod';
  first: Scalars['String'];
  last: Scalars['String'];
};

export type SubstrateChainAuctionsInfo = {
  __typename?: 'SubstrateChainAuctionsInfo';
  active: Scalars['Boolean'];
  numAuctions: Scalars['String'];
};

export type SubstrateChainAuctionsSummary = {
  __typename?: 'SubstrateChainAuctionsSummary';
  auctionsInfo: SubstrateChainAuctionsInfo;
  latestAuction: SubstrateChainAuction;
};

export type SubstrateChainBalance = {
  __typename?: 'SubstrateChainBalance';
  consumers: Scalars['Int'];
  data: SubstrateChainAccountBalance;
  nonce: Scalars['Int'];
  providers: Scalars['Int'];
  sufficients: Scalars['Int'];
};

export type SubstrateChainBountiesSummary = {
  __typename?: 'SubstrateChainBountiesSummary';
  activeBounties: Scalars['String'];
  bountyCount: Scalars['String'];
  bountyDepositBase: Scalars['String'];
  bountyValueMinimum: Scalars['String'];
  dataDepositPerByte: Scalars['String'];
  formattedTotalValue: Scalars['String'];
  maximumReasonLength: Scalars['String'];
  pastBounties: Scalars['String'];
  progressPercent: Scalars['Int'];
  timeLeft: Array<Scalars['String']>;
  totalValue: Scalars['String'];
};

export type SubstrateChainBounty = {
  __typename?: 'SubstrateChainBounty';
  bond: Scalars['String'];
  bountyStatus: SubstrateChainBountyStatus;
  curatorDeposit: Scalars['String'];
  description: Scalars['String'];
  fee: Scalars['String'];
  formattedBond: Scalars['String'];
  formattedCuratorDeposit: Scalars['String'];
  formattedFee: Scalars['String'];
  formattedValue: Scalars['String'];
  index: Scalars['String'];
  proposer: SubstrateChainAccountInfo;
  value: Scalars['String'];
};

export type SubstrateChainBountyStatus = {
  __typename?: 'SubstrateChainBountyStatus';
  beneficiary?: Maybe<SubstrateChainAccountInfo>;
  curator?: Maybe<SubstrateChainAccountInfo>;
  status?: Maybe<Scalars['String']>;
  unlockAt?: Maybe<Scalars['String']>;
  unlockAtTime?: Maybe<Array<Scalars['String']>>;
  updateDue?: Maybe<Scalars['String']>;
  updateDueTime?: Maybe<Array<Scalars['String']>>;
};

export type SubstrateChainCalendarEvent = {
  __typename?: 'SubstrateChainCalendarEvent';
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  via: Scalars['String'];
};

export type SubstrateChainChainInfo = {
  __typename?: 'SubstrateChainChainInfo';
  auctionsLeasePeriodSlot?: Maybe<Scalars['String']>;
  chain: Scalars['String'];
  crowdloanMinContribution?: Maybe<Scalars['String']>;
  democracyEnactmentPeriod?: Maybe<Scalars['String']>;
  democracyMinimumDeposit?: Maybe<Scalars['String']>;
  existentialDeposit: Scalars['String'];
  formattedExistentialDeposit: Scalars['String'];
  nodeName: Scalars['String'];
  nodeVersion: Scalars['String'];
  registry: SubstrateChainRegistry;
  slotsLeasePeriod?: Maybe<Scalars['String']>;
};

export type SubstrateChainConviction = {
  __typename?: 'SubstrateChainConviction';
  text: Scalars['String'];
  value: Scalars['Int'];
};

export type SubstrateChainCouncil = {
  __typename?: 'SubstrateChainCouncil';
  candidates: Array<SubstrateChainCouncilMember>;
  desiredRunnersUp: Scalars['Int'];
  desiredSeats: Scalars['Int'];
  members: Array<SubstrateChainCouncilMember>;
  primeMember?: Maybe<SubstrateChainCouncilMember>;
  runnersUp: Array<SubstrateChainCouncilMember>;
  termProgress?: Maybe<SubstrateChainTermProgress>;
  totalCandidates: Scalars['Int'];
  totalMembers: Scalars['Int'];
  totalRunnersUp: Scalars['Int'];
};

export type SubstrateChainCouncilMember = {
  __typename?: 'SubstrateChainCouncilMember';
  account: SubstrateChainAccount;
  address: Scalars['String'];
  backing: Scalars['String'];
  formattedBacking: Scalars['String'];
  voters: Array<Scalars['String']>;
};

export type SubstrateChainCouncilMotion = {
  __typename?: 'SubstrateChainCouncilMotion';
  proposal: SubstrateChainMotionProposal;
  votes?: Maybe<SubstrateChainProposalVotes>;
  votingStatus?: Maybe<SubstrateChainVotingStatus>;
};

export type SubstrateChainCouncilVote = {
  __typename?: 'SubstrateChainCouncilVote';
  formattedStake: Scalars['String'];
  stake: Scalars['String'];
  votes: Array<SubstrateChainAccountInfo>;
};

export type SubstrateChainCrowdloan = {
  __typename?: 'SubstrateChainCrowdloan';
  cap: Scalars['String'];
  contribution: SubstrateChainCrowdloanContribution;
  depositor: SubstrateChainAccountInfo;
  ending: Array<Scalars['String']>;
  firstPeriod: Scalars['String'];
  formattedCap: Scalars['String'];
  formattedRaised: Scalars['String'];
  homepage?: Maybe<Scalars['String']>;
  lastPeriod: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  paraId: Scalars['String'];
  raised: Scalars['String'];
  raisedPercentage: Scalars['String'];
  status: Scalars['String'];
};

export type SubstrateChainCrowdloanContribution = {
  __typename?: 'SubstrateChainCrowdloanContribution';
  contributorsCount: Scalars['String'];
  paraId: Scalars['String'];
};

export enum SubstrateChainCrowdloanStatus {
  Active = 'Active',
  Ended = 'Ended',
}

export type SubstrateChainCrowdloanSummary = {
  __typename?: 'SubstrateChainCrowdloanSummary';
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

export type SubstrateChainDemocracyProposal = {
  __typename?: 'SubstrateChainDemocracyProposal';
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  depositAmount: Scalars['String'];
  description: Scalars['String'];
  formattedDepositAmount: Scalars['String'];
  id: Scalars['String'];
  proposalHash: Scalars['String'];
  proposalIndex: Scalars['Int'];
  proposer: SubstrateChainAccount;
  seconds: Array<SubstrateChainAccountInfo>;
  status: SubstrateChainDemocracyProposalStatus;
  tabledAtBlock?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum SubstrateChainDemocracyProposalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DepositAmountAsc = 'depositAmount_ASC',
  DepositAmountDesc = 'depositAmount_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ProposalIndexAsc = 'proposalIndex_ASC',
  ProposalIndexDesc = 'proposalIndex_DESC',
  TabledAtBlockAsc = 'tabledAtBlock_ASC',
  TabledAtBlockDesc = 'tabledAtBlock_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export enum SubstrateChainDemocracyProposalStatus {
  Cancelled = 'Cancelled',
  Proposed = 'Proposed',
  Tabled = 'Tabled',
}

export type SubstrateChainDemocracyReferendum = {
  __typename?: 'SubstrateChainDemocracyReferendum';
  aye: Scalars['String'];
  ayePercent: Scalars['Float'];
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  formattedAye: Scalars['String'];
  formattedNay: Scalars['String'];
  id: Scalars['String'];
  nay: Scalars['String'];
  status: SubstrateChainDemocracyReferendumStatus;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteThreshold: Scalars['String'];
  votes: Array<SubstrateChainDemocracyReferendumVote>;
};

export enum SubstrateChainDemocracyReferendumOrderByInput {
  AyeAsc = 'aye_ASC',
  AyeDesc = 'aye_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NayAsc = 'nay_ASC',
  NayDesc = 'nay_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VoteThresholdAsc = 'voteThreshold_ASC',
  VoteThresholdDesc = 'voteThreshold_DESC',
}

export enum SubstrateChainDemocracyReferendumStatus {
  Cancelled = 'Cancelled',
  Executed = 'Executed',
  NotPassed = 'NotPassed',
  Passed = 'Passed',
  Started = 'Started',
}

export type SubstrateChainDemocracyReferendumVote = {
  __typename?: 'SubstrateChainDemocracyReferendumVote';
  aye: Scalars['String'];
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  formattedAye: Scalars['String'];
  formattedNay: Scalars['String'];
  id: Scalars['String'];
  nay: Scalars['String'];
  voter: Scalars['String'];
};

export type SubstrateChainDemocracySummary = {
  __typename?: 'SubstrateChainDemocracySummary';
  activeProposals: Scalars['Int'];
  activeReferendums: Scalars['Int'];
  launchPeriod?: Maybe<SubstrateChainLaunchPeriod>;
  proposals: Scalars['String'];
  referendums: Scalars['String'];
};

export type SubstrateChainDeriveAccountRegistration = {
  __typename?: 'SubstrateChainDeriveAccountRegistration';
  display?: Maybe<Scalars['String']>;
  displayParent?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  judgements?: Maybe<Array<Maybe<SubstrateChainRegistrationJudgement>>>;
  legal?: Maybe<Scalars['String']>;
  pgp?: Maybe<Scalars['String']>;
  riot?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type SubstrateChainIdentityJudgement = {
  __typename?: 'SubstrateChainIdentityJudgement';
  isErroneous?: Maybe<Scalars['Boolean']>;
  isFeePaid?: Maybe<Scalars['Boolean']>;
  isKnownGood?: Maybe<Scalars['Boolean']>;
  isLowQuality?: Maybe<Scalars['Boolean']>;
  isOutOfDate?: Maybe<Scalars['Boolean']>;
  isReasonable?: Maybe<Scalars['Boolean']>;
  isUnknown?: Maybe<Scalars['Boolean']>;
};

export type SubstrateChainLaunchPeriod = {
  __typename?: 'SubstrateChainLaunchPeriod';
  progressPercent: Scalars['Int'];
  timeLeft: Scalars['String'];
  timeLeftParts: Array<Scalars['String']>;
};

export type SubstrateChainLease = {
  __typename?: 'SubstrateChainLease';
  blockTime: Array<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
};

export type SubstrateChainLeasePeriod = {
  __typename?: 'SubstrateChainLeasePeriod';
  currentLease: Scalars['String'];
  progressPercent: Scalars['Int'];
  remainder: Scalars['String'];
  remainderBlockTime: Scalars['String'];
  remainderParts: Array<Scalars['String']>;
  totalPeriod: Scalars['String'];
};

export type SubstrateChainModuleElection = {
  __typename?: 'SubstrateChainModuleElection';
  candidacyBond: Scalars['String'];
  formattedCandidacyBond: Scalars['String'];
  formattedVotingBondBase: Scalars['String'];
  formattedVotingBondFactor: Scalars['String'];
  hasElections: Scalars['Boolean'];
  module?: Maybe<Scalars['String']>;
  votingBondBase: Scalars['String'];
  votingBondFactor: Scalars['String'];
};

export type SubstrateChainMotionProposal = {
  __typename?: 'SubstrateChainMotionProposal';
  args: Array<SubstrateChainProposalArg>;
  beneficiary?: Maybe<SubstrateChainAccountInfo>;
  bond?: Maybe<Scalars['String']>;
  hash: Scalars['String'];
  index?: Maybe<Scalars['String']>;
  meta: Scalars['String'];
  method: Scalars['String'];
  payout?: Maybe<Scalars['String']>;
  proposer?: Maybe<SubstrateChainAccountInfo>;
  section: Scalars['String'];
};

export type SubstrateChainParachain = {
  __typename?: 'SubstrateChainParachain';
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastBackedBlock: Scalars['String'];
  lastIncludedBlock: Scalars['String'];
  lease?: Maybe<SubstrateChainLease>;
  lifecycle: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nonVoters: Array<SubstrateChainAccount>;
  validators?: Maybe<SubstrateChainValidatorsGroup>;
};

export type SubstrateChainParachainsSummary = {
  __typename?: 'SubstrateChainParachainsSummary';
  leasePeriod: SubstrateChainLeasePeriod;
  parachainsCount: Scalars['Int'];
  parathreadsCount: Scalars['Int'];
  proposalsCount: Scalars['Int'];
};

export type SubstrateChainParathread = {
  __typename?: 'SubstrateChainParathread';
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lease?: Maybe<SubstrateChainLease>;
  manager?: Maybe<SubstrateChainAccountInfo>;
  name?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposal = {
  __typename?: 'SubstrateChainProposal';
  beneficiary: SubstrateChainAccountInfo;
  bond: Scalars['String'];
  index: Scalars['String'];
  proposer: SubstrateChainAccountInfo;
  value: Scalars['String'];
};

export type SubstrateChainProposalArg = {
  __typename?: 'SubstrateChainProposalArg';
  name?: Maybe<Scalars['String']>;
  subCalls?: Maybe<Array<Maybe<SubstrateChainProposalSubCall>>>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposalSubCall = {
  __typename?: 'SubstrateChainProposalSubCall';
  args?: Maybe<Array<Maybe<SubstrateChainProposalArg>>>;
  meta?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposalVotes = {
  __typename?: 'SubstrateChainProposalVotes';
  ayes?: Maybe<Array<SubstrateChainAccountInfo>>;
  end?: Maybe<Scalars['String']>;
  endTime: Array<Scalars['String']>;
  hash: Scalars['String'];
  nays?: Maybe<Array<SubstrateChainAccountInfo>>;
  threshold?: Maybe<Scalars['Int']>;
};

export type SubstrateChainRegistrar = {
  __typename?: 'SubstrateChainRegistrar';
  account: SubstrateChainAccount;
  address: Scalars['String'];
  fee: Scalars['String'];
  formattedFee: Scalars['String'];
  /** id: Registrar index */
  id: Scalars['String'];
};

export type SubstrateChainRegistrarsSummary = {
  __typename?: 'SubstrateChainRegistrarsSummary';
  formattedHighestFee: Scalars['String'];
  formattedLowestFee: Scalars['String'];
  highestFee: Scalars['String'];
  list: Array<SubstrateChainRegistrar>;
  lowestFee: Scalars['String'];
  registrarsCount: Scalars['Int'];
};

export type SubstrateChainRegistrationJudgement = {
  __typename?: 'SubstrateChainRegistrationJudgement';
  judgement?: Maybe<SubstrateChainIdentityJudgement>;
  registrarIndex?: Maybe<Scalars['Int']>;
};

export type SubstrateChainRegistry = {
  __typename?: 'SubstrateChainRegistry';
  decimals: Scalars['Int'];
  token: Scalars['String'];
};

export type SubstrateChainSpendPeriod = {
  __typename?: 'SubstrateChainSpendPeriod';
  percentage: Scalars['Int'];
  period: Scalars['String'];
  termLeft: Scalars['String'];
  termLeftParts: Array<Scalars['String']>;
};

export type SubstrateChainTechnicalCommitteeSummary = {
  __typename?: 'SubstrateChainTechnicalCommitteeSummary';
  activeProposalCount: Scalars['Int'];
  memberCount: Scalars['Int'];
  members: Array<SubstrateChainAccountInfo>;
  totalProposalCount: Scalars['String'];
};

export type SubstrateChainTermProgress = {
  __typename?: 'SubstrateChainTermProgress';
  percentage: Scalars['Int'];
  termDuration: Scalars['String'];
  termDurationParts: Array<Scalars['String']>;
  termLeft: Scalars['String'];
  termLeftParts?: Maybe<Array<Scalars['String']>>;
};

export type SubstrateChainTip = {
  __typename?: 'SubstrateChainTip';
  closes?: Maybe<Scalars['String']>;
  closesTime?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['String'];
  deposit?: Maybe<Scalars['String']>;
  finder?: Maybe<SubstrateChainAccount>;
  formattedDeposit?: Maybe<Scalars['String']>;
  formattedMedianTipValue?: Maybe<Scalars['String']>;
  /** id: Tip Hash */
  id: Scalars['String'];
  medianTipValue?: Maybe<Scalars['String']>;
  reason: Scalars['String'];
  status: SubstrateChainTipStatus;
  tippers: Array<SubstrateChainTipper>;
  tippersCount: Scalars['Int'];
  who: SubstrateChainAccount;
};

export enum SubstrateChainTipStatus {
  Closed = 'Closed',
  Opened = 'Opened',
  Retracted = 'Retracted',
  Slashed = 'Slashed',
}

export type SubstrateChainTipper = {
  __typename?: 'SubstrateChainTipper';
  account: SubstrateChainAccount;
  balance: Scalars['String'];
  formattedBalance: Scalars['String'];
};

export enum SubstrateChainTipsOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  ClosesAsc = 'closes_ASC',
  ClosesDesc = 'closes_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DepositAsc = 'deposit_ASC',
  DepositDesc = 'deposit_DESC',
  TipValueAsc = 'tipValue_ASC',
  TipValueDesc = 'tipValue_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type SubstrateChainTreasury = {
  __typename?: 'SubstrateChainTreasury';
  approvals: Array<SubstrateChainTreasuryProposal>;
  proposals: Array<SubstrateChainTreasuryProposal>;
};

export type SubstrateChainTreasuryBalance = {
  __typename?: 'SubstrateChainTreasuryBalance';
  accountId: Scalars['String'];
  accountNonce: Scalars['String'];
  freeBalance: Scalars['String'];
  frozenFee: Scalars['String'];
  frozenMisc: Scalars['String'];
  reservedBalance: Scalars['String'];
  votingBalance: Scalars['String'];
};

export type SubstrateChainTreasuryProposal = {
  __typename?: 'SubstrateChainTreasuryProposal';
  proposal: SubstrateChainProposal;
  votes: Array<SubstrateChainProposalVotes>;
};

export type SubstrateChainTreasurySummary = {
  __typename?: 'SubstrateChainTreasurySummary';
  activeProposals: Scalars['Int'];
  approvedProposals: Scalars['Int'];
  nextBurn: Scalars['String'];
  spendPeriod: SubstrateChainSpendPeriod;
  totalProposals: Scalars['Int'];
  treasuryBalance: SubstrateChainTreasuryBalance;
};

export type SubstrateChainValidatorsGroup = {
  __typename?: 'SubstrateChainValidatorsGroup';
  groupIndex?: Maybe<Scalars['String']>;
  validators: Array<SubstrateChainAccount>;
};

export type SubstrateChainVotingStatus = {
  __typename?: 'SubstrateChainVotingStatus';
  hasFailed: Scalars['Boolean'];
  hasPassed: Scalars['Boolean'];
  isCloseable: Scalars['Boolean'];
  isVoteable: Scalars['Boolean'];
  remainingBlocks?: Maybe<Scalars['String']>;
  remainingBlocksTime?: Maybe<Array<Scalars['String']>>;
  status: Scalars['String'];
};

export type SubstrateCrowdloanContribution = {
  __typename?: 'SubstrateCrowdloanContribution';
  account: SubstrateCrowdloanContributionAccount;
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

export type SubstrateCrowdloanContributionAccount = {
  __typename?: 'SubstrateCrowdloanContributionAccount';
  crowdloanContributions: Array<SubstrateCrowdloanContribution>;
  /** address */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  /** hex address */
  rootAccount: Scalars['String'];
  totalCrowdloanContributions: Scalars['Int'];
};

export type SubstrateCrowdloanContributionAccountCrowdloanContributionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<InputMaybe<SubstrateCrowdloanContributionOrderByInput>>>;
  where?: InputMaybe<SubstrateCrowdloanContributionWhereInput>;
};

export type SubstrateCrowdloanContributionAccountEdge = {
  __typename?: 'SubstrateCrowdloanContributionAccountEdge';
  cursor: Scalars['String'];
  node: SubstrateCrowdloanContributionAccount;
};

export enum SubstrateCrowdloanContributionAccountOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  TotalCrowdloanContributionsAsc = 'totalCrowdloanContributions_ASC',
  TotalCrowdloanContributionsDesc = 'totalCrowdloanContributions_DESC',
}

export type SubstrateCrowdloanContributionAccountWhereInput = {
  AND?: InputMaybe<Array<SubstrateCrowdloanContributionAccountWhereInput>>;
  OR?: InputMaybe<Array<SubstrateCrowdloanContributionAccountWhereInput>>;
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
};

export type SubstrateCrowdloanContributionAccountWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateCrowdloanContributionAccountsConnection = {
  __typename?: 'SubstrateCrowdloanContributionAccountsConnection';
  edges: Array<SubstrateCrowdloanContributionAccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
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
  AccountRootAccountAsc = 'account_rootAccount_ASC',
  AccountRootAccountDesc = 'account_rootAccount_DESC',
  AccountTotalCrowdloanContributionsAsc = 'account_totalCrowdloanContributions_ASC',
  AccountTotalCrowdloanContributionsDesc = 'account_totalCrowdloanContributions_DESC',
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
  account?: InputMaybe<SubstrateCrowdloanContributionAccountWhereInput>;
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
  Litentry = 'litentry',
  Litmus = 'litmus',
  Phala = 'phala',
  Polkadot = 'polkadot',
}

export type SubstrateTreasuryAwarded = {
  __typename?: 'SubstrateTreasuryAwarded';
  accountBalanceAtBlock: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  depositee: SubstrateBalanceAccount;
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
};

export type SubstrateTreasuryAwardedEdge = {
  __typename?: 'SubstrateTreasuryAwardedEdge';
  cursor: Scalars['String'];
  node: SubstrateTreasuryAwarded;
};

export enum SubstrateTreasuryAwardedOrderByInput {
  AccountBalanceAtBlockAsc = 'accountBalanceAtBlock_ASC',
  AccountBalanceAtBlockDesc = 'accountBalanceAtBlock_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  DepositeeAccountAsc = 'depositee_account_ASC',
  DepositeeAccountDesc = 'depositee_account_DESC',
  DepositeeBalanceAsc = 'depositee_balance_ASC',
  DepositeeBalanceDesc = 'depositee_balance_DESC',
  DepositeeDecimalsAsc = 'depositee_decimals_ASC',
  DepositeeDecimalsDesc = 'depositee_decimals_DESC',
  DepositeeFirstTransferInBlockNumberAsc = 'depositee_firstTransferInBlockNumber_ASC',
  DepositeeFirstTransferInBlockNumberDesc = 'depositee_firstTransferInBlockNumber_DESC',
  DepositeeFirstTransferInDateAsc = 'depositee_firstTransferInDate_ASC',
  DepositeeFirstTransferInDateDesc = 'depositee_firstTransferInDate_DESC',
  DepositeeFirstTransferOutBlockNumberAsc = 'depositee_firstTransferOutBlockNumber_ASC',
  DepositeeFirstTransferOutBlockNumberDesc = 'depositee_firstTransferOutBlockNumber_DESC',
  DepositeeFirstTransferOutDateAsc = 'depositee_firstTransferOutDate_ASC',
  DepositeeFirstTransferOutDateDesc = 'depositee_firstTransferOutDate_DESC',
  DepositeeIdAsc = 'depositee_id_ASC',
  DepositeeIdDesc = 'depositee_id_DESC',
  DepositeeLastTransferInBlockNumberAsc = 'depositee_lastTransferInBlockNumber_ASC',
  DepositeeLastTransferInBlockNumberDesc = 'depositee_lastTransferInBlockNumber_DESC',
  DepositeeLastTransferInDateAsc = 'depositee_lastTransferInDate_ASC',
  DepositeeLastTransferInDateDesc = 'depositee_lastTransferInDate_DESC',
  DepositeeLastTransferOutBlockNumberAsc = 'depositee_lastTransferOutBlockNumber_ASC',
  DepositeeLastTransferOutBlockNumberDesc = 'depositee_lastTransferOutBlockNumber_DESC',
  DepositeeLastTransferOutDateAsc = 'depositee_lastTransferOutDate_ASC',
  DepositeeLastTransferOutDateDesc = 'depositee_lastTransferOutDate_DESC',
  DepositeeNetworkAsc = 'depositee_network_ASC',
  DepositeeNetworkDesc = 'depositee_network_DESC',
  DepositeeRootAccountAsc = 'depositee_rootAccount_ASC',
  DepositeeRootAccountDesc = 'depositee_rootAccount_DESC',
  DepositeeSymbolAsc = 'depositee_symbol_ASC',
  DepositeeSymbolDesc = 'depositee_symbol_DESC',
  DepositeeTotalTransfersAsc = 'depositee_totalTransfers_ASC',
  DepositeeTotalTransfersDesc = 'depositee_totalTransfers_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type SubstrateTreasuryAwardedWhereInput = {
  AND?: InputMaybe<Array<SubstrateTreasuryAwardedWhereInput>>;
  OR?: InputMaybe<Array<SubstrateTreasuryAwardedWhereInput>>;
  accountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  depositee?: InputMaybe<SubstrateBalanceAccountWhereInput>;
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
};

export type SubstrateTreasuryAwardedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateTreasuryAwardedsConnection = {
  __typename?: 'SubstrateTreasuryAwardedsConnection';
  edges: Array<SubstrateTreasuryAwardedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SubstrateTreasuryDeposit = {
  __typename?: 'SubstrateTreasuryDeposit';
  accountBalanceAtBlock: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  date: Scalars['DateTime'];
  decimals: Scalars['Int'];
  depositor: SubstrateBalanceAccount;
  /** network:block:index */
  id: Scalars['ID'];
  network: SubstrateNetwork;
  symbol: Scalars['String'];
};

export type SubstrateTreasuryDepositEdge = {
  __typename?: 'SubstrateTreasuryDepositEdge';
  cursor: Scalars['String'];
  node: SubstrateTreasuryDeposit;
};

export enum SubstrateTreasuryDepositOrderByInput {
  AccountBalanceAtBlockAsc = 'accountBalanceAtBlock_ASC',
  AccountBalanceAtBlockDesc = 'accountBalanceAtBlock_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  DepositorAccountAsc = 'depositor_account_ASC',
  DepositorAccountDesc = 'depositor_account_DESC',
  DepositorBalanceAsc = 'depositor_balance_ASC',
  DepositorBalanceDesc = 'depositor_balance_DESC',
  DepositorDecimalsAsc = 'depositor_decimals_ASC',
  DepositorDecimalsDesc = 'depositor_decimals_DESC',
  DepositorFirstTransferInBlockNumberAsc = 'depositor_firstTransferInBlockNumber_ASC',
  DepositorFirstTransferInBlockNumberDesc = 'depositor_firstTransferInBlockNumber_DESC',
  DepositorFirstTransferInDateAsc = 'depositor_firstTransferInDate_ASC',
  DepositorFirstTransferInDateDesc = 'depositor_firstTransferInDate_DESC',
  DepositorFirstTransferOutBlockNumberAsc = 'depositor_firstTransferOutBlockNumber_ASC',
  DepositorFirstTransferOutBlockNumberDesc = 'depositor_firstTransferOutBlockNumber_DESC',
  DepositorFirstTransferOutDateAsc = 'depositor_firstTransferOutDate_ASC',
  DepositorFirstTransferOutDateDesc = 'depositor_firstTransferOutDate_DESC',
  DepositorIdAsc = 'depositor_id_ASC',
  DepositorIdDesc = 'depositor_id_DESC',
  DepositorLastTransferInBlockNumberAsc = 'depositor_lastTransferInBlockNumber_ASC',
  DepositorLastTransferInBlockNumberDesc = 'depositor_lastTransferInBlockNumber_DESC',
  DepositorLastTransferInDateAsc = 'depositor_lastTransferInDate_ASC',
  DepositorLastTransferInDateDesc = 'depositor_lastTransferInDate_DESC',
  DepositorLastTransferOutBlockNumberAsc = 'depositor_lastTransferOutBlockNumber_ASC',
  DepositorLastTransferOutBlockNumberDesc = 'depositor_lastTransferOutBlockNumber_DESC',
  DepositorLastTransferOutDateAsc = 'depositor_lastTransferOutDate_ASC',
  DepositorLastTransferOutDateDesc = 'depositor_lastTransferOutDate_DESC',
  DepositorNetworkAsc = 'depositor_network_ASC',
  DepositorNetworkDesc = 'depositor_network_DESC',
  DepositorRootAccountAsc = 'depositor_rootAccount_ASC',
  DepositorRootAccountDesc = 'depositor_rootAccount_DESC',
  DepositorSymbolAsc = 'depositor_symbol_ASC',
  DepositorSymbolDesc = 'depositor_symbol_DESC',
  DepositorTotalTransfersAsc = 'depositor_totalTransfers_ASC',
  DepositorTotalTransfersDesc = 'depositor_totalTransfers_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type SubstrateTreasuryDepositWhereInput = {
  AND?: InputMaybe<Array<SubstrateTreasuryDepositWhereInput>>;
  OR?: InputMaybe<Array<SubstrateTreasuryDepositWhereInput>>;
  accountBalanceAtBlock_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accountBalanceAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_eq?: InputMaybe<Scalars['BigInt']>;
  accountBalanceAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  depositor?: InputMaybe<SubstrateBalanceAccountWhereInput>;
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
};

export type SubstrateTreasuryDepositWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SubstrateTreasuryDepositsConnection = {
  __typename?: 'SubstrateTreasuryDepositsConnection';
  edges: Array<SubstrateTreasuryDepositEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
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
