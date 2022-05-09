import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'


function Staking() {
  const [bcd, setbcd] = useState(0);
  useEffect(() => {

    return () => {

    }
  }, [bcd])

  const abc = () => {
    let ab = Math.random();
    setbcd(ab)
    console.log("abc", ab)
  }
  require('./Staking.css');

  return (
    <div className='container1  '>
      <nav className="navbar navbar-expand-md navbar-dark navbarnavbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img className="logo" ></img>
          </a>
          <div className=' mx-1'>
            <a href='#'> <img src="./opensea-icon.webp" height="50" width="50" className='mx-2' /></a>
            <a href='#'> <img src="./discord-icon.png" height="50" width="50" className='mx-2' /></a>
            <a href='#'> <img src="./twitter-icon.png" height="50" width="50" className='mx-2' /></a>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <div className='navlist' > */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="nav-item mx-2 ">
                <a class="nav-link active " aria-current="page" href="#">THICC</a>
              </li>
              <li className="nav-item">
                <a class="nav-link active" aria-current="page" href="#">SHOP</a>
              </li>
              <li className="nav-item">
                <a class="nav-link active " aria-current="page" href="#">NFT</a>
              </li>



            </ul>
            {/* </div> */}



          </div>
        </div>
        {/* <div className="border-2px"></div> */}
      </nav>

      <div className='container2 md-3 '>
        <div className='row '>
          <div className='cards shadow p-2 rounded  ' >
            <div className='wulfz '>
              <img src='./wolf-icon.svg' className='wolfimage'></img>
              <div className='wolfchild text-center'>
                <p> 0 </p> <p>Staked</p>
              </div>


            </div>
            <div className='wulfz'>
              <img src='./cash-icon.svg' className='wolfimage'></img>
              <div className='wolfchild text-center'>
                <p> 0 / day</p> <p>Yield</p>
              </div>


            </div>
            <div className='wulfz'>
              <img src='./baoxiang-icon.svg' className='wolfimage'></img>
              <div className='wolfchild text-center'>
                <p> 0 </p> <p>Balance</p>
              </div>
            </div>

            <div className='wulfz'>
              <img src='./clock-icon.svg' className='wolfimage '></img>
              <div className='wolfchild text-center'>
                <p> 0 </p> <p>Pending</p>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div className='row  border border-warning'>
        <div className='col-md-6 col-xs-12 p-3  me-3 stk'>
          <div className='card stakingcard  text-center    '>
            <p className='stakingheader'>STAKING</p>
            <div className='icons'><div><img src='./wolf-icon.svg'></img>
              <div><p>Thicc Nft : 0</p>
                <p>Available</p>
              </div>
            </div>
              <div>
                <img src='./Awoo-icon.svg'></img>
                <div>
                  <p>$Thicc : 0</p>
                  <p>Per staked</p></div>
              </div>
            </div>
            <div class='input ' >
              <h6>Thicc Nft To Stake
                <input type="text" class="form-control" placeholder="thicc" />
              </h6>
            </div>
            <div className='stakingbutton'>

              <button type="button" class="btn btn-primary btn-md" >STAKE</button>
              {/* <button type="button" class="btn btn-light btn-md">MAX</button> */}
            </div>
          </div>
        </div>

        <div className=' p-3 me-3 stk'>
          <div className='card stakingcard  text-center   unstakecard '>
            <p className='stakingheader'>UNSTAKING</p>

            <div className='icons'><div><img src='./wolf-icon.svg'></img>
              <div><p>Thicc Nft : 0</p>
                <p>Available</p>
              </div>
            </div>
              <div>
                <img src='./Awoo-icon.svg'></img>
                <div><p>$Thicc : 0</p>
                  <p>Per staked</p>
                </div>
              </div>
            </div>
            <div class='input  ' >
              <h6>Thicc Nft To Unstake
                <input type="text" class="form-control" placeholder="thicc" />
              </h6>
            </div>
            <div className='stakingbutton'>
              <button type="button" class="btn btn-primary btn-md" >UNSTAKE</button>
              {/* <button type="button" class="btn btn-light btn-md">MAX</button> */}
            </div>
          </div>
        </div>
        <div />

      </div>
      {/* </div> */}
    </div>
  )
}
export default Staking
























