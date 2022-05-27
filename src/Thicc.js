import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Contract from './Contract'
import Bitcoin from './Bitcoin'
import Yorker from './Yorker'
import ClickCounter from './ClickCounter'
import Collection from './View/Collection';
import ViewCollection from './View/ViewCollection';
import Connect from './Connect'


import Web3 from 'web3'

function Thicc(props) {

  const [allNft, setAllNft] = useState([]);
  const Walletconnect = async () => {
    // window.ethereum.request({ method: 'eth_requestAccounts' });
    // getNft()

  }






  const [mintToken, setMinToken] = useState()

  // const Mint = () => {
  //     console.log(mintToken,"jjjjkkkk")
  //     // navigate('/Mint', { state:{mintToken:Mintedtoken} })
  // }



  const mintedToken = async () => {
    try {
      let minted = await Contract.web.getUserTokenIds()
      console.log(minted, "mmmmmmm")
      if (minted) {
        setMinToken(minted.toString())
        navigate('/viewcollection', { state: { mintToken: minted.toString() } })

      }
    }
    catch (error) {

    }
  }



  const getNft = async () => {
    let allNfts = []
    console.log("test", Contract)
    let web3 = new Web3(window.ethereum)
    console.log("web3", web3)
    // web3 = new Web3(web3.setProvider(web3.currentProvider));
    let address = await web3.eth.getAccounts();
    console.log("address", address[0]);

    const NftBalance = await Contract.web.mint(address[0], 1)
    console.log("NftBalanceuser", NftBalance)
    try {
      for (let i = 1; i <= 15; i++) {
        let abc = await Contract.web.mint(address[0], i)
        console.log("abcccc", abc)
        let tokenMetadataURI = await Contract.web.uri(i)

        console.log("tokenMetadataUri", tokenMetadataURI)

        if (tokenMetadataURI.startsWith("ipfs://")) {

          console.log([i])

          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
          console.log("checkkkk", tokenMetadataURI)
        }

        const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())
        console.log("tokenMetadata", tokenMetadata)
        allNfts.push(tokenMetadata)

      }
    } catch (error) {

    }


    setAllNft(allNfts)
  }

  useEffect(() => {
    console.log("allnft", allNft)
    // Walletconnect()
  }, [allNft])
  useEffect(() => {
    Walletconnect()
    return () => {
    }
  }, [])


  const navigate = useNavigate()

  require('./thicc.css');

  const Navigate = () => {
    navigate('/connect')
  };

  const Token = () => {
    navigate('/token')
  };
  const Dog = () => {
    navigate('/dog')
  };
  const Mint = () => {
    navigate('/mint')
  };
  const Bitcoin = () => {
    navigate('/bitcoin')
  };
  const Staking = () => {
    navigate('/Staking')
  };

  const ClickCounter = () => {
    navigate('/counterclick')
  }

    ;
  const Connect = () => {
    navigate('/connect')
  }

    ;

  const Collection = () => {
    navigate('/collection')
  }
  const Yorker = (e) => {
    console.log("eeee", e)
    console.log("call yorker")
    navigate('/yorker', { state: e })
  }





  let showNft = [
    {
      "name": 'dog',
      "img": 'dog1.gif'
    },
    {
      "name": 'yorker',
      "img": 'yorker.gif'
    },
    {
      "name": 'cat',
      "img": 'cat.jpeg'
    }
  ]


  return (
    <>
      <>
        <nav class="navbar navbar-expand-lg navbar-light ">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

              <img src="../assets/Thicc+Frens+Logo.png" width={500} height={100} href="#" />
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
                <li class="nav-item">
                  <a class="nav-link " aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <Link to='/connect' className='nav-link'>Create</Link>
                </li>
                <li class="nav-item">
                  <Link to='/staking' className='nav-link'>Staking</Link>
                </li>
                <li class="nav-item">
                  <Link to='/counterclick' className='nav-link'>Mint</Link>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Explore
                  </a>
                  <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">All-Nft</a></li>
                    <li><a class="dropdown-item" href="#" >Your Collection</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Domain-Name</a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Resources
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Help Center</a></li>
                    <li><a class="dropdown-item" href="#">Platform Status</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Gas-Free MarketPlace</a></li>
                  </ul>
                </li>
              </ul>
              <button class="btn btn-outline-success" type="submit" onClick={Connect} >Connect</button>

            </div>
          </div>
        </nav>


        <div className='container-fluid mainSection m-0 p-0' >
          <div className='row'>
            <div className='col-md-8'>
              <div class='header'>
                <div class='thought'>
                  <h1> Discover, collect, and sell extraordinary NFTs</h1>
                  <button className='btn btn-primary' onClick={mintedToken}> Your Collection</button>
                </div>
              </div>
            </div>
{/* 
            <section class="col-md-4">

              <div class="countdown card ">
                <div className='card border-none m-2 dhms'>
                  <h5 className="d-flex justifyt-content-center m-3 ">Pre-Sale minting Countdown</h5>
                </ div>
                <div className='card dhms'>
                  <div className=" d-flex justify-content-evenly border-2 m-3">
                    <button> Days 20</button>
                    <button> Hours 20</button>
                    <button> minut 20</button>
                    <button> sec 20</button>
                  </div>

                  <br></br>

                  <h6 id="mainHeading" className=' ndcs'>NFT Drop Coming Soon!!</h6>
                  <button className='btn btn-primary m-3' > Get whitelisted</button>


                </div>
              </div>
            </section> */}

          </div>
        </div>



      </>
    </>
  )

}
export default Thicc;