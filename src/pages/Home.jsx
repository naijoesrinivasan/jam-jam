import React from 'react'
import { useLoaderData, redirect } from 'react-router-dom';

export async function loader({ request }) {
  // const loggedIn = localStorage.getItem("loggedIn");
  // if(!loggedIn) {
  //   return redirect('/login?message=User tried to access home without being logged in')
  // }
  console.log("Home Loader running...")
  const access_token = localStorage.getItem("access_token") || null;

  if(access_token)  {
    console.log("Access token present in local storage")
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userPlaylists = JSON.parse(localStorage.getItem("userPlaylists"));
    const userTracks = JSON.parse(localStorage.getItem("userTracks"));

    return { userData, userPlaylists, userTracks };
  }


  const url = new URL(request.url);
  const code = url.searchParams.get("code") || null;
  const state = url.searchParams.get("state") || null;
  console.log("State in home: ", state);
  const redirect_uri = 'http://localhost:5173/home';  

  if(code)  {
      console.log("In Home component. Requesting access token...");
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
          localStorage.setItem("loggedIn", true);

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
          // console.log("Just fetched user tracks: ", userTracks)
          localStorage.setItem("userTracks", JSON.stringify(userTracks));

          return { userData, userPlaylists, userTracks };
      } catch(err) {
          console.log("There was an error: ", err);
          throw err;
      } 
  }
  else return redirect('/login?message=no access token');
}

export default function Home() {
  const { userData, userPlaylists, userTracks } = useLoaderData();
  // console.log("Inside Home Component:");
  // console.log("User Data: ", userData);
  console.log("User Playlists: ", userPlaylists);
  // console.log("User tracks: ", userTracks)

  const playlists = userPlaylists.items;

  return (
    <main className='row-span-11 p-10 gap-2 w-full flex flex-col border'>
      <section className='text-center border w-full'>
        <p className=''>Hello {userData.display_name}</p>
        <img src={userData.images?.url} alt="" className=''/>
      </section>
      <section className='flex flex-1 flex-shrink-0 flex-wrap justify-center items-center gap-10 max-w-full overflow-y-auto'>
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
