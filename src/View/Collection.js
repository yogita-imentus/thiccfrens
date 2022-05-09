import React, { useState } from 'react'
import Contract from '../Contract'

import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';



function Collection() {
    require('./Collection.css'); 
    const navigate = useNavigate()
    const location = useLocation()
    // const num = location.state.num
    const[revealStatus,setRevealStatus]=useState()

    const[mintToken,setMinToken]=useState()

    const Mint = () => {
        console.log(mintToken,"jjjjkkkk")
        // navigate('/Mint', { state:{mintToken:Mintedtoken} })
    }

    const reveal = async () => {
        let nftReveal = await Contract.web.checkReveal()
        console.log("revealNft", nftReveal.toString())
        setRevealStatus(nftReveal.toString())
    }

    const mintedToken = async () => {
        reveal()
        try {
            let minted = await Contract.web.getUserTokenIds()
            console.log(minted, "mmmmmmm")
            if(minted) {
                setMinToken(minted.toString())
        navigate('/mint', { state:{mintToken:minted.toString()} })
                // navigate('/mintnew', { state:{mintToken:minted.toString()} })
                // navigate('/ViewCollection', { state:{mintToken:minted.toString()} })

            }
        }
        catch (error) { 

        }
    }

    return (
        <>
            <div className='container-fluid d-flex align-middle'>
                <div className='card  text-center clctn'>
                    <h1> 🎉 </h1>
                    <h> MINTED! </h>
                    <p> Here Is Your Transaction</p>
                    <button className='btn btn-primary  vtc'> View Transaction</button>
                    <p> View Your Collection</p>
                    <button className='btn btn-primary  vtc' onClick={mintedToken}> View Collection</button>
                </div>
            </div>
        </>
    )
}

export default Collection