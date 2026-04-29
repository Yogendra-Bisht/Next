"use client"
import React from 'react'
import { useState } from 'react';

const page = () => {
  const [val1, setval1] = useState();
  const [val2, setval2] = useState();
  const [number, setNumber] = useState(0);

  function catchrange1(value){
    let val1 = value;
    setval1(val1);
    
  }
  function catchrange2(value){
    let val2 = value;
    setval2(val2);
  }

  // Core logic where the actual number based on the range will be created
  function makenumber(e){
    let start = Math.ceil(val1);
    let end = Math.floor(val2);
    let random = Math.floor(Math.random() *(end-start+1)+start);
    setNumber(random);


  }
  return (
    <div className='flex items-center justify-center bg-gray-500 h-dvh w-dvw'> 
    <div className=' flex flex-col items-center justify-evenly h-[300px] w-[500px] border-2 border-amber-50 rounded-2xl p-2 bg-black'>
      <div className='flex items-center justify-evenly rounded-2xl h-2/12 w-full border-2 border-amber-600 bg-transparent'>
      <input className='bg-amber-50 rounded w-1/6 text-black text-center font-bold' onChange={(e)=>{
        catchrange1(e.target.value);
        
      }} value={val1} type='number'/>
      <h2>Range up-to</h2>
      <input className='bg-amber-50 rounded w-1/6 text-black text-center font-bold' onChange={(e)=>{
        catchrange2(e.target.value);

      }} value={val2} type='number'/>
      
      

      </div>
      <output className='text-3xl p-2 w-1/2 text-center text-amber-50 border-2 border-amber-50 bg-transparent rounded'>{number}</output>
      <button className='p-2 bg-amber-600 rounded-2xl hover:bg-green-600 text-2xl font-bold active:text-xl' onClick={(e)=>{
        makenumber(e);

      }}>Shuffle</button>
      
      
    </div>
    </div>
  )
}

export default page