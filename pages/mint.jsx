import { IoMdAdd } from 'react-icons/io'
import { FaMinus } from 'react-icons/fa'
import Onboard from '@web3-onboard/core'
import { useState } from 'react'
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import { ethers } from 'ethers'
import Head from 'next/head'

// console.log(wallets)
const injected = injectedModule()
// initialize the module with options
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

const onboard = Onboard({
  wallets: [injected, coinbaseWalletSdk],

  chains: [
    {
      id: '0x4',
      token: 'ETH',
      label: 'Ethereum Testnet',
      rpcUrl:
        'https://eth-rinkeby.alchemyapi.io/v2/ZuK1mopfg3s8tiGABxh5Xvr-qh4Dqxaq',
    },
  ],
  apiKey: 'd20efa2a-33dc-4b64-a64d-6ed20b00c916',
  //   appMetadata:{
  //     name:'Nft Minting'
  //   },
  // appMetadata:false,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
})

const MintPage = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const connectWalletHandler = async () => {
    const wallets = await onboard.connectWallet()
    if (wallets[0]) {
      setWalletAddress(wallets[0].accounts[0].address)
    }
    console.log(wallets[0])
  }

  const handleAdd = () => {
    if (mintAmount < 5) {
      setMintAmount(++mintAmount)
    }
  }

  const handleMinus = () => {
    if (mintAmount > 1) {
      setMintAmount(--mintAmount)
    }
  }

  return (
    <div className="mintContainer h-full w-full min-h-screen">
      <Head>
        <title>Minting</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mintSection h-full w-full min-h-screen flex flex-col items-center justify-center">
          <div className="bgImg">
              <img src="https://wallpaperaccess.com/full/5361112.jpg" className='bgImgae animate-pulse' alt="..." />
          </div>
        <div className="mintCard  flex flex-col items-center justify-center mx-auto w-90">
          <h2 className="font-coiny font-bold uppercase text-brand-purple text-3xl">
            Pre-sale
          </h2>
          <p className="space-x-4 mt-5 text-brand-white text-sm p-2 shadow-sm shadow-brand-pink rounded-lg">
            {walletAddress !== null ? walletAddress : ''}
          </p>
          <div className="flex items-center justify-between mt-8">
            <div className="relative ">
              <div className="countBox font-coiny">
                <span className="text-brand-purple ">0</span> | 10000
              </div>
              <img
                className=" w-full rounded-lg h-72"
                src="https://img-s1.onedio.com/id-624ead38e37476c216b2ac6b/rev-0/w-620/f-jpg/s-ff1cf6479409c5b23a919be96e6ec3ce731faa7c.jpg"
              />
            </div>
            <div className="flex flex-col items-center w-80 counterDIv">
              <div className="flex items-center w-full justify-between">
                <button
                  className="bg-[#f0e9e9] p-2 font-bold rounded-lg outline-none"
                  onClick={handleMinus}
                >
                  <FaMinus className="font-bold text-2xl" />
                </button>
                <p className="font-coiny text-brand-purple text-2xl font-bold">
                  {mintAmount}
                </p>
                <button
                  className="bg-[#f0e9e9] p-2 font-bold rounded-lg"
                  onClick={handleAdd}
                >
                  <IoMdAdd className="font-bold text-2xl" />
                </button>
              </div>
              <p className="text-md text-brand-white font-coiny mt-5">
                Max Mint Amount: 5
              </p>
              <div className="totalPrice flex items-center font-coiny w-full py-3 mt-5 text-md border-x-0 border-y-brand-yellow border-2">
                <h3 className="w-1/3 text-brand-yellow text-xl">Total</h3>
                <div className="prices flex items-center w-2/3">
                  <p className="text-brand-yellow mx-5">0.01 ETH </p>
                  <p className="text-brand-white"> + Gas Fee</p>
                </div>
              </div>
              {walletAddress ? (
                <button
                  className="font-coiny mt-10 uppercase w-full p-4 bg-brand-pink rounded-lg bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg text-2xl text-brand-white hover:shadow-pink-400/50  hover:animate-pulse"
                  onClick={connectWalletHandler}
                >
                  Mint
                </button>
              ) : (
                <button
                  className="font-coiny mt-10 uppercase w-full p-4 bg-brand-pink rounded-lg bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg text-2xl text-brand-white hover:shadow-pink-400/50  hover:animate-pulse"
                  onClick={connectWalletHandler}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
          {/* status  */}
          <div className="rounded-lg text-start h-full border border-brand-pink w-full p-4 mt-4">
            <p className="flex flex-col space-y-2 text-brand-white text-sm break-words">
              Something went wrong
            </p>
          </div>
          {/* contract  */}
          <div className="flex flex-col items-center mt-6 ">
            <h1 className="font-coiny text-3xl font-bold text-brand-pink">
              Contract address
            </h1>
            <p className="text-brand-white mt-2 text-sm">
              0x94FC1035713F7a2DAae589EA3F7a4494650240f7
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintPage
