import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[50px] bg-blue-800 w-dvw flex items-center justify-evenly '>
        <div className='flex items-center justify-center w-1/3 h-10/12 p-0.5'>
            <h1 className='text-2xl text-white font-bold font-serif p-0.5'>CodeLab</h1>
        </div>
        <div className='flex items-center justify-evenly p-0.5 w-2/3 h-11/12 text-2xl'>
        <Link href='/' className='hover:font-bold active:text-black'>Home</Link>
        <Link href='/otp'className='hover:font-bold active:text-black'>OTP</Link>
        <Link href='/password'className='hover:font-bold active:text-black'>Password</Link>
        <Link href='/dice'className='hover:font-bold active:text-black'>Dice</Link>
        <Link href='/random'className='hover:font-bold active:text-black'>Random_No</Link>
        <Link href='/about'className='hover:font-bold active:text-black'>About_Us</Link>
        

        </div>
    </div>
  )
}

export default Navbar