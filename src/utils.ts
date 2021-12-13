// useful for removing empty values from an array using filter
// the types after the filter would not include the empty values
export function notEmpty<TValue>(value: TValue | null | undefined | ''): value is TValue {
  return value !== null && value !== undefined && value !== '';
}
