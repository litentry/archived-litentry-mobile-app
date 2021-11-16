import {SignerOptions, SubmittableExtrinsic} from '@polkadot/api/submittable/types';
import {Compact} from '@polkadot/types';
import {BlockNumber, SignerPayload, Index} from '@polkadot/types/interfaces';
import {ApiPromise} from '@polkadot/api';
import {get} from 'lodash';

export const getPayload = async (
  api: ApiPromise,
  address: string,
  blocks: number | undefined,
  nonce: number | undefined | Index,
  [tx, ...params]: unknown[],
) => {
  const [section, method] = (tx as string).split('.');

  if (!section || !method) {
    throw new Error('Section or Method missing');
  }

  if (!get(api.tx, [section, method])) {
    throw new Error(`Unable to find method ${section}.${method}`);
  }

  if (!blocks && blocks !== 0) {
    blocks = 50;
  }

  if (!nonce && nonce !== 0) {
    nonce = (await api.derive.balances.account(address)).accountNonce;
  }

  let options: SignerOptions;
  let blockNumber: Compact<BlockNumber> | number | null = null;

  if (blocks === 0) {
    options = {
      blockHash: api.genesisHash,
      era: 0,
      nonce,
    };
    blockNumber = 0;
  } else {
    // Get current block if we want to modify the number of blocks we have to sign
    const signedBlock = await api.rpc.chain.getBlock();

    options = {
      blockHash: signedBlock.block.header.hash,
      era: api.createType('ExtrinsicEra', {
        current: signedBlock.block.header.number,
        period: blocks,
      }),
      nonce,
    };
    blockNumber = signedBlock.block.header.number;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const transaction: SubmittableExtrinsic<'promise'> = api.tx[section]![method]!(...params);

  const payload: SignerPayload = api.createType('SignerPayload', {
    genesisHash: api.genesisHash,
    runtimeVersion: api.runtimeVersion,
    version: api.extrinsicVersion,
    ...options,
    address: address,
    blockNumber,
    method: transaction.method,
  });

  // const signature = await getSignature(payload.toRaw().data);

  // transaction.addSignature(address, signature, payload.toPayload());
  return {payload, transaction};
};
