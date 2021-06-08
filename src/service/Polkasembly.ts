const baseUrl = 'polkassembly.io';

export const buildMotionDetailUrl = (id: number, network: string = 'polkadot') => {
  return `https://${network}.${baseUrl}/motion/${id}`;
};

export const buildAddressDetailUrl = (address: string, network: string = 'polkadot') => {
  return `https://polkascan.io/${network}/account/${address}`;
};
