// useful for removing empty values from an array using filter
// the types after the filter would not include the empty values
export function notEmpty<TValue>(value: TValue | null | undefined | ''): value is TValue {
  return value !== null && value !== undefined && value !== '';
}

// Useful for the countries that use ,(comma) separation for the decimal number
// avoid two decimals in the string
export function decimalKeypad(numericValue: string): string {
  if (numericValue.length === 1 && isNaN(+numericValue)) return '0.';
  const number = numericValue.replace(',', '.');
  return number.split('.').length <= 2 ? number : number.slice(0, -1);
}

export function countUtf8Bytes(str: string): number {
  return new Blob([str]).size;
}

export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        return resolve(reader.result);
      } else {
        throw new Error('blobToBase64: failed to convert blob to base64');
      }
    };
    reader.readAsDataURL(blob);
  });
}

export function truncate(str: string, n: number): string {
  return str.length > n ? `${str.substring(0, n - 1)}...` : str;
}
