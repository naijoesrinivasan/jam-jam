import React, { useEffect, useState } from 'react';
import { redirect, useLoaderData, useSearchParams } from 'react-router-dom';

export async function loader()  {
  console.log("Login Loader running...")
  let accessToken = localStorage.getItem("access_token") || '';

  if (accessToken !== '') {
    console.log("User has access token: ", accessToken)
    return redirect('/');
  }
  console.log("No access token. Sending request")
  const response = await fetch('/auth/token')
  const json = await response.json()
  accessToken = json.access_token
  localStorage.setItem("access_token", accessToken)

  return accessToken;
}

export default function Login() {
  const accessToken = useLoaderData();
  const [message, setMessage] = useSearchParams();
  console.log(message.get('message'))

  return (
    <main className='row-span-12 bg-wildBlack text-wildGrey flex flex-col items-center p-20 lg:p-[320px] gap-4'>
      <h2>Discover Your Music Universe</h2>
      <p>Welcome to your personalized music hub, where your eclectic taste finds its perfect companion. 
      Whether you're vibing to classic rock, immersing in hip-hop beats, or diving into indie and experimental sounds, 
      this platform brings all your Spotify data to life. Seamlessly connect your Spotify account to view your profile, 
      explore playlists, and dive deeper into your unique music journey.
      </p>
      <p>Music is more than just sound—it's an experience. Let's explore yours.</p>
      { message && <span className='text-[#A64B29] text-sm'>{message}</span>   }
      <a href='/auth/login'>
        <button className='mt-4 rounded-xl w-40 h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white'>
          Log In
        </button>
      </a>
    </main>
  )
}
