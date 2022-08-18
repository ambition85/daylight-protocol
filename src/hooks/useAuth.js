import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { toast } from "react-toastify";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { connectorsByName } from '../utils/web3React'
import { setupNetwork } from '../utils/web3React'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    async (connectorID) => {
      console.log("Login")
      const connectorOrGetConnector = connectorsByName[connectorID]
      const connector =
        typeof connectorOrGetConnector !== 'function' ? connectorsByName[connectorID] : await connectorOrGetConnector()
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            } else
              toast('Please switch network to Binance Smart Chain mainnet')

          } else {
            console.log("Else Error")
            window.localStorage.removeItem("walletconnect")
            if (error instanceof NoEthereumProviderError) {
              toast('Provider Error', 'No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector
                walletConnector.walletConnectProvider = null
              }
              toast('Authorization Error', 'Please authorize to access your account')
            } else {
              toast(error.name, error.message)
            }
          }
        })
      } else {
        toast('Unable to find connector', 'The connector config is wrong')
      }
    },
    [activate],
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate])

  return { login, logout }
}

export default useAuth
