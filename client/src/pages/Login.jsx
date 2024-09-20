import React from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import { spotifyLoginEndpoint } from '../utils';

export async function loader()  {
  const loggedIn = localStorage.getItem("loggedIn") || null;

  if(loggedIn)  {
    return redirect('/home');
  }

  return null;
}

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");

  function handleClick()  {
    fetch(spotifyLoginEndpoint, { method: "POST" })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

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
      <a href={spotifyLoginEndpoint}><button className='mt-4 rounded-xl w-40 h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white'>Log In</button></a>
    </main>
  )
}
