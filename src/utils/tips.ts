import {OpenTipTo225, AccountId} from '@polkadot/types/interfaces';
import type {PalletTipsOpenTip} from '@polkadot/types/lookup';
import {BN_ZERO} from '@polkadot/util';

function isCurrentTip(tip: PalletTipsOpenTip | OpenTipTo225): tip is PalletTipsOpenTip {
  return !!(tip as PalletTipsOpenTip)?.findersFee;
}

export function extractTipState(tip: PalletTipsOpenTip | OpenTipTo225, allAccounts: string[]) {
  const closesAt = tip.closes?.unwrapOr(null);
  let finder: AccountId | null = null;
  let deposit = null;

  if (isCurrentTip(tip)) {
    finder = tip.finder;
    deposit = tip.deposit;
  } else if (tip.finder.isSome) {
    const finderInfo = tip.finder.unwrap();

    finder = finderInfo[0];
    deposit = finderInfo[1];
  }

  const values = tip.tips.map(([, value]) => value).sort((a, b) => a.cmp(b));
  const midIndex = Math.floor(values.length / 2);
  const median = values.length
    ? values.length % 2
      ? values[midIndex]
      : values[midIndex - 1]?.add(values[midIndex] || BN_ZERO).divn(2)
    : BN_ZERO;

  return {
    closesAt,
    deposit,
    finder,
    isFinder: !!finder && allAccounts.includes(finder.toString()),
    isTipped: !!values.length,
    isTipper: tip.tips.some(([address]) => allAccounts.includes(address.toString())),
    median,
  };
}
