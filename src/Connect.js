import React from 'react'
import Contract from './Contract'
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

  function Connect() {
    require('./Connect.css');

    const CoinbaseWallet = new WalletLinkConnector({
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      appName: "Web3-react Demo",
      supportedChainIds: [1, 3, 4, 5, 42],
     });
     
     const WalletConnect = new WalletConnectConnector({
      rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
     });
     
     const Injected = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42]
     });

     const { activate, deactivate } = useWeb3React();
    
    const walletConnect =  () => {
      // alert("I got called");
      console.log("called",window)
      try{
      if (window) {
              window.ethereum
                .request({ method: "eth_requestAccounts" })
                .catch((err) => {
                  if (err.code === 4001) {
                    console.log("Please connect to MetaMask.");
                  } else {
                    console.error(err);
                  }
                });
            }
          }
          catch(err){
            console.log(err)
          }
  }
    



  return (
      <div className='container-xxl '>
    <div className='card' style={{border:'1px'}}>

          <h4 className='text-center'>Connect your wallet.</h4>
          
          <h6 className='text-center'>
              Connect with one of our available wallet providers or create a new one.
         </h6>
         
         <div class=' card wallet d-grid gap-2 col-6 mx-auto '>
        <button className='btn btn-primary' onClick={() => { activate(CoinbaseWallet) }}>coinbase wallat</button>
        <button className='btn btn-primary' onClick={() => { activate(Injected) }}>MetaMask</button>
        <button className='btn btn-primary' onClick={() => { activate( WalletConnect) }}>Wallet Connect</button>

        </div>
    </div>
    </div>
  )
}
export default Connect;