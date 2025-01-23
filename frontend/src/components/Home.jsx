import React from 'react'
import { useNavigate } from 'react-router';
import Signup from "./Signup";
import Login from "./Login";
import UploadImage from "./Uploadimage";
import ImageDecryption from "./ImageDecryption";
function Home() {
        let navigate =useNavigate();
    
  return (
    <>
    <div className='size-100 bg-pink-700 text-white'>
      <h1 >Welcome to Pixel Storage</h1>
      <button onClick={()=>navigate('/Signup')}>Signup</button>
    </div>

    </>
  )
}

export default Home