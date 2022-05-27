import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { Web3Provider } from "@ethersproject/providers";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <BrowserRouter>
  <Web3ReactProvider getLibrary={getLibrary}>
  <React.StrictMode>
    <App />
    <Web3ReactProvider/>
  </React.StrictMode>
  </Web3ReactProvider>
  </BrowserRouter>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();






// document.addEventListener("DOMContentLoaded", () => {
//   const web3 = new web3(window.ethereum)

//   document.getElementById("load_button").addEventListener("click", async () => {
//     const contract = new web3.eth.Contract(SpacePunksTokenABI, "0x2b39275025fA05dDd39Ec0AD391d5ce53a0cb276")
//     const walletAddress = document.getElementById("wallet_address").value
//     contract.defaultAccount = walletAddress
//      const spacePunksBalance = await contract.methods.balanceOf(walletAddress).call()
    
//     document.getElementById("nfts").innerHTML = ""

//     for(let i = 0; i < spacePunksBalance; i++) {
//       const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()

//       let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()

//       if (tokenMetadataURI.startsWith("ipfs://")) {
//         tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
//       }

//       const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())

//       const spacePunkTokenElement = document.getElementById("nft_template").content.cloneNode(true)
//       spacePunkTokenElement.querySelector("h1").innerText = tokenMetadata["name"]
//       spacePunkTokenElement.querySelector("a").href = `https://opensea.io/assets/0x45db714f24f5a313569c41683047f1d49e78ba07/${tokenId}`
//       spacePunkTokenElement.querySelector("img").src = tokenMetadata["image"]
//       spacePunkTokenElement.querySelector("img").alt = tokenMetadata["description"]

//       document.getElementById("nfts").append(spacePunkTokenElement)
//     }
//   })
// })