import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Songs()  {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const [accessToken, setAccessToken] = useState("");
  const [trackData, setTrackData] = useState(null);
  const redirect_uri = 'http://localhost:5173/songs';  

  useEffect(() => {
    console.log("Running effect...");
    console.log("Code: ", code);
    console.log("State: ", state);
    localStorage.setItem("code", code);
    localStorage.setItem("state", state);

    async function fetchData() {
     await fetch("http://localhost:3000/api/token", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        code: code,
        redirect_uri: redirect_uri,
      }),
      })
    .then(res => res.json())
    .then(data => setAccessToken(data.access_token))
    .catch(err => console.log("New error: ", err))
    }

    fetchData(); 
  }, []);

  useEffect(() => {
    if(accessToken) {
    fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => res.json())
    .then(data => setTrackData(data.items))
    }
  }, [accessToken])

  return(
    <>
    <div className="p-5 max-h-full row-span-12 grid grid-rows-12 place-items-center overflow-scroll border-3 border-blue-700">
      <h1 className="row-span-1">Songs page</h1>
      {accessToken && <div>{accessToken}</div>}
      {trackData && 
      <div className="flex flex-row row-span-11 justify-center gap-10 flex-wrap  h-full overflow-scroll">{trackData.map(item => <div key={item.id} className=""><img src={`${item.album.images[1].url}`} className="rounded-xl"></img></div> )}</div>
      }
    </div>
    </>

  );
}