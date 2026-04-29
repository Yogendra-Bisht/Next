"use client"
import React from 'react'
import { useState } from "react";

const page = () => {

  const [Password, setPassword] = useState('')
  function showPassword(e){
    let alphabets ="abcdefghijklmnopqrstuvwxyz0123456789@#$&";
    let password ="";
    for (let index = 0; index < 8; index++) {
      let point = Math.ceil(Math.random()*100)
      point = point%40;
      let char = alphabets.charAt(point);
      password = password+char;
      
    }
    setPassword(password);
  }
  return (
    <div className='flex items-center justify-center bg-green-500 h-dvh w-dvw'> 
    <div className='flex items-center flex-col justify-evenly p-3 h-[250px] w-[300px] bg-black rounded-2xl text-white gap-4'>
        <output className='border-red-500 border-2 rounded p-1.5 text-2xl h-[45px] w-[150px] text-center'>{Password}</output>
        <button className='text-xl rounded-2xl bg-blue-400 p-2.5 hover:bg-green-700 active:text-sm' onClick={(e)=>{
          showPassword(e);
        }}>Generate Password</button>

        
        

      </div>
    </div>
  )
}

export default page