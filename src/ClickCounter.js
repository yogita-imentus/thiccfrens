import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { FaEthereum } from "react-icons/fa"


import { useNavigate } from 'react-router-dom';
import Contract from './Contract'
import Web3 from 'web3'
import { Alert } from 'bootstrap';


function ClickCounter() {
    require('./thicc.css');
    const navigate = useNavigate()
    const [num, setnum] = useState(0)
    const [allNft, setAllNft] = useState([]);
    const [loading, setloading] = useState(false)
    const [estimatePrice, setestimatePrice] = useState(0)
    const increament = () => {
        if (num < 3) {
            setnum(num + 1);
        }
    }

    const decreament = () => {
        if (num > 0) {
            setnum(num - 1);
        }

    }

    const setMax = () => {
        setnum(3)
    }


    const walletConnect = async () => {
        window.ethereum.request({ method: 'eth_requestAccounts' });
        getNft()
    }

    const estimateamount = async () => {
        if (num > 0) {
            console.log("feeee",num)
            console.log("contract",Contract)
            let amount = await Contract.web.estimateFee(parseInt (num))
            console.log("amount",amount)
            setestimatePrice(amount.toString())
            
        }
    }
    useEffect(() => {
        estimateamount()
    }, [num])


    const handleBuy = async () => {
        console.log("callled")
        try {
            setloading(true)
            
            let estimatePrice = await Contract.web.estimateFee(num)
            console.log(estimatePrice.toString(), "klklk")
            if (estimatePrice) {
                let mint = await Contract.web.mint(num, { value: estimatePrice.toString() })
                console.log(mint)
                let waiting = await mint.wait()
                if (waiting) {
                    setloading(false)
                    toast.success("congratulation");
                    navigate('/collection', { state: { num: num } })
                }
            }
            
        } catch (error) {
            setloading(false)
            console.log(error)
            if (error.error.code === -32603) {
                toast.error("You are not whiteListed");
                // alert("You are not whitelisted");
            }
            else if (error.error.code === -32000) {
                toast.error("Insufficient Fund");
            }
            else {
                toast.error(`${error.error.message}`);
            }
        }

    }



    const getNft = async () => {
        let allNfts = []
        console.log("test", Contract)
        let web3 = new Web3(window.ethereum)
        let address = await web3.eth.getAccounts();

        const NftBalance = await Contract.web.mint(address[0], 1)
        try {
            for (let i = 1; i <= 15; i++) {
                let abc = await Contract.web.mint(address[0], i)
                let tokenMetadataURI = await Contract.web.uri(i)

                if (tokenMetadataURI.startsWith("ipfs://")) {
                    tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
                }

                const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())
                allNfts.push(tokenMetadata)
            }
        }

        catch (error) {
            console.log(error)
        }


        setAllNft(allNfts)
    }

    useEffect(() => {
        console.log("allnft", allNft)
        // Walletconnect()
    }, [allNft])



    

    const collection = async () => {
        if (window.ethereum) { 
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("in mint");
            navigate('/collection', { state: { num: num } })
        }
        else {
            console.log("Not connect to wallet");
        }
    };



    return (
        <>
            <ToastContainer />
            {
                loading ?

                    <div className="spinner-border  d-flex justify-content-center spnr " role="status" >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :

                    <div className='container-fluid card  d-flex ctnr'>
                        <div className='row border-2'>
                            <div className='col-md-6'>
                                {/* <div className='card dc'>
                                    <p className='text-center'>Dogs Collection</p>
                                    <img src="../assets/dog1.gif" className="rounded image--image " style={{ maxWidth: "18.6rem" }} alt="..." />

                                </div> */}
                                <div class="flip-box  dc">
                                    <div class="flip-box-inner">
                                        <div class="flip-box-front">
                                            <img src="../assets/dog1.gif" alt="Paris" style={{ width: "300px", height: "200px" }} />
                                        </div>
                                        <div class="flip-box-back">
                                            <img src="../assets/dog2.gif" alt="Paris" style={{ width: "300px", height: "200px" }} />

                                        </div>
                                    </div>
                                </div>
                                <div class="flip-box  dc">
                                    <div class="flip-box-inner">
                                        <div class="flip-box-front">
                                            <img src="../assets/dog1.gif" alt="Paris" style={{ width: "300px", height: "200px" }} />
                                        </div>
                                        <div class="flip-box-back">
                                            <img src="../assets/dog2.gif" alt="Paris" style={{ width: "300px", height: "200px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='card allinfo  text-center '>
                                    <h2 style={{ fontFamily: "monospace" }} > Public minting open!!!</h2>
                                    <h6 className='m-2'>No waitlist needed. Public minting is now open! 🎉</h6>
                                    <div className='d-flex justify-content-between m-3'>
                                        <div className='info'>
                                            <h6> supply </h6>
                                            <h6> 1500</h6>
                                        </div>
                                        <div className='info'>
                                            {/* <h6> Price per mint </h6>
                                            <h6>1< FaEthereum /> </h6> */}
                                        </div>
                                        <div className='info'>
                                            <h6> Max </h6>
                                            <h6> 3</h6>
                                        </div>
                                    </div>
                                    <div className='card counts'>
                                        <div className='d-flex justify-content-between m-2'>
                                            <div>
                                            <div className=' d-flex' >
                                                <button className='btn btn-info d-flex justify-content-arround' onClick={decreament}> - </button>
                                                <button className='btn btn-info d-flex justify-content-arround'>{num} </button>
                                                <button className='btn btn-info d-flex justify-content-arround' onClick={increament}> + </button>
                                                
                                            </div>
                                            <p> Total</p>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary' onClick={setMax}> SET MAX</button>
                                                <h6>< FaEthereum /> {estimatePrice>0 ? estimatePrice / 1000000000000000000 : "0"}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-grid col-6 mx-auto myn'>
                                        <button className='btn btn-primary  text-center' onClick={() => handleBuy()}> MINT YOUR NFT</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
            }


        </>
    )
}

export default ClickCounter