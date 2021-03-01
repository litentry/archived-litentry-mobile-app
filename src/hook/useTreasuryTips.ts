import {useContext, useEffect, useState, useMemo} from 'react';
import type {Option} from '@polkadot/types';
import type {OpenTip, OpenTipTo225} from '@polkadot/types/interfaces';
import {ChainApiContext} from 'context/ChainApiContext';
import {useCall} from 'src/hook/useCall';

type Tip = [hash: string, tip: OpenTip | OpenTipTo225];

function extractTips(
  tipsWithHashes?: [[string[]], Option<OpenTip>[]],
  inHashes?: string[] | null,
): Tip[] | undefined {
  if (!tipsWithHashes || !inHashes) {
    return undefined;
  }

  const [[hashes], optTips] = tipsWithHashes;

  return optTips
    .map((opt, index): [string, OpenTip | null] => [
      hashes[index],
      opt.unwrapOr(null),
    ])
    .filter(
      (val): val is [string, OpenTip] => inHashes.includes(val[0]) && !!val[1],
    )
    .sort((a, b) =>
      a[1].closes.isNone
        ? b[1].closes.isNone
          ? 0
          : -1
        : b[1].closes.isSome
        ? b[1].closes.unwrap().cmp(a[1].closes.unwrap())
        : 1,
    );
}

export function useTreasuryTips() {
  const [hashes, setHashes] = useState<string[]>([]);
  const {api} = useContext(ChainApiContext);

  useEffect(() => {
    api?.query.tips.tips
      .keys()
      .then((keys) => setHashes(keys.map((key) => key.args[0].toHex())))
      .catch((e) => {
        if (__DEV__) {
          console.error(e);
        }
      });
  }, [api]);

  const tipsWithHashes = useCall<[[string[]], Option<OpenTip>[]]>(
    hashes.length > 0 && (api?.query.tips || api?.query.treasury)?.tips.multi,
    [hashes],
    {withParams: true},
  );

  const tips = useMemo(() => extractTips(tipsWithHashes, hashes), [
    hashes,
    tipsWithHashes,
  ]);

  return tips || [];
}
