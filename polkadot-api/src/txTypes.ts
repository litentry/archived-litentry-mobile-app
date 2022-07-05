type SetIdentityTx = {
  method: 'identity.setIdentity';
  params: [
    {
      display?: string;
      legal?: string;
      email?: string;
      riot?: string;
      twitter?: string;
      web?: string;
    },
  ];
};

type RequestJudgementTx = {
  method: 'identity.requestJudgement';
  params: [id: string, fee: string];
};

type ClearIdentityTx = {
  method: 'identity.clearIdentity';
  params: [];
};

export type TxConfig = SetIdentityTx | RequestJudgementTx | ClearIdentityTx;
