import React from "react";
import { redirect, Navigate, useNavigate } from "react-router-dom";

export default function Header()  {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  function getHome()  {
    navigate("/home");
  }

  function getSongs() {
    navigate('/songs');
  }

  function getArtists() {
    navigate('/artists');
  }

  return (
    <header className="row-span-1 flex justify-between items-center px-10 gap-4 w-full">
      <img src="/avatar.png" className='max-h-16 rounded-full' alt="Avatar" onClick={getHome}/>
      <div className="flex justify-center flex-1 gap-4">
        <button className="rounded-xl w-40 h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white" onClick={getSongs}>Top Songs</button>
        <button className="rounded-xl w-40 h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white" onClick={getArtists}>Top Artists</button>
        <button className='rounded-xl min-w-fit h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white'>Visit Your Profile</button>
      </div>
        <button className="rounded-full w-fit h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white" onClick={handleLogout}>Logout</button>
    </header>
  )
}