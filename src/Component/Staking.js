import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import Contract from '../Contract';
import { ToastContainer, toast } from 'react-toastify';
import dashboard from '../Dashboard/Dashboard';
import { useNavigate } from "react-router-dom"
import Web3 from 'web3';
import { kMaxLength } from 'buffer';





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
  const [showbalance, setshowbalance] = useState()
  const [walletaddress, setwalletaddress] = useState()
  const [getids, setgetids] = useState([])
  const [NftStake, setNftStake] = useState("TOKEN")
  const [alldata, setalldata] = useState({
    url: '',
    id: ''
  })

  const navigate = useNavigate()

  const dashboard = () => {
    navigate('/dashboard')
  }



  //this function is take input from user.
  const handleChange = (event) => {
    console.log("aaaaaaa", event.target.value)
    setValue(event.target.value);


  };


  const handlSelect = (event) => {
    console.log("seelect option", event.target.value)
    // settype(event.target.value);
  }



  //this function ic to stake token and nft.
  const stake = async (val) => {
    console.log("in Stake function val", val)
    setloading(true)
    console.log("in Stake function val -1")
    let approve = await Contract.thiccnft.approve("0x9Bc9d4382772b80eBB1Bf3565F222bF4635AEFc9", val)
    let abc = await approve.wait()
    console.log("in Stake function val -2")

    if (abc) {
      setnftapprove(true)
    }
    console.log("in Stake function val -3")

    let nftstake = await Contract.staking.stakeNFT(val, 0)
    console.log(nftstake, "stttttttt")
    let nft = await nftstake.wait()
    setloading(false)
    if (nft) {
      toast.success("woh, you have successfully staked")
    }

    // setloading(true)
    // try {
    //   if (value == 'token') {
    //     console.log("input", userinput)
    //     let stakeThicc = await Contract.staking.stakeTHICC(userinput)
    //     console.log(Contract, "11111")
    //     console.log(stakeThicc, "checkkkk")
    //     let abc = await stakeThicc.wait()
    //     setloading(false)
    //     if (abc) {
    //       toast.success("congratulation you have successfully staked");

    //     }
    //   }
    //   if (value == 'nft') {
    //     console.log("input", userinput)
    //     let nftapprove = await Contract.thiccnft.approve("0x9Bc9d4382772b80eBB1Bf3565F222bF4635AEFc9", userinput)
    //     let abc = await nftapprove.wait()
    //     if (abc) {
    //       setnftapprove(true)
    //     }

    //     let token = await Contract.staking.stakeNFT(userinput, 0)
    //     console.log(token, "121")
    //     let nft = await token.wait()
    //     setloading(false)
    //     if (nft) {
    //       toast.success("woh, you have successfully staked")
    //     }
    //   }
    // } catch (error) {
    //   setloading(false)

    //   console.log("Error", error.error.message)
    //   if (error.error.message === 'execution reverted') {
    //     toast.error(error.error.message)

    //   }

    // }
  }


  //this function is to unstake the nft and token 
  const unstake = async () => {
    setloading(true)
    console.log("callll")
    try {
      if (value == 'token') {
        let tokenstake = await Contract.staking.unstakeTHICC(userid)
        console.log(tokenstake, "unstakkkkk")
        let ustoken = await tokenstake.wait()
        setloading(false)
        if (ustoken) {
          toast.success("successfully unstaked token")
        }

      } if (value == 'nft') {
        let nftstake = await Contract.staking.unstakeNFT(userid, 0)
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
  // const getapprove = async () => {
  //   try {
  //     let nftapprove = await Contract.thiccnft.approve("0x9Bc9d4382772b80eBB1Bf3565F222bF4635AEFc9", userinput)
  //     let abc = await nftapprove.wait()
  //     if (abc) {
  //       setnftapprove(true)
  //     }
  //     console.log(nftapprove, "apppp")
  //     setValue('nft')
  //   }

  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  const total = async () => {
    let totalnft = await Contract.staking._totalNftStake()
    // console.log(totalnft, "000000")
    settotalnftstaked(totalnft.toString())
  }

  const stakedtotal = async () => {
    let totaltoken = await Contract.staking._totalThiccStake()
    console.log(totaltoken.toString(), "10101010")
    settotaltokenstaked(totaltoken.toString())
  }

  const balance = async () => {
    let totalbalance = await Contract.staking.ContractThiccBalance()
    console.log(totalbalance.toString() / 1000000000, "bllllllnc")
    setshowbalance(totalbalance.toString() / 1000000000)
  }

  // const gettokenid = async () => {
  //   console.log("gettokenid")
  //   console.log(ids, "idsssssss")
  //   setgetids(ids)
  // }




  const getaddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("accccc---11-1--1",accounts)
    const account = accounts[0];
    setwalletaddress(account)
    if(account){
  renderTokensForOwner(account);

    }
  }


  // const getNftData = async () => {
  //   console.log("getnftdata")
  //   let url = [];
  //   let id = [];
  //   let ids = await Contract.thiccnft.getUserTokenIds()
  //   console.log("Id ssssss", ids);
  //   if (ids) {

  //     for (let i = 0; i < ids.length; i++) {
  //       if (ids[i].toString() !== ',') {
  //         const response = await fetch(`https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&owner=0xbBA8732Ee7c9e61Bc05Af01006785d0d6cd2471e&order_direction=asc&include_orders=false${ids[i].toString()}`)
  //         console.log("seturl", response.url.toString())
  //         url.push(response.url)
  //         id.push(ids[i].toString())
  //       }
  //     }
  //     setalldata({ url: url, id: id });
  //   }
  // }

  const options = {method: 'GET'};
  const renderTokensForOwner = (ownerAddress) => {
     console.log("renderTokensForOwner")
     let url = [];
      let id = [];
    let abc;
    fetch(`https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=200&owner=${ownerAddress}&order_direction=asc&include_orders=false`, options)
    .then(response => response.json())
    .then(response => {
      
    abc=response;
      console.log("res",response.assets)

      for (let i = 0; i < response.assets.length; i++) {
        // console.log("i",i)
  console.log(i, response.assets[i].asset_contract.address,"original addd")
  console.log('0xfeB546f284C008008f2a79113f960F73B2f7685d',"fake addd")

  console.log((response.assets[i].asset_contract.address) =='0xfeb546f284c008008f2a79113f960f73b2f7685d',"12345678987654567898766")
  let test1 =response.assets[i].asset_contract.address;
  let ab=test1.toString()
  if(response.assets[i].asset_contract.address=='0xfeb546f284c008008f2a79113f960f73b2f7685d'){
    console.log("assets",response.assets[i].image_original_url);
    console.log("assets",response.assets[i].token_id);
    url.push(response.assets[i].image_original_url)
    id.push(response.assets[i].token_id)

  }

      }
      console.log(url,"urlllllllll----------")
      setalldata({ url: url, id: id });
      // console.log("check",response.assets.map((e)=>{
        
      // }))
    })


  }



  useEffect(() => {
    total()
    stakedtotal()
    balance()
    getaddress()
    // getNftData()


  }, [])


  require('./Staking.css');
  const showNftStake = (val) => {
    console.log("gettt", val)
    if (val === 'NFT') {
      setNftStake('NFT')
    }
    if (val === 'TOKEN') {
      setNftStake("TOKEN")
    }
  }

  return (
    <>
      {console.log("alldata", alldata)}
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

                    <a class="nav-link active " aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Reward
                    </a>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <select style={{ fontSize: "20px" }} value={value} onChange={handleChange}>

                              <option  >nft</option>
                              <option >thicc</option>
                            </select>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">

                            <div class="input-group">

                              <input type="text" class="form-control" placeholder="please enter id's" value={userid} onChange={(e) => setuserid(e.target.value)} />
                              <select style={{ fontSize: "25px" }}>
                                <option >7days</option>
                                <option >15days</option>
                              </select>
                            </div>


                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Show</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <li className="nav-item">
                      <a class="nav-link active " aria-current="page" onClick={dashboard}>Dashboard</a>
                    </li>
                  </ul>
                </div>
              </div>

            </nav>
            <div class>
              <div className=''>

                <div class="flip-container " ontouchstart="this.classList.toggle('hover');">
                  <div class="flipper">
                    <div class="front">
                      {/* <!-- front content --> */}
                      <div className='container2 md-3 '>
                        <div className='row '>
                          <div className='cards shadow p-2 rounded  ' >
                            <div className='wulfz '>
                              <img src='./wolf-icon.svg' className='wolfimage'></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-4'> {totalnftstaked ? totalnftstaked : "0"} / 5555 Staked</p>
                              </div>


                            </div>
                            <div className='wulfz'>
                              <img src='./cash-icon.svg' className='wolfimage'></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-3'> 1000 / day </p>
                                {/* <br/> */}
                                <p>Yield</p>
                              </div>


                            </div>
                            <div className='wulfz'>
                              <img src='./baoxiang-icon.svg' className='wolfimage'></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-3'> {showbalance ? showbalance : "0"} Balance</p>
                              </div>
                            </div>

                            <div className='wulfz'>
                              <img src='./clock-icon.svg' className='wolfimage ' alt="ddata"></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-3'> 500 </p>
                                {/* <br/> */}
                                <p>Pending</p>
                              </div>
                            </div>
                            <div className='wulfz'>
                              <div className='wolfchild text-center '>
                                {/* <button className='btn btn-primary mt-4 btn-lg' > </button> */}
                                <select className='mt-4' style={{ size: '500', backgroundColor: 'white' }}>
                                  <option>Thicc Frens</option>
                                  <option>Thicc Dogs</option>
                                  <p>{walletaddress}</p>

                                </select>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="back">
                      {/* <!-- back content -->/ */}
                      <div className='container2 md-3 '>
                        <div className='row '>
                          <div className='cards shadow p-2 rounded  ' >
                            <div className='wulfz '>
                              <img src='./wolf-icon.svg' className='wolfimage'></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-4'> {totaltokenstaked ? totaltokenstaked / 1000000000 : "0"} Staked</p>
                              </div>


                            </div>
                            <div className='wulfz'>
                              <img src='./cash-icon.svg' className='wolfimage'></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-3'> 1000 / day </p>
                                {/* <br/> */}
                                <p>Yield</p>
                              </div>


                            </div>
                            <div className='wulfz'>
                              <img src='./baoxiang-icon.svg' className='wolfimage'></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-3'> {showbalance ? showbalance : "0"} Balance</p>
                              </div>
                            </div>

                            <div className='wulfz'>
                              <img src='./clock-icon.svg' className='wolfimage '></img>
                              <div className='wolfchild text-center'>
                                <p className='mt-3'> 500 </p>
                                {/* <br/> */}
                                <p>Panding</p>
                              </div>
                            </div>
                            <div className='wulfz'>
                              <div className='wolfchild text-center '>
                                {/* <button className='btn btn-primary mt-4 btn-lg' > </button> */}
                                <select className='mt-4' style={{ size: '500', backgroundColor: 'white' }}>
                                  <option>Thicc Frens</option>
                                  <option>Thicc Dogs</option>

                                </select>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>


              {/* 
              <div className='card' style={{ size: '50%' }}>

                <div className='row m-3 '>
                  <div className='col-md-3  p-3 md-3 stk'>
                    <div className='card stakingcard  text-center    '>
                      <p className='stakingheader mt-3 ' style={{ backgroundColor: '' }}>STAKING</p>
                      <br />

                      <div className=' row d-flex justify-content-center align-items-center gap-2 '>
                        <div className=' card col-md-3 border ' type="shownft" onClick={() => showNftStake("NFT")} > NFT</div>
                        <div className=' card col-md-3 border' type="showthicc" onClick={() => showNftStake("TOKEN")}> TOKEN</div>
                      </div>
                      <br />
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
                      {

                      }
                      {
                        NftStake === 'NFT' ?
                        <div className=' row'>
                        {console.log("testttttttt---", alldata)}
                        {alldata.url.length > 0 ?
          
                          alldata.url.map((e, i) => {
                            return (
          
                              <div className=" col-sm-3 card home d-flex justify-content-center align-items-center " style={{ maxWidth: "10.6rem", marginTop: "1.2rem",  marginLeft:"2rem" ,maxHeight:"10rem"}}>
                                <img src={e} class="card-img-top  img-fluid pt-4" alt="..." />
                                <div className='button  gap-5 d-flex justify-content-center' >
                                  <button type="button" class="btn btn-primary btn-md" style={{ maxHeight:"2rem"}} onClick={() => stake(alldata.id[i])}  >STAKE</button>
                                </div>
                              </div>
                            )
                          }) : "not found"
                        }
                      </div>
          
                          : 
                          <>

                            <div class='input ' >
                              

                              <h6 className=''>Thicc Token To stake
                                <div class="input-group ">
                                  <input type="text" class="form-control" placeholder="thicc-inu=404" value={userinput} onChange={(e) => setuserinput(e.target.value)} >
                                  </input>
                                 
                                </div>
                              </h6>
                            </div>
                            <div className='button  gap-5 d-flex justify-content-center' value={value} onChange={handleChange}>
                        <button type="button" class="btn btn-primary btn-md" onClick={stake}  >STAKE</button>
                      </div>
                            </>




                      }
                      
                    </div>
                  </div>

                  <div className='col-md-3 p-3  stk'>
                    <div className='card stakingcard  text-center   unstakecard '>
                      <p className='stakingheader mt-3'>UNSTAKING</p>
                      <br />


                      <div className=' row d-flex justify-content-center align-items-center gap-2'>
                        <div className=' card col-md-3 border '> NFT</div>
                        <div className=' card col-md-3 border'> TOKEN</div>
                      </div>
                      <br />

                      <div className='icons'>
                      <div>
                      <img src='./wolf-icon.svg'></img>
                        <div>
                        <p>Thicc Nft : 0</p>
                          <p>Available</p>
                        </div>
                      </div>
                        </div>
                          <img src='./Awoo-icon.svg'></img>
                          <div><p>$Thicc : 0</p>
                            <p>Per staked</p>
                          </div>
                        </div>
                      </div>
                      <div class='input  ' >
                        <h6>Thicc Nft To Unstake
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="thicc" value={userid} onChange={(e) => setuserid(e.target.value)} />


                            <select style={{ fontSize: "20px" }} value={value} onChange={handleChange}>

                              <option value="nft"  >Nft</option>
                              <option value="token">Thicc</option>
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
              </div> */}
              <div className='container'>
                <h2 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> Thicc Frens Genesis </h2>
                <div className='card'>


                  <div className=' row'>
                    {console.log("testttttttt---", alldata)}
                    {alldata.url.length > 0 ?

                      alldata.url.map((e, i) => {
                        console.log(alldata.url,"immmmggggggg")
                        return (

                          <div className=" col-sm-3 card home d-flex justify-content-center align-items-center " style={{ maxWidth: "18.6rem", marginTop: "1.2rem", marginLeft: "4rem", maxHeight: "15rem" }}>
                            <img src={e} class="card-img-top  img-fluid pt-4"  alt="..." />
                            <div className='button gap-2 d-flex justify-content-around' >
                              <button type="button" class="btn btn-primary " style={{ maxHeight:"1.8rem", fontSize:"10px"}} onClick={() => stake(alldata.id[i])}  >STAKE</button>
                              <button type="button" class="btn btn-primary " style={{ maxHeight:"1.8rem", fontSize:"10px"}} onClick={unstake}>UNSTAKE</button>

                            </div>
                          </div>
                        )
                      }) : "not found"
                    }

                  </div>
                </div>
                <div className='container mt-3'>
                  <div className='row'>
                    <h2 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> MY TOKENS</h2>
                    <div className='row mt-3'>

                      <div className='col-md-6'>
                        <div className='card'>
                          <h4 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> STAKING</h4>
                          <div className='icons'>
                            <div>
                              <img src='./wolf-icon.svg'></img>
                              <div>
                                <p>Thicc Nft : 0</p>
                                <p>Available</p>
                              </div>
                            </div>
                            <div>
                            <img src='./Awoo-icon.svg'></img>
                              <div>
                              <p>$Thicc : 0</p>
                            <p>Per staked</p>
                              </div>
                            </div>

                          </div>

                          <div class='input  d-flex justify-content-center align-items-center mt-2' >
                        <h6>Thicc Nft To stake
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="thicc" value={userid} onChange={(e) => setuserid(e.target.value)} />
                            
                          </div>

                        </h6>
                      </div>

                      <div className='button  gap-5 d-flex justify-content-center' value={value} onChange={handleChange}>
                        <button type="button" class="btn btn-primary btn-md mt-2" onClick={stake}  >STAKE</button>
                      </div>


                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='card'>
                          <h4 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> UNSTAKING</h4>

                          <div className='icons'>
                            <div>
                              <img src='./wolf-icon.svg'></img>
                              <div>
                                <p>Thicc Nft : 0</p>
                                <p>Available</p>
                              </div>
                            </div>
                            <div>
                            <img src='./Awoo-icon.svg'></img>
                              <div>
                              <p>$Thicc : 0</p>
                            <p>Per staked</p>
                              </div>
                            </div>

                          </div>
                          <div class='input d-flex justify-content-center align-items-center mt-2' >
                        <h6>Thicc Nft To Unstake
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="thicc" value={userid} onChange={(e) => setuserid(e.target.value)} />

                          </div>

                        </h6>
                      </div>

                      <div className='button d-flex justify-content-center'>
                        <button type="button" class="btn btn-primary btn-md mt-2" onClick={unstake}>UNSTAKE</button>
                      </div>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>


          </div>
      }
      )
    </>
  )
}

export default Staking
























