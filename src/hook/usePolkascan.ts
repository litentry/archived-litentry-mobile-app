import * as _ from 'lodash';

interface ResponseType {
  success: boolean;
  data: any | Error;
}

function usePolkascan(network: string = 'polkadot') {
  const baseUrl = `https://explorer-31.polkascan.io/${network}/api/v1`;
  const get = (url: string): Promise<ResponseType> =>
    fetch(`${baseUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    })
      .then((data) => data.json())
      .then((json) => ({success: true, data: json}))
      .catch((error) => ({success: false, data: error}));

  return {get};
}

export type MotionSummaryPSType = {
  proposalId: number;
  motionHash: string;
  status: string;
  proposerAddress: string;
};

export const mapMotion = (raw: ResponseType): MotionSummaryPSType => {
  const proposalId = _.get(
    raw,
    'data.data.attributes.proposal_id',
    0,
  ) as number;
  const motionHash = _.get(
    raw,
    'data.data.attributes.motion_hash',
    '',
  ) as string;
  const status = _.get(raw, 'data.data.attributes.status', '') as string;
  const proposerAddress = _.get(
    raw,
    'data.data.attributes.account.attributes.address',
    '',
  ) as string;

  return {
    proposalId,
    motionHash,
    status,
    proposerAddress,
  };
};

export default usePolkascan;
