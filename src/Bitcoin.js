import React from 'react'
import { FaEthereum } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai";


function Bitcoin() {
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
        {/* <div className='col-md-12'> */}

          <div className='icon'>
            <h1> <FaEthereum size={20} /> </h1>
            <h1><AiFillHeart size={20} /></h1>
          </div>

          <div className='card'>
            <img src="../assets/bitcoin1.jpg" className="rounded mx-auto d-block" alt="..." />
            <div className='text-center'>
              The Dog Nft collection be Owner name
            </div>
          </div>
        {/* </div> */}







          <div className='row'>
            <div className='col-md-4'>
              <div className="card" style={{maxWidth:"18.6rem"}} size={50}>
                <img src="../assets/bitcoin1.jpg" className="card-img-top  img-fluid" alt="..." onClick={Bitcoin} />
                <div className="card-body">
                  <p className="card-text">Dog</p>
                </div>
              </div>
            </div>


            <div className='col-md-4'>
              <div class="card" style={{maxWidth:"18.6rem"}} size={50}>
                <img src="../assets/bitcoin2.jpg" class="card-img-top  img-fluid" alt="..." />
                <div class="card-body">
                  <p class="card-text">Bitcoin</p>

                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div class="card" style={{maxWidth:"18.6rem"}} size={50}>
                <img src="../assets/bitcoin3.jpg" class="card-img-top  img-fluid" alt="..." />
                <div class="card-body">
                  <p class="card-text">Bitcoin</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
            <div className='col-md-4'>
              <div className="card" style={{maxWidth:"18.6rem"}} size={50}>
                <img src="../assets/bitcoin4.jpg" className="card-img-top  img-fluid" alt="..."  />
                <div className="card-body">
                  <p className="card-text">Bitcoin</p>
                </div>
              </div>
            </div>


            <div className='col-md-4'>
              <div class="card" style={{maxWidth:"18.6rem"}} size={50}>
                <img src="../assets/bitcoin1.jpg" class="card-img-top  img-fluid" alt="..." />
                <div class="card-body">
                  <p class="card-text">Bitcoin</p>

                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div class="card" style={{maxWidth:"18.6rem"}} size={50}>
                <img src="../assets/bitcoin1.jpg" class="card-img-top  img-fluid" alt="..." />
                <div class="card-body">
                  <p class="card-text">Bitcoin</p>

                </div>
              </div>
            </div>
          </div>
      </>
  )
}

export default Bitcoin