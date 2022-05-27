import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import Contract from '../Contract';
import { ToastContainer, toast } from 'react-toastify';
import dashboard from '../Dashboard/Dashboard';
import { useNavigate } from "react-router-dom"




function Staking() {
  const [userinput, setuserinput] = useState()
  const [token, settoken] = useState()
  const [value, setValue] = React.useState('nft');
  const [loading, setloading] = useState(false)
  const [input, setinput] = useState()
  const [userid, setuserid] = React.useState()
  const [nftapprove, setnftapprove] = useState(false)
  const [totalnftstaked, settotalnftstaked] = useState()
  const [totaltokenstaked, settotaltokenstaked] = useState()

  const navigate = useNavigate()
   
const dashboard =()=>{
  navigate('/dashboard')
}



  //this function is take input from user.
  const handleChange = (event) => {
    console.log("aaaaaaa", event.target.value)
    setValue(event.target.value);

  };



  //this function ic to stake token and nft.
  const stake = async () => {
    console.log(Contract, "thiccnfft")
    setloading(true)
    try {
      if (value == 'token') {
        console.log("input", userinput)
        let stakeThicc = await Contract.staking.stakeTHICC(userinput)
        console.log(Contract, "11111")
        console.log(stakeThicc, "checkkkk")
        let abc = await stakeThicc.wait()
        setloading(false)
        if (abc) {
          toast.success("congratulation you have successfully staked");
        }
      }
      if (value == 'nft') {
        console.log("input", userinput)

        let token = await Contract.staking.stakeNFT(userinput)
        console.log(token, "121")
        let nft = await token.wait()
        setloading(false)
        if (nft) {
          toast.success("woh, you have successfully staked")
        }
      }
    } catch (error) {
      setloading(false)

      console.log("Error", error.error.message)
      if (error.error.message === 'execution reverted') {
        toast.error(error.error.message)

      }

    }
  }


  //this function is to unstake the nft and token 
  const unstake = async () => {
    setloading(true)
    console.log("callll")
    try {
      if (value === 'token') {
        let tokenstake = await Contract.staking.unstakeTHICC(userid)
        console.log(tokenstake, "unstakkkkk")
        let ustoken = await tokenstake.wait()
        setloading(false)
        if (ustoken) {
          toast.success("successfully unstaked token")
        }

      } if (value === 'nft') {
        let nftstake = await Contract.staking.unstakeNFT(userinput)
        console.log(nftstake, "unstaketoennnn")
        let usnft = await nftstake.wait()
        setloading(false)
        if (usnft) {
          toast.success("successfully unstaked NFT")
        }
      }

    } catch (error) {
      setloading(false)
      console.log(error)
    }



  }

  //take approvel from owner
  const getapprove = async () => {
    try {
      let nftapprove = await Contract.thiccnft.approve("0x781371717d4Dfea6261590Ca6f7D3B867FddfF8b", userinput)
      let abc = await nftapprove.wait()
      if (abc) {
        setnftapprove(true)
      }
      console.log(nftapprove, "apppp")
      setValue('nft')
    }

    catch (err) {
      console.log(err)
    }
  }

  const total = async () => {
    let totalnft = await Contract.staking._totalNftStake()
    console.log(totalnft, "000000")
    settotalnftstaked(totalnft.toString())
  }

  const stakedtotal = async () => {
    let totaltoken = await Contract.staking._totalThiccStake()
    console.log(totaltoken.toString(), "10101010")
    settotaltokenstaked(totaltoken.toString())
  }


  useEffect(() => {
    total()
    stakedtotal()
  }, [])


  require('./Staking.css');

  return (
    <>
      <ToastContainer />
      {
        loading ?
          <div className="spi nner-border  d-flex justify-content-center spnr " role="status" >
            <span className="visually-show">Loading...</span>
          </div>
          :
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

                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

                    <li className="nav-item mx-2 ">
                      <a class="nav-link active " aria-current="page" href="#">THICC</a>
                    </li>
                    <li className="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">SHOP</a>
                    </li>
                    <li className="nav-item">
                      <a class="nav-link active " aria-current="page"  onClick={dashboard}>Dashboard</a>
                    </li>
                  </ul>
                </div>
              </div>

            </nav>
            <div class>
              <div className='container2 md-3 '>
                <div className='row '>
                  <div className='cards shadow p-2 rounded  ' >
                    <div className='wulfz '>
                      <img src='./wolf-icon.svg' className='wolfimage'></img>
                      <div className='wolfchild text-center'>
                        <p> {totalnftstaked ? totalnftstaked : "0"} nft / {totaltokenstaked ? totaltokenstaked / 1000000000 : "0"} token</p>
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
                    <div className='wulfz'>
                      <div className='wolfchild text-center '>
                        <button className='btn btn-primary mt-4 btn-lg' > Claim</button>
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
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="thicc" value={userinput} onChange={(e) => setuserinput(e.target.value)} />
                          <select style={{ fontSize: "10px" }} value={value} onChange={handleChange}>

                            <option value="nft"  >Nft</option>
                            <option value="token">Token</option>
                          </select>
                        </div>
                      </h6>
                    </div>
                    <div className='button  gap-5 d-flex justify-content-center' value={value} onChange={handleChange}>
                      {
                        value == 'token' ?
                          <button type="button" class="btn btn-primary btn-md" onClick={stake}  >STAKE</button>
                          :
                          nftapprove === false ?
                            <div>

                              <button type="button" class="btn btn-primary btn-md" onClick={getapprove}> Approve</button>
                            </div>
                            : <button type="button" class="btn btn-primary btn-md" onClick={stake} > stake</button>
                      }
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
                        <div class="input-group">

                          <input type="text" class="form-control" placeholder="please enter id's" value={userid} onChange={(e) => setuserid(e.target.value)} />
                          <select style={{ fontSize: "10px" }}>
                            <option value="nft"  >Nft</option>
                            <option value="token">Token</option>
                          </select>
                        </div>

                      </h6>
                    </div>
                    <div className='button d-flex justify-content-center'>
                      <button type="button" class="btn btn-primary btn-md" onClick={unstake}>UNSTAKE</button>
                    </div>
                  </div>
                </div>
                <div />

              </div>
            </div>
            {/* </div> */}
          </div>
      }

    </>
  )
}
export default Staking
























