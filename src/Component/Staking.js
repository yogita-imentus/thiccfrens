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
  const [userBalance, setuserBalance] = useState()
  const [alldata, setalldata] = useState({
    url: '',
    id: ''
  })
  const [nftData, setnftData] = useState({
    url: '',
    id: ''
  })
  const [num, setnum] = useState()
  const [num1, setnum1] = useState()
  const [num2, setnum2] = useState()
  const [Rarity, setRarity] = useState({
    rarityValue:'',
    id:''
  })





  const navigate = useNavigate()

  const dashboard = () => {
    navigate('/dashboard')
  }




  //this function is for reward
  const Reward = () => {
    console.log(Rarity, "shooowwwwwwww")
    console.log(Rarity.rarityValue,"1234567890")

    for (let i = 0; i < Rarity.rarityValue.length; i++) {
    setnum(1 * [i] )
      
      
    }
  }
  const secondReward = () => {
    for (let i = 0; i < Rarity.rarityValue.length; i++)
   { setnum1(2.5 *[i] )}
  }
  const thirdReward = () => {
    for (let i = 0; i < Rarity.rarityValue.length; i++)
    {
      console.log(Rarity.rarityValue)
      setnum2(7 * [i])}
  }

  const setMax = () => {
setuserBalance()
  }


  //this function is take input from user.
  const handleChange = (event) => {
    console.log("aaaaaaa", event.target.value)
    setValue(event.target.value);


  };


  const handleSelect = (event) => {
    console.log(event.target.value, "handleselectllll....")
    // setnum(event.target.value)
  }


  //this function ic to stake token and nft.
  const stake = async (val) => {
    console.log("in Stake function val", val)
    setloading(true)
    console.log("in Stake function val -1")
    let approve = await Contract.thiccnft.approve("0x25502b0D73D303f010F6D7f244925cbC3ff6e34a", val)
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
    getNftData()
  }

  const stakeThicc = async () => {
    console.log("input", userinput)

    let tokenstake = await Contract.staking.stakeTHICC(userinput)
    setloading(false)
    if (tokenstake) {
      toast.success("successfully staked TOKEN")
    }
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


  // this function is to unstake the nft and token 
  // const unstake = async () => {
  //   setloading(true)
  //   console.log("callll")
  //   try {
  //      {
  //       let tokenstake = await Contract.staking.unstakeTHICC(userid)
  //       console.log(tokenstake, "unstakkkkk")
  //       let ustoken = await tokenstake.wait()
  //       setloading(false)
  //       if (ustoken) {
  //         toast.success("successfully unstaked token")
  //       }

  //     }  {
  //       let nftstake = await Contract.staking.unstakeNFT(userid, 0)
  //       console.log(nftstake, "unstaketoennnn")
  //       let usnft = await nftstake.wait()
  //       setloading(false)
  //       if (usnft) {
  //         toast.success("successfully unstaked NFT")
  //       }
  //     }

  //   } catch (error) {
  //     setloading(false)
  //     console.log(error)
  //   }



  // }


  //NEW funtion for unstaked
  const unstakeNft = async (val) => {
    setloading(true)
    let nftunstake = await Contract.staking.unstakeNFT(val, 0)
    let unstaking = await nftunstake.wait()
    setloading(false)
    if (unstaking) {
      toast.success("successfully unstaked Nft")
    }
    // renderTokensForOwner()
    stake()
  }

  const unstakedToken = async () => {
    let tokenunstaked = await Contract.staking.unstakeTHICC(userid)
    let unstakingtoken = await tokenunstaked.wait()
    setloading(false)
    if (unstakingtoken) {
      toast.success("successfully unstaked TOKEN")

    }
  }



  //this function is for getting nft details
  // take approvel from owner
  // const getapprove = async () => {
  //   try {
  //     let nftapprove = await Contract.thiccnft.approve("0x9Bc9d4382772b80eBB1Bf3565F222bF4635AEFc9", userinput)
  //     let abc = await nftapprove.wait()
  //     if (abc) {
  //       setnftapprove(true)
  //     }
  //     setValue('nft')
  //   }

  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  const total = async () => {
    let totalnft = await Contract.staking._totalNftStake()
    settotalnftstaked(totalnft.toString())
  }

  const stakedtotal = async () => {
    let totaltoken = await Contract.staking._totalThiccStake()
    settotaltokenstaked(totaltoken.toString())
  }

  const balance = async () => {
    let totalbalance = await Contract.staking.ContractThiccBalance()
    setshowbalance(totalbalance.toString() / 1000000000)
  }

  const tokenbalance = async (account) => {
    console.log(account, "getting user address")
    let usertokenbalance = await Contract.thicctoken.balanceOf(account)
    setuserBalance(usertokenbalance.toString() / 1000000000)
  }






  const getaddress = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setwalletaddress(account)
    console.log("acccccc------", account)
    if (account) {
      renderTokensForOwner(account);
      getNftData(account)
      tokenbalance(account)
    }
  }

  // const reward = async () => {
  //   console.log("reward")
  //   let rating = [];
  //   let rarityNo;

  //   const ThiccReward = await fetch(`https://ipfs.io/ipfs/QmaB55wLj8MWodYKAbQE7L6ReA1LQwBkZyKLqVceG3W1Xy/1.json`)
  //   let ab = await ThiccReward.json()
  //   console.log("rarityyyyyyyyyy", ThiccReward.json())
  //   console.log("sdfghjk", ab)
  //   rating.push(ab)
  //   console.log(rating[0].attributes[8], "rarity no.......")
  //   rarityNo.push(rating[0].attributes[8])

  // }




  const getNftData = async (account) => {
    let url = [];
    let id = [];
    let ids = await Contract.staking.getUserNftDetails(account)
    console.log("Id length", ids[2].length);
    if (ids) {
      for (let i = 0; i < ids[2].length; i++) {

        console.log(ids[2][i].toString(), "newwwwaaaaaaa.......")

        console.log("urllll", `https://opensea.mypinata.cloud/ipfs/QmeEtaQkUU5TMhkpDjDG4J8f63iCqpkFfiyhPgkDHvbgxB/${ids[i]}.gif`)
        const response = await fetch(`https://opensea.mypinata.cloud/ipfs/QmeEtaQkUU5TMhkpDjDG4J8f63iCqpkFfiyhPgkDHvbgxB/${ids[2][i].toString()}.gif`)
        console.log("seturl", response.url)
        url.push(response.url)
        id.push(ids[i])


      }
      console.log(url, "urlllllllll----------")
      setnftData({ url: url, id: id })

    }
  }








  const options = { method: 'GET' };
  const renderTokensForOwner = (ownerAddress) => {
    console.log("renderTokensForOwner")
    let url = [];
    let id = [];
    let abc;
    let UserNftName = [];



    fetch(`https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=200&owner=${ownerAddress}&order_direction=asc&include_orders=false`, options)
      .then(response => response.json())
      .then(response => {
        abc = response;
        console.log("aditya pagal", response)
        for (let i = 0; i < response.assets.length; i++) {
          let test1 = response.assets[i].asset_contract.address;
          let ab = test1.toString()
          if (response.assets[i].asset_contract.address == '0xfeb546f284c008008f2a79113f960f73b2f7685d') {
            console.log("repos  ", response.assets[i].name)
            // console.log("qwertyuiosdfghj", response.assets[i])
            UserNftName.push(response.assets[i].name)
            url.push(response.assets[i].image_original_url)
            id.push(response.assets[i].token_id)

          }

        }
        console.log("url", url)
        console.log("id", id)
        idDataFetch(id)
        setalldata({ url: url, id: id, name: UserNftName });

      })

    console.log(id, "rorrrrrr")
  }

  const idDataFetch = (id) => {
    console.log(id, "function called")
     let Id=[];
    let rarityValue = [];
    if (id.length > 0) {
      for (let i = 0; i < id.length; i++) {
        console.log(id, "rarrrrrrrrrrr")  
        console.log(id[i], "fetching iddd")
        fetch(`https://ipfs.io/ipfs/QmaB55wLj8MWodYKAbQE7L6ReA1LQwBkZyKLqVceG3W1Xy/${id[i]}.json`)
          .then(res => res.json())
          .then(res => {
            // let rarity = res;
            console.log(res, "wertyuio")
            rarityValue.push(parseInt(res.attributes[8].value))
            Id.push(id)
            console.log(res.attributes[8].value, "rarityvalue.........")
          }

          )
      }
      
    console.log("rarityid", rarityValue)

    setRarity({rarityValue :rarityValue,Id:id})

    }
Reward()
secondReward()
    thirdReward()
  }


  useEffect(() => {

    total()
    stakedtotal()
    balance()
    getaddress()
    tokenbalance()
    
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
      <ToastContainer />
      {console.log(Rarity,"santosh pagal hai")}
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
              <p className='address'>{walletaddress ? walletaddress : ""}</p>

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

                <h2 className=' d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> Thicc Collection </h2>
                <div className='card mt-2'>


                  <div className=' row'>
                    {alldata.url.length > 0 ?

                      alldata.url.map((e, i) => {
                        return (

                          <div className=" col-sm-3 card home d-flex justify-content-center align-items-center " style={{ maxWidth: "18.6rem", marginTop: "1.2rem", marginLeft: "4rem", maxHeight: "16rem" }}>
                            <div className='dropdown '>

                              <img src={e} class="card-img-top  img-fluid pt-4" alt="..." />
                              <div className='dropdown-content'>
                                <div className='  table-bordered' style={{ maxWidth: "25rem" }}>
                                  <h6 className='m-2 d-flex justify-content-center' style={{ fontFamily: "serif" }}> Reward Estimation</h6>
                                  <table className=' table table-bordered m-2' style={{ maxWidth: "18rem" }}  >
                                    <tr>
                                      <th scope="col" > #</th>

                                      <th scope="col" > Reward For</th>
                                      <th scope="col" > Thicc Token</th>
                                    </tr>
                                    <tbody>
                                      <tr>
                                        <th scope="row" > 1</th>

                                        <td> 7 Days</td>
                                        <td> {num ? num : 'no reward'}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" > 2</th>

                                        <td> 15 Days</td>
                                        <td> {num1 ? num1 : 'no reward'}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" > 3</th>

                                        <td> 30 Days</td>
                                        <td>{num2 ? num2 : 'no reward'} </td>
                                      </tr>
                                    </tbody>
                                  </table>

                                </div>
                              </div>
                            </div>
                            <p>{alldata.name[i]}</p>
                            <div className='button gap-2 d-flex justify-content-around' >
                              <button type="button" class="btn btn-primary mb-2" style={{ maxHeight: "1.8rem", fontSize: "10px" }} onClick={() => stake(alldata.id[i])}  >STAKE</button>
                            </div>
                          </div>
                        )
                      }) : "not found"
                    }
                    <br />

                    <h2 className='row d-flex justify-content-center mt-3' style={{ fontFamily: "serif" }}>  My Staked Collection
                      <div className='row'>

                        {nftData.url.length > 0 ?
                          nftData.url.map((e, i) => {
                            return (
                              <>
                                <div className="col-sm-3 card home d-flex justify-content-center align-items-center " style={{ maxWidth: "18.6rem", marginTop: "1.2rem", marginLeft: "4rem", maxHeight: "16rem", marginBottom: "1rem" }}>
                                  <img src={e} class="card-img-top  img-fluid pt-4" alt="..." />
                                  <div className='button gap-2 d-flex justify-content-around' >
                                    {/* {console.log("nftdataaaaaaaa",nftData.id[1][i].toString())} */}
                                    <button type="button" class="btn btn-primary " style={{ maxHeight: "1.8rem", fontSize: "10px" }} onClick={() => unstakeNft(nftData.id[1][i].toString())}>UNSTAKE</button>

                                  </div>
                                </div>
                              </>
                            )
                          }
                          ) : "not found"
                        }
                      </div>


                    </h2>

                  </div>
                </div>
                <div className='container mt-3'>
                  <div className='row'>
                    <h2 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> MY TOKENS</h2>
                    <div className='row mt-3'>

                      <div className='col-md-6 '>
                        <div className='card newbox'>
                          <h4 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> STAKING</h4>
                          <div className='icons'>
                            <div>
                              <img src='./wolf-icon.svg'></img>
                              <div>
                                <p>Thicc Token:</p>
                                <p> {userBalance ? userBalance.toString() : ""} Available</p>
                                <p></p>

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
                            <h6>Thicc Token To stake
                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="thicc" value={userinput} onChange={(e) => setuserinput(e.target.value)} />
<button className='btn btn-primary' onClick={setMax}>MAX</button>
                              </div>

                            </h6>
                          </div>

                          <div className='button  gap-5 d-flex justify-content-center' >
                            <button type="button" class="btn btn-primary btn-md mt-2" onClick={stakeThicc}  >STAKE</button>
                          </div>


                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='card newbox '>
                          <h4 className='row d-flex justify-content-center mt-2' style={{ fontFamily: "serif" }}> UNSTAKING</h4>

                          <div className='icons'>
                            <div>
                              <img src='./wolf-icon.svg'></img>
                              <div>
                                <p>Thicc Token : 0</p>
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
                            <h6>Thicc Token To Unstake
                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="thicc" value={userid} onChange={(e) => setuserid(e.target.value)} />

                              </div>

                            </h6>
                          </div>

                          <div className='button d-flex justify-content-center'>
                            <button type="button" class="btn btn-primary btn-md mt-2" onClick={unstakedToken}>UNSTAKE</button>
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
























