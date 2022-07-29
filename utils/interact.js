import contract from "../contracts/PakoNFT.json";
import Web3 from "web3";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const contractAddress = "0x485708c5940df07f930Bd020C8B868D9402f2c67";
const contractAbi = contract.abi;

// const web3 = new Web3(
//   "https://eth-rinkeby.alchemyapi.io/v2/ZuK1mopfg3s8tiGABxh5Xvr-qh4Dqxaq"
// );
const web3 = new Web3(Web3.givenProvider);
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

export const preSaleMintFunc = async (addrs, mintAmount) => {
  if (!window.ethereum.isConnected()) {
    return {
      success: false,
      status: "Please Connect your wallet",
    };
  }
  // console.log(addrs);
  let leaf = keccak256(addrs);
  let proof = tree.getHexProof(leaf);
  let isValid = tree.verify(proof, leaf, root);
  if (!isValid) {
    return {
      success: false,
      status: "Invalid : You are not in whitelist!",
    };
  }
  const nounce = await web3.eth.getTransactionCount(addrs, "latest");
  const tx = {
    from: addrs,
    to: contractAddress,
    nounce: nounce.toString(16),
    gas: String(300000 * mintAmount),
    value: web3.utils.toWei(String(0.01 * mintAmount), "ether"),
    data: contractOject.methods.mint(addrs, mintAmount, proof).encodeABI(),
  };
  // console.log(tx);

  // contractOject.methods
  //   .mint(addrs, mintAmount, proof)
  //   .send(tx)
  //   .then((res) => {
  //     // console.log(res);
  //     return {
  //       success: true,
  //       status: (
  //         <a
  //           href={`https://rinkeby.etherscan.io/tx/${res.transactionHash}`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <p>Check your Transaction on Etherscan : </p>
  //           <p>{`https://rinkeby.etherscan.io/tx/${res.transactionHash}`}</p>
  //         </a>
  //       ),
  //     };
  //   })
  //   .catch((err) => {
  //     console.log(err.message)
  //     return {
  //       success: false,
  //       status: err.message,
  //     };
  //   });
  let ttransactionHash;

  try {
    const txHash = await contractOject.methods
      .mint(addrs, mintAmount, proof)
      .send(tx);
    console.log(txHash);
    ttransactionHash = await txHash;
    return {
      success: true,
      status: (
        <a
          href={`https://rinkeby.etherscan.io/tx/${txHash.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check your Transaction on Etherscan : 
          {` https://rinkeby.etherscan.io/tx/${txHash.transactionHash}`}
        </a>
      ),
    };
    // console.log(txHash)
  } catch (err) {
    console.log(err);
    return {
      success: false,
      status: (
        <a
          href={`https://rinkeby.etherscan.io/address/0x485708c5940df07f930Bd020C8B868D9402f2c67`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Transaction is failed chech it on Etherscan :
          {` https://rinkeby.etherscan.io/address/0x485708c5940df07f930Bd020C8B868D9402f2c67`}
        </a>
      ),
    };
  }
};
