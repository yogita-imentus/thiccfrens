import React from 'react'
import Contract from '../Contract';
import Web3 from 'web3';
import { useState, useEffect } from 'react';


require('./Dashboard.css');
function Dashboard() {

  const [alldata, setalldata] = useState([])
  const [stakeId, setstakeid] = useState()
  const [tokenIds, settokenIds] = useState()
  const [startingTime, setstartingTime] = useState()
  const [staketoken, setstaketoken] = useState()




  const getAccounts = async () => {
    console.log('getAccounts')
    let data = []
    let web3 = new Web3(window.ethereum)
    // console.log("web3", web3)
    let address = await web3.eth.getAccounts();
    console.log("address", address);


    let getlooplength = await Contract.staking.getUserNftDetails(address[0])
    console.log(getlooplength[0].length, "lengthhh")
    let newLenth = getlooplength[0].length;
    data.push(getlooplength)
    console.log(data, "dataaaaa")


    for (let i = 1; i <= newLenth; i++) {
      console.log(data.length, "loop")
      const details = await Contract.staking.stakenftdetails(address[0], i)
      console.log(details, "dashhhh")
      // data.push(details)
      setalldata(data)
    }
  }

const secondaccount=async()=>{
  let newdata=[]
  let web3 = new Web3(window.ethereum)
    // console.log("web3", web3)
    let address = await web3.eth.getAccounts();
    // console.log("address", address);
let token=await Contract.staking.getUserThiccDetails(address[0])
console.log(token[0],"ttttttt")
let arr= token[0].length
newdata.push(token)
console.log(newdata,"newwwwwww")

for(let k = 1; k<=arr;k++)
{
 let tokendetails=await Contract.staking.stakethiccdetails(address[0],k)
 console.log(tokendetails,"yyyyyyyy")
 setstaketoken(newdata)
 
}

}

  useEffect(() => {
    getAccounts()
    secondaccount()
  }, [])

  console.log(alldata, "dddddddddd")
  return (
    <>

      {alldata?alldata.map((e, i) => {
        return (
          <div class='container-fluid'>
            <table className='table table-success table-striped ' id='datatable' width="100%" cellSpacing="0">
              <thead> NFT DETAILS</thead>
              <tr>
                <td>Address</td>

                <td> Stake Id</td>
                <td>Token ID</td>
                <td>Time</td>
              </tr>

              <tbody className='table table-success table-striped'>
                <td>  {e ? e[i].map((j) => {
                  return (<>
                    {j.toString()}
                    <br />
                  </>)
                }) : 'you did not stake anything'}</td>
                <td>  {e ? e[i + 1].map((j) => {
                  return (<>
                    {j.toString()}
                    <br />
                  </>)
                }) : ''}</td>
                <td>  {e ? e[i + 2].map((j) => {
                  return (<>
                    {j.toString()}
                    <br />
                  </>)
                }) : ''}</td>
                <td>  {e ? e[i + 3].map((j) => {
                  return (<>
                    {j.toString()}
                    <br />
                  </>)
                }) : ''}</td>
              </tbody>

            </table>
          </div>
        )
      }
      ):'you did not stake anything'
      
      // <div>
      //   <p className='text-center'> You did not stake anything</p>
      // </div>
    }
      <br/>

<div className='container-fluid'>
  {staketoken?staketoken.map((m, k) => {
    return(
<table className='table table-success table-striped' id='datatable' width="100%" cellSpacing="0">
              <thead> TOKEN DETAILS</thead>
              <tr>
                <td>Address</td>
 
                <td> Stake Id</td>
                <td>Thicc Token</td>
                <td>Time</td>
              </tr>

              <tbody class='table table-success table-striped'>
                <td>  {m ? m[k].map((l) => {
                  return (<>
                    {l.toString()}
                    <br />
                  </>)
                }) : ''}</td>
                <td>  {m ? m[k + 1].map((l) => {
                  return (<>
                    {l.toString()}
                    <br />
                  </>)
                }) : ''}</td>
                <td>  {m ? m[k + 2].map((l) => {
                  return (<>
                    {l.toString()}
                    <br />
                  </>)
                }) : ''}</td>
                <td>  {m ? m[k + 3].map((l) => {
                  return (<>
                    {l.toString()}
                    <br />
                  </>)
                }) : ''}</td>
              </tbody>

            </table>
            )
          }
          ):  
      <div>
        <p className='text-center color-green'>Ops!! You did not stake anything.</p>
      </div>
        }

</div>
   
    </>
  )
}

export default Dashboard