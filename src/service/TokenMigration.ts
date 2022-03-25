/* eslint-disable @typescript-eslint/no-var-requires */
import Web3 from 'web3';
import * as ethers from 'ethers';
import {decodeAddress} from '@polkadot/util-crypto';
import BigNumber from 'bignumber.js';

const ERC20 = require('../../abi/ERC20.json');
const BRIDGE = require('../../abi/Bridge.json');

const ERC20_HANDLER_ADDRESS = '0x50272B13eFbb3dA7C25cf5b98339efBd19A2a855';
const ERC20_LIT_TOKEN_CONTRACT_ADDRESS = '0x27B981dd46ae0BFDDA6677DDc75BCE6995fCA5bc';
const TOTAL_LIT_SUPPLY = 10000000;
const DEPOSIT_CONTRACT_ADDRESS = '0xf1008b8741D4C00Eae7630Fb639F38Aade9d5588';
const DEPOSIT_DESTINATION_CHAIN_ID = 1;
const DEPOSIT_RESOURCE_ID = '0x00000000000000000000000000000063a7e2be78898ba83824b0c0cc8dfb6001';

interface Ok {
  ok: string;
}
interface Err {
  error: string;
}
type Result = Ok | Err;

export async function approveForMigration(address: string, wallet: Web3): Promise<Result> {
  try {
    const contract = new wallet.eth.Contract(ERC20.abi, ERC20_LIT_TOKEN_CONTRACT_ADDRESS, {from: address});
    const result = await contract.methods.approve(ERC20_HANDLER_ADDRESS, amountToErc20Number(TOTAL_LIT_SUPPLY)).send();
    console.log('ApproveForMigration result', result);

    return {ok: 'success'};
  } catch (error) {
    return {error: (error as Error).message};
  }
}

export async function depositForMigration(
  address: string,
  amount: number,
  recipientAddress: string,
  wallet: Web3,
): Promise<Result> {
  const contract = new wallet.eth.Contract(BRIDGE.abi, DEPOSIT_CONTRACT_ADDRESS, {
    from: address,
  });

  const recipientHex = Buffer.from(decodeAddress(recipientAddress)).toString('hex');

  const data = hexifyData(amount, recipientHex);
  console.log('DATA FOR MIGRATION:', data);

  try {
    const tx = await contract.methods.deposit(DEPOSIT_DESTINATION_CHAIN_ID, DEPOSIT_RESOURCE_ID, data).send();

    return {ok: tx.transactionHash};
  } catch (error) {
    return {error: (error as Error).message};
  }
}

export async function getEthereumBalance(address: string, wallet: Web3) {
  try {
    const balance = await wallet.eth.getBalance(address);

    return bigNumberFromErc20Number(balance);
  } catch (e) {
    console.error(e);

    return new BigNumber(0);
  }
}

export async function getLitentryBalance(address: string, wallet: Web3) {
  try {
    const contract = new wallet.eth.Contract(ERC20.abi, ERC20_LIT_TOKEN_CONTRACT_ADDRESS);
    const balance = await contract.methods.balanceOf(address).call();

    return bigNumberFromErc20Number(balance);
  } catch (e) {
    console.error(e);

    return new BigNumber(0);
  }
}

export async function getTokenMigrationAllowance(address: string, wallet: Web3) {
  try {
    const contract = new wallet.eth.Contract(ERC20.abi, ERC20_LIT_TOKEN_CONTRACT_ADDRESS, {
      from: address,
    });
    const allowance: string = await contract.methods.allowance(address, ERC20_HANDLER_ADDRESS).call();

    return bigNumberFromErc20Number(allowance);
  } catch (e) {
    console.error(e);

    return new BigNumber(0);
  }
}

function amountToErc20Number(amount: number) {
  const amountFormattedWithDecimals = ethers.utils.parseEther(String(amount));

  return ethers.BigNumber.from(amountFormattedWithDecimals.toString());
}

export function bigNumberFromErc20Number(amount: string | number) {
  return new BigNumber(ethers.utils.formatEther(ethers.BigNumber.from(amount)));
}

function hexifyData(amount: number, recipient: string) {
  const paddedAmountHex = ethers.utils.hexZeroPad(ethers.utils.parseEther(String(amount)).toHexString(), 32);
  const paddedRecipientLength = ethers.utils.hexZeroPad(ethers.utils.hexlify(recipient.length / 2), 32).substring(2);

  return paddedAmountHex + paddedRecipientLength + recipient;
}
