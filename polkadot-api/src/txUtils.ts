import {ApiPromise} from '@polkadot/api';
import {u8aToHex, bnToBn, hexToBn, bnToHex} from '@polkadot/util';
import type {KeyringPair} from '@polkadot/keyring/types';
import type {AccountInfoWithProviders, AccountInfoWithRefCount} from '@polkadot/types/interfaces';
import type {SubmittableExtrinsic} from '@polkadot/api/submittable/types';
import type {FunctionMetadataLatest, Hash, ExtrinsicPayload} from '@polkadot/types/interfaces';
import type {SignerPayloadJSON} from '@polkadot/types/types';
import {BN_ZERO} from '@polkadot/util';
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
  try {
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
  } catch (error) {
    return Promise.reject((error as Error).message);
  }
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
  const canMakeTransaction = await hasEnoughFunds(address, api, tx);

  if (!canMakeTransaction) {
    return Promise.reject('The account does not have enough free funds available to cover the transaction fees');
  }

  tx.addSignature(address, signature, txPayload);

  return new Promise((resolve, reject) => {
    try {
      tx.send((result) => {
        if (!result || !result.status) {
          return;
        }
        if (result.status.isFinalized || result.status.isInBlock) {
          result.events
            .filter(({event: {section}}) => section === 'system')
            .forEach(({event: {method}}): void => {
              if (method === 'ExtrinsicFailed') {
                reject('ExtrinsicFailed');
              } else if (method === 'ExtrinsicSuccess') {
                resolve(result.txHash);
              }
            });
        } else if (result.isError) {
          let error;
          if (result.dispatchError?.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError(result.dispatchError.asModule);
            const {docs} = decoded;
            error = docs.join(' ').trim();
          } else {
            error = result.dispatchError?.toString();
          }
          reject(error);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function hasEnoughFunds(address: string, api: ApiPromise, tx: SubmittableExtrinsic<'promise'>) {
  const info = await tx.paymentInfo(address);
  const partialFee = info.partialFee;
  const accountInfo = await api.query.system?.account?.<AccountInfoWithProviders | AccountInfoWithRefCount>(address);

  if (!accountInfo || bnToBn(accountInfo.data.free).lt(bnToBn(partialFee))) {
    return false;
  }

  return true;
}

export async function signAndSendTx(api: ApiPromise, txConfig: TxConfig, pair: KeyringPair): Promise<Hash> {
  const tx = makeTx(api, txConfig);
  const canMakeTransaction = await hasEnoughFunds(pair.address, api, tx);

  if (!canMakeTransaction) {
    return Promise.reject('The account does not have enough free funds available to cover the transaction fees');
  }

  return new Promise((resolve, reject) => {
    try {
      tx.signAndSend(pair, (result) => {
        if (!result || !result.status) {
          return;
        }
        if (result.status.isFinalized || result.status.isInBlock) {
          result.events
            .filter(({event: {section}}) => section === 'system')
            .forEach(({event: {method}}): void => {
              if (method === 'ExtrinsicFailed') {
                reject('ExtrinsicFailed');
              } else if (method === 'ExtrinsicSuccess') {
                resolve(result.txHash);
              }
            });
        } else if (result.isError) {
          let error;
          if (result.dispatchError?.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError(result.dispatchError.asModule);
            const {docs} = decoded;
            error = docs.join(' ').trim();
          } else {
            error = result.dispatchError?.toString();
          }
          reject(error);
        }
      });
    } catch (err) {
      reject(err);
    }
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

  let transformedParams: Array<unknown> = [...params];

  if (method === 'balances.transferKeepAlive' || method === 'balances.transfer') {
    transformedParams = [params[0], hexToBn(params[1] as HexString)];
  }

  if (method === 'democracy.vote') {
    const vote = {
      Standard: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore ts cannot figure out the correct type here
        vote: params[1].vote,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        balance: hexToBn(params[1].balance),
      },
    };
    transformedParams = [params[0], vote];
  }

  if (method === 'democracy.propose') {
    transformedParams = [params[0], hexToBn(params[1])];
  }

  if (method === 'crowdloan.contribute') {
    transformedParams = [params[0], hexToBn(params[1]), params[2]];
  }

  if (method === 'bounties.proposeBounty') {
    transformedParams = [hexToBn(params[0]), params[1]];
  }

  return tx(...transformedParams);
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
