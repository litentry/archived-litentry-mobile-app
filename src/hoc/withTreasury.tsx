import React, {useMemo, useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import BN from 'bn.js';
import type {DeriveTreasuryProposals, DeriveBalancesAccount} from '@polkadot/api-derive/types';
import {Balance, BlockNumber} from '@polkadot/types/interfaces';
import {useCall} from 'src/hook/useCall';
import {TREASURY_ACCOUNT} from 'src/constants';
import {AugmentedConst} from '@polkadot/api/types';

export type InjectedPropTypes = {
  treasuryInfo: {
    bestNumber?: Balance;
    totalProposals?: BN;
    treasuryBalance?: DeriveBalancesAccount;
    spendPeriod?: BlockNumber & AugmentedConst<'promise'>;
    value?: Balance | null;
    info?: DeriveTreasuryProposals;
    burn?: BN | null;
  };
};

const PM_DIV = new BN(1000000);

function withTreasury<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const {api} = useContext(ChainApiContext);

    const info = useCall<DeriveTreasuryProposals>(api?.derive.treasury.proposals);
    const bestNumber = useCall<Balance>(api?.derive.chain.bestNumber);
    const totalProposals = useCall<BN>(api?.query.treasury.proposalCount);
    const treasuryBalance = useCall<DeriveBalancesAccount>(api?.derive.balances.account, [TREASURY_ACCOUNT]);
    const spendPeriod = api?.consts.treasury.spendPeriod;

    const value = treasuryBalance?.freeBalance.gtn(0) ? treasuryBalance.freeBalance : null;
    const burn =
      treasuryBalance?.freeBalance.gtn(0) && !api?.consts.treasury.burn.isZero()
        ? api?.consts.treasury.burn.mul(treasuryBalance?.freeBalance).div(PM_DIV)
        : null;

    const treasuryInfo = useMemo(
      () => ({
        bestNumber,
        totalProposals,
        treasuryBalance,
        spendPeriod,
        value,
        info,
        burn,
      }),
      [bestNumber, totalProposals, treasuryBalance, spendPeriod, value, burn, info],
    );

    return <Comp {...props} treasuryInfo={treasuryInfo} />;
  };
}

export default withTreasury;
