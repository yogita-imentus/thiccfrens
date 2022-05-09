
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Contract from '../Contract'
import bigInt from 'big-integer';
import { FaEthereum } from "react-icons/fa"
import { useLocation } from 'react-router-dom';

function ViewCollection() {
// require('./Yorker.css');
    const [allNft, setAllNft] = useState([]);
    const [mintPrice, setMintPrice] = useState(0)
    const [soldIds, setSoldIds] = useState()
    let sold = []
    const [allList, setallList] = useState()
    const location = useLocation()
    const nftCount = location.state.mintToken
    const[tokenIdsData,setTokenIdsData]=useState([])
    console.log(nftCount, "kkkkkk")

    useEffect(() => {
        getmetadata()
        return () => {

        }
    }, [])

    console.log(Contract.web)

    const handleBuy = async (i, price) => {
        try {
            console.log(typeof price)
            console.log(price, "pir")
            let buyFuction = await Contract.web.mint(i, { value: price })
            let abc = await buyFuction.wait()
            if (abc) {
                toast.success("congratulation");
            }
        } catch (error) {

            console.log("Error", error.error.code);
            if (error.error.code === -32603) {
                toast.error("You are not whiteListed");

            }
            else if (error.error.code === -32000) {
                toast.error("Insufficient Fund");
            }
            else {
                toast.error(`${error.error.message}`);
            }
        }

    }


    // async function soldIdsData() {
    //     let data = await Contract.web.soldIds()
    //     console.log(data, "111111111")

    //     if (data) {
    //         setSoldIds(data)
    //         console.log(data, "2222222222")
    //         getmetadata(data)
    //     }
    // }

    // console.log(soldIds, "33333333")
    // useEffect(() => {
    //     console.log(soldIds, "444444444")
    // }, [])

    console.log(allList, "all list")

    // console.log(allNft, "kkkkk")


    async function getmetadata() {
        console.log("kkkcaleddd")
        
        let allNfts = []
        const minPriceUser = await Contract.web.currentNftPrice()
        console.log("mintprice", minPriceUser.toString())
        setMintPrice(minPriceUser.toString());

        if(nftCount){
            console.log("called",typeof(nftCount))
            for(let i=0;i<nftCount.length;i++){
                console.log(nftCount[i],"kkkk")
                if(nftCount[i]!=','){
                    let tokenMetadataURI = `https://gateway.pinata.cloud/ipfs/QmbDQsvVBnGA6FRBvWRhjAkcfH8mUURF1UAcozj6ukzHM7`
                    const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())
                    console.log("tokenMetadata", tokenMetadata)
                    allNfts.push(tokenMetadata)
                }
                else{
                    console.log(nftCount[i],"oooo")

                }
            }
        setAllNft(allNfts)

    }
  



    }


    function check() {
    }

    const [edescription, setedescription] = useState()
    const [Ids, setIds] = useState()
    const [rarity, setRarity] = useState()
    const [contractAddress, setContractAddress] = useState()

    const addressContract = async () => {
        let cAddress = await Contract.web.address
        console.log(cAddress, "lklkl")
        setContractAddress(cAddress)
    }

    return (
        <>
            <ToastContainer />
            <div className='container-fluid '>

                <div className='row mx-auto d-flex justify-content-center '>

                    {allNft.map((e, i) => {
                        return (
                            <>
                                        <div className=' background col-md-4 bgg'>
                                            <div className='col d-flex justify-content-center'>
                                                <div className="card home" style={{ maxWidth: "18.6rem", marginTop: "1.2rem" }}>
                                                    <img src={`${e.image}`} class="card-img-top  img-fluid" alt="..." />
                                                    <div class="card-body">
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <h6>{e.name}</h6>
                                                            {/* <h6 > <FaEthereum size={20} /> {mintPrice / 1000000000000000000}</h6> */}

                                                        </div>
                                                        <div className='row d-flex '>
                                                            <div className='col'>
                                                                <button type="button" onClick={() => {
                                                                    setedescription(e.description)
                                                                    setIds(e.Ids)
                                                                    setRarity(e.rarity)
                                                                    addressContract()
                                                                }}
                                                                    class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                    Details
                                                                </button>
                                                            </div>


                                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5 class="modal-title" id="exampleModalLabel">{e.name}</h5>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body">

                                                                            <h6>Contract  : {contractAddress}  </h6>

                                                                            <h6>Discription : {edescription} </h6>
                                                                            <h6>BlockChain :  Ethereum</h6>
                                                                            <h6>Metadata :  Centralized</h6>
                                                                            <h6>Rarity : {rarity} </h6>
                                                                            <h6>TokenId : {Ids}</h6>


                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div className='col d-flex justify-content-end'> */}
                                                            {/* <button className='btn btn-primary' onClick={() => handleBuy(i + 1, mintPrice)} >Buy</button> */}
                                                            {/* </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            </>
                        )
                    }
                    )

                    }
                </div> 

            </div>
        </>
    )
}
export default ViewCollection