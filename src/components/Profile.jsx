import React from 'react'

export default function Profile({ userData }) {
  const userImage = userData.images?.url ||  '/astroHead.jpeg'
  
  return (
    <div className='flex flex-col bg-primaryWhite justify-center items-center rounded-lg p-4'>
      <div className="rounded-full p-4">
        <img src={userImage} alt="" className='rounded-full w-[250px] aspect-square object-cover'/>
      </div>
      <p>{userData.display_name}</p>
      <p>{userData.followers.total} followers</p>
      <a href={userData.external_urls.spotify} target='_blank' className="">
        <button>
          Go To Spotify
        </button>
      </a>
    </div>
  )
}
