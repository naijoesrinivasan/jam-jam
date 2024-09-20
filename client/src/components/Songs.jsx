import React from "react"
import { useLoaderData } from "react-router-dom"

export async function loader({ request }) {
  const trackData = JSON.parse(localStorage.getItem("trackData")) || null;
  if(trackData) {
    return trackData;
  }

  const accessToken = localStorage.getItem("access_token")
  console.log(accessToken)
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
  const data = await response.json();
  localStorage.setItem("trackData", JSON.stringify(data.items));
  return data.items;
}

export default function Songs()  {
  const trackData = useLoaderData();
  console.log("Data: ", trackData)

  return(
    <>
    <main className="p-5 max-h-full row-span-10 grid grid-rows-11 place-items-center overflow-scroll ">
      <h1 className="row-span-1">Good Choices!</h1>
      {trackData && 
      <div className="flex flex-row row-span-11 justify-center gap-10 flex-wrap  h-full overflow-scroll">
        { trackData.map(item => 
          <div key={item.id} className="max-w-[300px]">
            <img src={`${item.album.images[1].url}`} className="rounded-xl mb-2"></img>
            <p>Track: {item.name}</p>
            <p>Artist: {item.artists[0].name}</p>
            <p>Rating: {item.popularity}</p>
            <a href={`${item.preview_url}`} target="_" className=""><button className="rounded-xl w-fit h-12 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white">Play</button></a>
          </div> 
        )}
      </div>
      }
    </main>
    </>

  );
}