import SubstrateSign from 'react-native-substrate-sign';

// Creates a QR code for the UTF-8 representation of a string
export function qrCode(data: string): Promise<string> {
  return SubstrateSign.qrCode(data);
}

// Creates a QR code for binary data from a hex-encoded string
export function qrCodeHex(data: string): Promise<string> {
  return SubstrateSign.qrCodeHex(data);
}
