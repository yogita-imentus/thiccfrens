import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FaEthereum } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai";

function Dog() {
  require('./Dog.css')
  const token = useNavigate()

  const Token = () => {
    token('/token')
  };

  useEffect(() => {
    // abc()

    return () => {

    }
  }, [])


  const [dummy, setdummy] = useState([]);

  // async function abc() {
  //   console.log("abc")
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log("eee", json)
  //       setdummy(json)
  //     })
  // }
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          {/* <div className='col-md-12'> */}

          <div className='icon'>
            <h1> <FaEthereum size={20} /> </h1>
            <h1><AiFillHeart size={20} /></h1>
          </div>

          <div className='card'>
            <img src="../assets/dog1.gif" className="rounded mx-auto d-block" alt="..." onClick={Token} />
            <div className='text-center carddetails'>
              The Dog Nft collection by Owner name

            </div>

          </div>
          {/* </div> */}






        </div>
      </div>
      {/* <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> */}

      {
        dummy.map((e) => {
          return (
            <p>{e.name}</p>
          )
        })
      }
      {/* </div> */}
    </>
  )
}

export default Dog