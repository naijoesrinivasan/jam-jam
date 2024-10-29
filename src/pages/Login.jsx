import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { slideFromTop, slideFromBottom } from '../motionVariants';

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const ref = useRef(null)

  useEffect(() => {
    async function getToken() {
      if(searchParams.get('message') === 'token')
        navigate('/');
      if (searchParams.get('message') === 'no_access_token') {
        const response = await fetch('/auth/token')
        const data = await response.json()
        localStorage.setItem('accessToken', data.access_token)
        console.log("Token: ", data.access_token)

        navigate('/');
      }
    }

    getToken()
  }, [navigate, searchParams])

  return (
    <main
      className='relative h-full bg-cover flex-shrink-0 flex justify-center  p-10'
      ref={ref}
    >
      <motion.img
        src="/astro.png"
        alt=""
        className='absolute -bottom-2 left-0 w-[660px] h-auto z-10'
        variants={slideFromBottom}
        initial="hidden"
        animate="visible"
      />
      <div className="rounded-lg shadow-2xl z-20 h-fit flex flex-col bg-primaryBlack border border-opacity-10 hover:border">
        <a href='/auth/login' className='cursor-pointer flex flex-row justify-center items-center p-2'>
          <img src="/spotifyGreenIcon.png" alt="" width={40} />
          <button className='rounded-xl w-full h-12 p-2 hover:backdrop-blur-none text-primaryWhite font-bold'>
            Connect With Spotify
          </button>
        </a>
      </div>
    </main>
  )
}
