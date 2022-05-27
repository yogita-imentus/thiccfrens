import React,{useState,useEffect} from 'react'
import Contract from '../../Contract'
import bigInt from 'big-integer';
import { FaEthereum } from "react-icons/fa"
import { useLocation } from 'react-router-dom';



const MintNew = () => {
    require('../../Yorker.css');
    const [allNft, setAllNft] = useState([]);
    const[tokenIdsData,setTokenIdsData]=useState([])
    const location = useLocation()
    const [mintPrice, setMintPrice] = useState(0)
    const nftCount = location.state.mintToken

console.log(nftCount)

    async function getmetadata() {
        console.log("kkkcaleddd")
        let allNfts = []
        if(nftCount){
            console.log("called",typeof(nftCount))
            // const newarray= Object.values(nftCount);
            for(let i=0;i<nftCount.length;i++){
                console.log(nftCount[i],"kkkk")
                if(nftCount[i]!=','){
                    console.log(nftCount[i],"nnn")
                }
                else{
                    console.log(nftCount[i],"oooo")

                }
            }
    }
    setAllNft(allNfts)

    }

    React.useEffect(() => {
        getmetadata()
        return () => {

        }
    }, [])

  return (
    <>
    <h1>Hello</h1>
    </>
  )
}

export default MintNew