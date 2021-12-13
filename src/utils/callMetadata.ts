import {FunctionMetadataLatest} from '@polkadot/types/interfaces';

/**
 * functions below help extract useful data
 * from each motion object. they are mostly loosely copied from
 * https://github.com/polkadot-js/apps/blob/master/packages/react-components/src/Call.tsx
 */

export function formatCallMeta(meta?: FunctionMetadataLatest): string {
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

function splitSingle(value: string[], sep: string): string[] {
  return value.reduce((result: string[], _value: string): string[] => {
    return _value.split(sep).reduce((_result: string[], __value: string) => _result.concat(__value), result);
  }, []);
}

function splitParts(value: string): string[] {
  return ['[', ']'].reduce((result: string[], sep) => splitSingle(result, sep), [value]);
}
