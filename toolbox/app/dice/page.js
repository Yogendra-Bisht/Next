"use client"
import React from 'react'
import { useState } from 'react';

const page = () => {
  const [dice, setdice] = useState(0)
  function shownum(e){
    let num = Math.floor(Math.random()*10);
    // num = num+1;
    let final = num%6;
    final = final+1;
    setdice(final);
  }

  return (
    <div className='flex items-center justify-center bg-yellow-500 h-dvh w-dvw'> 
    <div className=' flex flex-col items-center justify-evenly h-[300px] w-[500px] border-2 border-amber-50 rounded-2xl p-2 bg-black'>
      <output className='text-3xl p-2 w-1/5 text-center text-amber-50 border-2 border-amber-50 bg-transparent'>{dice}</output>
      <button className='p-2 bg-amber-600 rounded-2xl hover:bg-green-600 text-2xl font-bold active:text-xl' onClick={(e)=>{
        shownum();
      }}>Shuffle</button>
      
      
    </div>
    </div>
  )
}

export default page