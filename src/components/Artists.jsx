import React from 'react';
import { useLoaderData } from 'react-router-dom';

export async function loader({ request })  {
  console.log("Artists Loader running...")
  const artistData = JSON.parse(localStorage.getItem("artistData")) || null;
  if(artistData)  {
    console.log("Returning from local storage")
    return artistData;
  }

  const accessToken = localStorage.getItem("access_token");
  const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
  const data = await response.json();
  localStorage.setItem("artistData", JSON.stringify(data.items));
  return data.items;
}

export default function Artists() {
  const artistData = useLoaderData();

  return (
    <main className="p-5 max-h-full row-span-10 grid grid-rows-11 place-items-center ">
      <h1 className="row-span-1">Artists page</h1>
      {artistData && 
      <div className="flex flex-row row-span-11 justify-center gap-10 flex-wrap  h-full overflow-auto">
        { artistData.map(item => 
          <div key={item.id} className="w-[300px]">
            <img src={`${item.images[1].url}`} className="rounded-xl mb-2"></img>
            <p>Artist: {item.name}</p>
            <p>Rating: {item.popularity}</p>
          </div> 
        )}
      </div>
      }
    </main>
  )
}
