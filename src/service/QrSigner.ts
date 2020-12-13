import type {Signer, SignerResult} from '@polkadot/api/types';
import type {SignerPayloadJSON} from '@polkadot/types/types';

export default class QrSigner implements Signer {
  readonly promise: (payload: SignerPayloadJSON) => Promise<SignerResult>;

  constructor(
    createPromise: (payload: SignerPayloadJSON) => Promise<SignerResult>,
  ) {
    this.promise = createPromise;
  }

  public async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
    return this.promise(payload);
  }
}
