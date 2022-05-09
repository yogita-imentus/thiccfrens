import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Contract from './Contract'
import bigInt from 'big-integer';
import { FaEthereum } from "react-icons/fa"
import { useLocation } from 'react-router-dom';


function Mint() {
    require('./Yorker.css');
    const [allNft, setAllNft] = useState([]);
    const [mintPrice, setMintPrice] = useState(0)
    const [allList, setallList] = useState()
    const [revealStatus, setReveal] = useState()
    const location = useLocation()
    const nftCount = location.state.mintToken
    console.log("nftccccococococ",nftCount)
    const [tokenIdsData, setTokenIdsData] = useState([])
    const [edescription, setedescription] = useState()
    const [Ids, setIds] = useState()
    const [rarity, setRarity] = useState()
    const [contractAddress, setContractAddress] = useState()
    let allNfts=[]


    useEffect(() => {
        reveal()

       
        return () => {
        }
    }, [])




    const reveal = async () => {
        let nftReveal = await Contract.web.checkReveal()
        console.log("revealNft", nftReveal.toString())
        setReveal(nftReveal.toString())
        getmetadata()
        allNFtsData(nftReveal.toString())
    }

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


    async function getmetadata() {
        console.log("kkkcaleddd")

        const minPriceUser = await Contract.web.currentNftPrice()
        console.log("mintprice", minPriceUser.toString())
        setMintPrice(minPriceUser.toString());

    }

    function check() {
        // console.log("In check function", allNft);
    }

   
    const addressContract = async () => {
        let cAddress = await Contract.web.address
        console.log(cAddress, "lklkl")
        setContractAddress(cAddress)
    }


    const allNFtsData=async (val)=>{
        console.log("check1111111",val)
        let datab=[]
        if(val){
        console.log("check1222",nftCount)

            if(val=='false'){
        console.log("check1222",nftCount)

                console.log("revealStatus false")
                for (let i = 0; i < nftCount.length; i++) {
                    console.log(nftCount[i], "kkkk")
                    if (nftCount[i] !== ',') {
                        let tokenMetadataURI = `https://gateway.pinata.cloud/ipfs/QmbDQsvVBnGA6FRBvWRhjAkcfH8mUURF1UAcozj6ukzHM7`
                        const tokenMetadata =await  fetch(tokenMetadataURI).then((response) => response.json().then((data)=>{
                            // datab.push(data)
                            return data
                        }))
                        console.log("tokenMetadata", tokenMetadata)
                        datab.push(tokenMetadata)
                    }
                    else {
                        console.log(nftCount[i], "oooo")
                    }
                }
                setAllNft(datab)
            }

            else if(revealStatus===true){
                console.log("revealStatus true")

                for (let i = 0; i < nftCount.length; i++) {
                    console.log(nftCount[i], "kkkk")
                    if (nftCount[i] !== ',') {
                        let tokenMetadataURI = `https://gateway.pinata.cloud/ipfs/QmePWm5tw8vPxQWKujAmAAXMy1y6bt4DLpqmK1sedz9kzM/${nftCount[i]}.json`
                        const tokenMetadata =  fetch(tokenMetadataURI).then((response) => response.json())
                        console.log("tokenMetadata", tokenMetadata)
                        datab.push(tokenMetadata)
                    }
                    else {
                        console.log(nftCount[i], "oooo")
        
                    }
                }
                setAllNft(datab)
            }
        }
    }

    console.log(allNft,"lklklklkl")

    return (
        <>
            <ToastContainer />
            <div className='container-fluid '>

                <div className='text-center border-0 rounded image--image bgg '>
                    {/* <img src="../assets/dog1.gif" className="rounded image--image " style={{ maxWidth: "18.6rem" }} alt="..." /> */}
                    <div className='text-center m-3 carddetails'>
                        < h5> Hey!!! Here is your collection</h5>
                    </div>
<br></br>
                </div>
                <div className='row mx-auto d-flex justify-content-center '>
{console.log("allnft",allNft)}
                    {allNft.map((e, i) => {
                        return (
                            <>
                                {/* {allList && allList.includes(e.Ids) ? console.log(e.Ids, "kkkkkkkk")
                                    : 
                                    <> */}
                                {console.log(e.image,"check-----------")}
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


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </>
                                } */}


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

export default Mint