import React from 'react'
import { Link } from 'react-router-dom'

export default function Music() {
  return (
    <Link to='/songs'>
      <div className='relative flex flex-col h-fit justify-center items-center p-4'>
        <h1 className='absolute top-1/2 font-bold text-[42px] -rotate-12 text-transparent bg-gradient-to-tr from-indigo-400 to bg-slate-100 bg-clip-text'>TOP TRACKS</h1>
        <img src="2d.jpg" alt="" className='object-contain min-w-[100px] w-[340px]'/>
      </div>
    </Link>
  )
}
