import React from 'react'
import { Link } from 'react-router-dom'

export default function Artist() {
  return (
    <Link to='/artists'>
      <div className='relative flex flex-col h-fit justify-center items-center p-4'>
        <h1 className='absolute top-1/2 font-bold text-[42px] -rotate-12 text-white'>TOP ARTISTS</h1>
        <img src="hobbs.jpg" alt="" className='object-contain min-w-[100px] w-[340px]'/>
      </div>
    </Link>
  )
}
