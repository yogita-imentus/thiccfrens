import React, { useEffect, useState } from 'react'
import { FaEthereum } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai";
import { FcViewDetails } from "react-icons/fc";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import bigInt from 'big-integer';

import { ToastContainer,  toast} from 'react-toastify';


import Contract from './Contract'

function Yorker(props) {
  console.log("propsssss", props)
  const navigate = useNavigate()
  require('./Yorker.css');
  const location = useLocation()
  const data = location.state
  console.log(data, "dattt")
  let finalData = []
  const [finalNFTList, setFinalNFTList] = React.useState('')

  const handleBuy = async (i, price) => {
    let buyFuction = await Contract.nftMarket.buyNFT(i, { value: price })
    // console.log(handleBuy.price,"nft buying")
    let abc=await buyFuction.wait()
    if(abc){
      toast.success("congratulation");
    }
  }

//   const difftoast=()=>
// toast.success ("congratulation");

  const newObject = async () => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let buyNft = await Contract.nftMarket.idMarketItem(i + 1)
        console.log(buyNft, "inside loop function")
        console.log(buyNft.price.toString(), "inside loop function")
        console.log(data[i].name, "inside loop")
        console.log(buyNft.tokenId.toString(),"inside ffloop")
        let newData = {
          name: data[i].name,
          image: data[i].image,
          price: buyNft.price.toString(),
          discription: data[i].discription,
          contractAddress:buyNft.nftContract,
          tokenId:buyNft.tokenId.toString(),
          status:buyNft.sold
        }
        finalData.push(newData)
      }

    }
    console.log(finalData, "hhhh")
    setFinalNFTList(finalData)

  }

  console.log(finalNFTList, "final")

  const [ename, setename] = useState()
  const[tokenId,setTokenID]=useState()
  const[contractAddress,setcontractAddress]=useState()
  // const [discription, setdiscription]= usestate()
  


  useEffect(() => {
    newObject()
  }, [])
  
   
  const TokenDetails = (e, i) => {

    // navigate('/token', { state:{e:e,index:i+1}, })
  };
  return (
    <>
      <ToastContainer/>
{}
      <div className='container-fluid mx-auto bgg'>
        <div className='row'>

          <div className='icon d-flex justify-content-between'>
            <h1> <FaEthereum size={20} /> </h1>
            <h1><AiFillHeart size={20} /></h1>
          </div>

          <div className='text-center border-0'>
            <img src="../assets/dog1.gif" className="rounded image--image " alt="..." />
            <div className='text-center carddetails'>
              < h5> Collection of Dogs Nft</h5>
            </div>

          </div>
          <div className='row mx-auto d-flex justify-content-center' >
            {/* <img src={require("../assets/background.jpg")}/> */}


            {finalNFTList && finalNFTList.map((e, i) => {
              return (
                <div className=' background col-md-3'>

                  <div class="card" style={{ maxWidth: "18.6rem", marginTop: "1.2rem" }} size={50} onClick={() => TokenDetails(e, i)}>
                    <img src={`${e.image}`} class="card-img-top  img-fluid" alt="..." />
                    <div class="card-body">
                      <div className='d-flex justify-content-between align-items-center'>
                        <h5>{e.name}</h5>
                        <h6 > <FaEthereum size={20} /> {e.price / 1000000000000000000}</h6>
                      </div>
                      <div className=' d-flex justify-content-between'>

                        <button type="button" onClick={() => {setename(e.name)
                        setTokenID(e.tokenId)  
                         setcontractAddress(e.contractAddress)
                        console.log(e,"detailonclick")
                        } } class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Details
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{ename}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <h6>Contract :  {contractAddress} </h6>
                                <h6 >Token Id : {tokenId}</h6>
                                <h6>Discription : {e.discription} </h6>
                                <h6>BlockChain :  Ethereum</h6>
                                <h6>Metadata :  Centralized</h6>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {console.log(e.status,"soldd")}
                        {
                          e.status===false?
                        <button className='btn btn-primary' onClick={() => handleBuy(i + 1, e.price)} >Buy</button>
                          :
                          <button className='btn btn-primary'disabled >Sold</button>

                        }

                      </div>
                    </div>
                  </div>
                </div>

              )
            })
            }

          </div>
        </div>
      </div>

    </>
  )
}

export default Yorker