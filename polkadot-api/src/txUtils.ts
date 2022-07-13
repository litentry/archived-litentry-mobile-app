import {ApiPromise} from '@polkadot/api';
import {u8aToHex} from '@polkadot/util';
import type {KeyringPair} from '@polkadot/keyring/types';

import type {SubmittableExtrinsic, SignerOptions} from '@polkadot/api/submittable/types';
import type {
  FunctionMetadataLatest,
  Hash,
  ExtrinsicEra,
  Index,
  Header,
  ExtrinsicPayload,
} from '@polkadot/types/interfaces';
import type {SignerPayloadJSON, SignatureOptions} from '@polkadot/types/types';
import type {Registry} from '@polkadot/types-codec/types';
import {BN_ZERO, assert, isNumber, isUndefined, objectSpread} from '@polkadot/util';
import type {TxConfig} from './txTypes';
import {HexString, TxPayload, TxPayloadData} from './messages';
import AsyncSigner from './AsyncSigner';

export type TxInfo = {
  title: string;
  description: string;
  partialFee: number;
  blockHash: string;
};

export async function getTxInfo(api: ApiPromise, address: string, txConfig: TxConfig): Promise<TxInfo> {
  const tx = makeTx(api, txConfig);
  const {meta} = tx.registry.findMetaCall(tx.callIndex);
  const args = meta?.args.map(({name}) => name).join(', ') || '';
  const title = `transaction ${txConfig.method}(${args})`;
  const description = formatCallMeta(meta);
  const info = await tx.paymentInfo(address);
  const partialFee = info.partialFee.toNumber();
  const {txPayload} = await getTxPayload(api, address, txConfig);

  return {
    title,
    description,
    partialFee,
    blockHash: txPayload.blockHash,
  };
}

export async function getTxPayload(api: ApiPromise, address: string, txConfig: TxConfig): Promise<TxPayloadData> {
  const tx = makeTx(api, txConfig);
  const txPayload = await new Promise<TxPayload>((resolve) => {
    tx.signAsync(address, {
      nonce: -1,
      tip: BN_ZERO,
      signer: new AsyncSigner(async (txPayload) => {
        resolve(txPayload);
        // This is not used, it is just to implement the interface
        return Promise.resolve({id: 1, signature: '0x'});
      }),
    });
  });

  const signablePayload = makeSignablePayload(api, txPayload);

  return {txPayload, signablePayload};
}

export function makeSignablePayload(api: ApiPromise, txPayload: SignerPayloadJSON): HexString {
  const extrinsicPayload: ExtrinsicPayload = api.registry.createType('ExtrinsicPayload', txPayload);

  return u8aToHex(extrinsicPayload.toU8a());
}

export async function sendTx(
  api: ApiPromise,
  address: string,
  txConfig: TxConfig,
  txPayload: SignerPayloadJSON,
  signature: HexString,
): Promise<Hash> {
  const tx = makeTx(api, txConfig);
  tx.addSignature(address, signature, txPayload);

  return new Promise((resolve, reject) => {
    tx.send((result) => {
      if (result.isFinalized && !result.isError) {
        resolve(result.txHash);
      }
      if (result.isError && result.dispatchError) {
        let error;
        if (result.dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(result.dispatchError.asModule);
          const {docs} = decoded;
          error = docs.join(' ').trim();
        } else {
          error = result.dispatchError.toString();
        }
        reject(error);
      }
    });
  });
}

export async function signAndSendTx(api: ApiPromise, txConfig: TxConfig, pair: KeyringPair): Promise<Hash> {
  const tx = makeTx(api, txConfig);

  return new Promise((resolve, reject) => {
    tx.signAndSend(pair, (result) => {
      if (result.isFinalized && !result.isError) {
        resolve(result.txHash);
      }
      if (result.isError && result.dispatchError) {
        let error;
        if (result.dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(result.dispatchError.asModule);
          const {docs} = decoded;
          error = docs.join(' ').trim();
        } else {
          error = result.dispatchError.toString();
        }
        reject(error);
      }
    });
  });
}

export function getTxMethodArgsLength(api: ApiPromise, method: TxConfig['method']) {
  const [section, txMethod] = method.split('.');

  if (!section || !txMethod) {
    throw new Error(`Invalid method ${section}.${txMethod}`);
  }

  return api.tx[section]?.[txMethod]?.meta.args.length ?? 0;
}

function makeTx(api: ApiPromise, txConfig: TxConfig): SubmittableExtrinsic<'promise'> {
  const {method, params} = txConfig;
  const [section, txMethod] = method.split('.');

  if (!section || !txMethod) {
    throw new Error(`Invalid method ${section}.${txMethod}`);
  }

  const tx = api.tx[section]?.[txMethod];

  if (typeof tx !== 'function') {
    throw new Error(`Unable to find method ${section}.${txMethod}`);
  }

  return tx(...params);
}

function formatCallMeta(meta?: FunctionMetadataLatest): string {
  if (!meta || !meta.docs.length) {
    return '';
  }

  const strings = meta.docs.map((doc) => doc.toString().trim());
  const firstEmpty = strings.findIndex((doc) => !doc.length);
  const combined = (firstEmpty === -1 ? strings : strings.slice(0, firstEmpty))
    .join(' ')
    .replace(/#(<weight>| <weight>).*<\/weight>/, '');
  const parts = splitParts(combined.replace(/\\/g, '').replace(/`/g, ''));

  return parts.join(' ');
}

function splitParts(value: string): string[] {
  return ['[', ']'].reduce((result: string[], sep) => splitSingle(result, sep), [value]);
}

function splitSingle(value: string[], sep: string): string[] {
  return value.reduce((result: string[], _value: string): string[] => {
    return _value.split(sep).reduce((_result: string[], __value: string) => _result.concat(__value), result);
  }, []);
}

function makeEraOptions(
  api: ApiPromise,
  registry: Registry,
  partialOptions: Partial<SignerOptions>,
  {header, mortalLength, nonce}: {header: Header | null; mortalLength: number; nonce: Index},
): SignatureOptions {
  if (!header) {
    assert(
      partialOptions.era === 0 || !isUndefined(partialOptions.blockHash),
      'Expected blockHash to be passed alongside non-immortal era options',
    );

    if (isNumber(partialOptions.era)) {
      // since we have no header, it is immortal, remove any option overrides
      // so we only supply the genesisHash and no era to the construction
      delete partialOptions.era;
      delete partialOptions.blockHash;
    }

    return makeSignOptions(api, partialOptions, {nonce});
  }

  return makeSignOptions(api, partialOptions, {
    blockHash: header.hash,
    era: registry.createTypeUnsafe<ExtrinsicEra>('ExtrinsicEra', [
      {
        current: header.number,
        period: partialOptions.era || mortalLength,
      },
    ]),
    nonce,
  });
}

function makeSignOptions(
  api: ApiPromise,
  partialOptions: Partial<SignerOptions>,
  extras: {blockHash?: Hash; era?: ExtrinsicEra; nonce?: Index},
): SignatureOptions {
  return objectSpread({blockHash: api.genesisHash, genesisHash: api.genesisHash}, partialOptions, extras, {
    runtimeVersion: api.runtimeVersion,
    signedExtensions: api.registry.signedExtensions,
    version: api.extrinsicVersion,
  });
}
