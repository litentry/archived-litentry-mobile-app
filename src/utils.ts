// useful for removing empty values from an array using filter
// the types after the filter would not include the empty values
export function notEmpty<TValue>(value: TValue | null | undefined | ''): value is TValue {
  return value !== null && value !== undefined && value !== '';
}

// Useful for the countries that use ,(comma) seperation for the decimal number
// avoid two decimals in the string
export function decimalKeypad(numericValue: string): string {
  if (!isNaN(+numericValue)) {
    return numericValue.replace(',', '.').replace(/[^(\d+).(\d+)]/g, '');
  } else {
    if (numericValue.length === 1) return '0.';
    return numericValue
      .replace(',', '.')
      .replace(/[^(\d+).(\d+)]/g, '')
      .slice(0, -1);
  }
}
