import React from 'react'
import { useLoaderData, redirect } from 'react-router-dom';

export async function loader({ request }) {
  console.log("Home Loader running...")
  const accessToken = localStorage.getItem('access_token')
  try {
    const userReponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    const userData = await userReponse.json();
    localStorage.setItem("userData", JSON.stringify(userData));

    const userSpotifyId = userData.id;
    const userPlaylistsResponse = await fetch(`https://api.spotify.com/v1/users/${userSpotifyId}/playlists`, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    const userPlaylists = await userPlaylistsResponse.json();
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));

    const userTracksResponse = await fetch("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    const userTracks = await userTracksResponse.json();
    localStorage.setItem("userTracks", JSON.stringify(userTracks));

          return { userData, userPlaylists, userTracks };
  } catch (err) {
    console.log("There was an error: ", err);
    throw err;
  }
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
