import Reactotron from 'reactotron-react-native';
import {FunctionMetadataLatest} from '@polkadot/types/interfaces';

export const ReactotronDebug = Reactotron.debug;

export const WHITESPACE = [' ', '\t'];

export function validateFormField(
  hasValue: boolean,
  value: string | null | undefined,
  minLength: number,
  includes: string[],
  excludes: string[],
  starting: string[],
  notStarting: string[] = WHITESPACE,
  notEnding: string[] = WHITESPACE,
): boolean {
  return (
    !hasValue ||
    (!!value &&
      value.length >= minLength &&
      includes.reduce((hasIncludes: boolean, check) => hasIncludes && value.includes(check), true) &&
      (!starting.length || starting.some((check) => value.startsWith(check))) &&
      !excludes.some((check) => value.includes(check)) &&
      !notStarting.some((check) => value.startsWith(check)) &&
      !notEnding.some((check) => value.endsWith(check)))
  );
}

// useful for removing empty values from an array using filter
// the types after the filter would not include the empty values
export function notEmpty<TValue>(value: TValue | null | undefined | ''): value is TValue {
  return value !== null && value !== undefined && value !== '';
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

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
