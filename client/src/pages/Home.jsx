import React from 'react'
import { useLoaderData, redirect } from 'react-router-dom';

export async function loader({ request }) {
  localStorage.setItem("loggedIn", true);
  const access_token = localStorage.getItem("access_token") || null;

  if(access_token)  {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
    const userTracks = JSON.parse(localStorage.getItem("userTracks"));

    return { userData, userPlaylists, userTracks };
  }
  console.log("In Home component. Requesting access token...");
  const url = new URL(request.url);
  const code = url.searchParams.get("code") || null;
  const redirect_uri = 'http://localhost:5173/home';  

  if(code)  {
      try {
          const response = await fetch("http://localhost:3000/api/token", {
              method: "POST",
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify({
                code: code,
                redirect_uri: redirect_uri,
              }),
            })

          if(!response.ok)  {
            throw new Error("Failed to fetch access token");
          }

          const data = await response.json();
          localStorage.setItem("access_token", data.access_token);

          const userReponse = await fetch("https://api.spotify.com/v1/me", {
                                          headers: {
                                                Authorization: "Bearer " + data.access_token
                                          }
          });
          const userData = await userReponse.json();
          localStorage.setItem("userData", JSON.stringify(userData));

          const userSpotifyId = userData.id;
          const userPlaylistsResponse = await fetch(`https://api.spotify.com/v1/users/${userSpotifyId}/playlists`, {
                                          headers: {
                                                Authorization: "Bearer " + data.access_token
                                          }
          })
          const userPlaylists = await userPlaylistsResponse.json();
          localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));

          const userTracksResponse = await fetch("https://api.spotify.com/v1/me/tracks", {
                                          headers: {
                                                Authorization: "Bearer " + data.access_token
                                          }
          });
          const userTracks = await userTracksResponse.json();
          console.log("Just fetched user tracks: ", userTracks)
          localStorage.setItem("userTracks", JSON.stringify(userTracks));

          return { userData, userPlaylists, userTracks };
      } catch(err) {
          console.log("There was an error: ", err);
          throw err;
      } 
  }
  else return redirect('/Login');
}

export default function Home() {
  const { userData, userPlaylists, userTracks } = useLoaderData();
  console.log("Inside Home Component:");
  console.log("User Data: ", userData);
  console.log("User Playlists: ", userPlaylists);
  console.log("User tracks: ", userTracks)

  const playlists = userPlaylists.items;

  return (
    <main className='p-10 max-h-full gap-2 row-span-11 grid grid-rows-11 overflow-scroll border'>
      <section className='row-span-1 text-center border'>
        <p className=''>Hello {userData.display_name}</p>
        <img src={userData.images.url} alt="" className='border'/>
      </section>
      <section className='row-span-10 flex flex-wrap justify-between items-center gap-10'>
        { playlists && playlists.map(playlist => {
            return (
              <div className='w-[300px]' key={playlist.id}>
                <img src={playlist.images[0].url} alt={`Playlist ${playlist.name}`} className='rounded-xl mb-2'/>
                <p>{playlist.name}</p>
              </div>
            )
        })}
      </section>
    </main>
  )
}
