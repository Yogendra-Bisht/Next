"use client"
import React from 'react'
import { useState } from 'react';

const page = () => {
  const [Otp, setOtp] = useState('')
  function showOtp(e) {
    let otp = function createOtp(e) {
      let x =Math.random()*1000000 ;
      x = Math.floor(x);
      return x

      
    }
    setOtp(otp);
    // if(otp/1000000<0){
    //   console.log("anomaly occured");
      
    //   setOtp(otp*10);

    // }
    // else{
      
    //   setOtp(otp);

    // }
    
    
    
    
  }
  return (
    <div className='flex items-center justify-center bg-purple-900 h-dvh w-dvw'>
      <div className='flex items-center flex-col justify-evenly p-3 h-[250px] w-[300px] bg-black rounded-2xl text-white gap-4'>
        <output className='border-white border-2 rounded p-1.5 text-2xl h-[45px] w-[150px] text-center'>{Otp}</output>
        <button className='text-xl rounded-2xl bg-blue-400 p-2.5 hover:bg-green-700 active:text-sm' onClick={(e)=>{
          showOtp(e);
        }}>Generate another</button>

        
        

      </div>
    </div>
  )
}

export default page