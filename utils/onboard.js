import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWalletModule from '@web3-onboard/coinbase'


// initialize the module with options
const injected = injectedModule()
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

export const onboard = Onboard({
  wallets: [injected, coinbaseWalletSdk],

  chains: [
    {
      id: '0x4',
      token: 'ETH',
      label: 'Ethereum Testnet',
      rpcUrl:
        'https://eth-rinkeby.alchemyapi.io/v2/nxLydgMbErS-W_UK0u7BX85A05q6kU4F',
    },
  ],
  apiKey: 'd20efa2a-33dc-4b64-a64d-6ed20b00c916',
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
})
