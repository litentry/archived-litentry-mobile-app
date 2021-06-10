const baseUrl = 'polkassembly.io';

export const buildMotionDetailUrl = (id: number, network = 'polkadot') => {
  return `https://${network}.${baseUrl}/motion/${id}`;
};

export const buildAddressDetailUrl = (address: string, network = 'polkadot') => {
  return `https://polkascan.io/${network}/account/${address}`;
};
