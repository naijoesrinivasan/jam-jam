import React, { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'react-router-dom';

export async function loader()  {
  console.log("Login Loader running...")
  const loggedIn = localStorage.getItem("loggedIn") || null;

  if(loggedIn)  {
    console.log("User is logged in: ", loggedIn)
    return redirect('/home');
  }

  return null;
}

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authEndpoint, setAuthEndpoint] = useState("");
  const message = searchParams.get("message");

  useEffect(() => {
    function makeid() {
      console.log("Makeid running...")
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let counter = 0;
      while (counter < 16) {
        result += characters.charAt(Math.floor(Math.random() * 16));
        counter += 1;
      }
      console.log(result)
      return result;
    }

    const endPoint = 'https://accounts.spotify.com/authorize?';
    const response_type = 'code';
    const redirect_uri = 'http://localhost:5173/home';
    const client_id = '856e9ad5e4a946d2aee20e5a7f3aae75';
    const scope = 'user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing streaming';
    const state = makeid();
    const params = new URLSearchParams({
      client_id: client_id,
      response_type: response_type,
      redirect_uri: redirect_uri,
      scope: scope,
      state: state
    });

    setAuthEndpoint(`${endPoint}${params}`);
    console.log("Authorization endpoint created...");
    console.log("State in login", state);
    console.log("Auth: ", `${endPoint}${params}`)
  }, [])




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
      <a href={authEndpoint}><button className='mt-4 rounded-xl w-40 h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white'>Log In</button></a>
    </main>
  )
}
