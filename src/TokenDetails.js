import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEthereum } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { ImPriceTags } from "react-icons/im";
import { useLocation } from 'react-router-dom';
import bigInt from 'big-integer';
// import './TokenDetails.css'
import Contract from './Contract'

import './Demo.css'

function TokenDetails() {
  require('./TokenDetails.css');
  const [open, setOpen] = useState(false)
  const [toggle, settoggle] = useState(false)
  const location = useLocation()
  const data = location.state.e
  const indexId=location.state.index
  console.log(indexId,"In nft details", data);
  const toggleState = () => {
    setOpen(true)
  }

// const handleBuy=async()=>{
//   let ethe = bigInt(2 * 10 ** 18);
//   console.log(ethe.value)
//   let buyNft=await Contract.nftMarket.buyNFT(indexId,{value:ethe.value})
//   console.log(buyNft,"nft buying")
// }

  
  return (
    <>
      <div className='container-fluid bg-light'>
        <div className='row'>
          <div className="col-md-4" style={{ border: "1px " }}>
            <div class='icon d-flex justify-content-between'>
              <h1> <FaEthereum size={25} /> </h1>
              <h1><AiFillHeart size={25} /></h1>
            </div>

            <div className='card'>
              <img src={`${data.image}`} class="card-img-top  img-fluid" alt="..." />
            </div>
            <div className='card'>
              <div className='card'>
                <h5 className='dropdown' onClick={() => settoggle(!toggle)}>Details

                </h5>
              </div>
              {toggle === true ?

                <div>
                  <p> contaract address  - </p>
                  <p> Token Details  - </p>
                  <p> Mata data  - </p>
                  <p> Token Standerd - </p>
                  <p> Blockchain  - </p>
                </div> : ''}

              <div className='card'>
                <h5 className='dropdown'>Discrption </h5>

                <p> {data.description}

                </p>

              </div>
            </div>

          </div>

          <div className='col-md-8' style={{ border: "1px " }}>
            <h1>{data.name}</h1>
            <br></br>
            {/* <p class='price text-center'>Owned by - owener name</p> */}
            <div className='card'>

              <div className='card'>
                <h5 class='price'>sales End</h5>
                <div className='card'>
                  <div className='d-flex justify-content-around'>
                    <div className='d-flex'> Hour</div>
                    <div className='d-flex'>Minute</div>
                    <        div className='d-flex'>second</div>
                  </div>


                </div>
              </div>
              <br></br>
              <div className='card'>

                <h5 class='price'> current price</h5>
                <h6 > <FaEthereum size={20} />1.5 </h6>

              </div>
              <br></br>
              <div className='btn_containers d-flex justify-content-evenly'>
                <button class='btn btn-primary btn-lg'>Buy Now</button>
                <button class='btn btn-primary btn-lg'>Make Offer</button>
              </div>
            </div>
            <br></br>
            <div className='card'>
              <h5 className='dropdown'><ImStatsDots /> price history
                <ul className='dropdown-content'>
                  {/* <li>contract Address</li>
                                <li>token id</li>
                                <li>blockchain</li> */}
                </ul>
              </h5>

            </div>
            <br></br>
            <div className='card'>
              <h5 className='dropdown'> <ImPriceTags /> Listing
                <ul className='dropdown-content'>
                  {/* <li>contract Address</li>
                                <li>token id</li>
                                <li>blockchain</li> */}
                </ul>
              </h5>

            </div>
            <br></br>
            <div className='card'>
              <h5 className='dropdown'>  Offer
                <ul className='dropdown-content'>
                  {/* <li>contract Address</li>
                                <li>token id</li>
                                <li>blockchain</li> */}
                </ul>
              </h5>

            </div>

          </div>
        </div>
      </div>
    </>


  )
}
export default TokenDetails;