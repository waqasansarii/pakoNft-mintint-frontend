import contract from "../contracts/PakoNFT.json";
import Web3 from "web3";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const contractAddress = "0xC85Ada7E69174E9474e154A3fB684e41A22c9749";
const contractAbi = contract.abi;

const web3 = new Web3(
  "https://eth-rinkeby.alchemyapi.io/v2/ZuK1mopfg3s8tiGABxh5Xvr-qh4Dqxaq"
);
const contractOject = new web3.eth.Contract(contractAbi, contractAddress);

// calculate merkle root from whitelist array
const listAddresses = [
  "0x383ec8EFb4EAA1f62DF1A39B83CD2854D2ad2244",
  "0x94FC1035713F7a2DAae589EA3F7a4494650240f7",
];

const leaves = listAddresses.map((addr) => keccak256(addr));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot();

export const getBlockchainData = async () => {
  let totalSupply = await contractOject.methods.totalSupply().call();
  let maxSupply = await contractOject.methods.maxSupply().call();
  return { totalSupply, maxSupply };
};

export const isPublicSaleState = async () => {
  let publicMintStatus = await contractOject.methods.publicMint().call();
  return publicMintStatus;
};

export const isPreSaleState = async () => {
  let preSaleStatus = await contractOject.methods.preSaleMint().call();
  return preSaleStatus;
};

export const isPausedState = async () => {
  let pause = await contractOject.methods._paused().call();
  return pause;
};
