'use server';

import { redirect } from "react-router-dom";
import { auth, getSeedGenres } from "./utils";



export async function homeLoader({ request }) {
  console.log("Home Loader running...")
  console.log("Request at home loader: ", request)
  // check if access token is present
  try {
    const accessToken = await auth();

    // user data
    const userReponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    const userData = await userReponse.json();
    localStorage.setItem("userData", JSON.stringify(userData));

    // get top tracks
    const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
      headers: {
        Authorization: "Bearer " + accessToken 
      }
    })
    const topTracks = await topTracksResponse.json();
    localStorage.setItem("topTracks", JSON.stringify(topTracks));

    // get top artists
    const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
      headers: {
        Authorization: "Bearer " + accessToken 
      }
    });
    const topArtists = await topArtistsResponse.json();
    localStorage.setItem('topArtists', JSON.stringify(topArtists));

    const topGenres = getSeedGenres(topArtists.items.flatMap(artist => artist.genres));

    // featured playlists
    const featuredPlaylistsResponse = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: "Bearer " + accessToken 
      }
    });
    const featuredPlaylists = await featuredPlaylistsResponse.json();
    localStorage.setItem('featuredPlaylists', JSON.stringify(featuredPlaylists));    

    //  get recommendations based on seed objects
    const recommendationResponse = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${topGenres}&limit=20`, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    const recommendations = await recommendationResponse.json();
    localStorage.setItem("recommendations", JSON.stringify(recommendations));     

    return { accessToken, userData, topTracks, topArtists, recommendations, featuredPlaylists };
  } catch (error) {
    return redirect(`/login?message=${error.message}`)
  }
}

export async function topSongsLoader({ request }) {
  console.log("Songs Loader running...")

  // check if access token is present
  try {
        const accessToken = await auth();

        const trackData = JSON.parse(localStorage.getItem("trackData")) || null;
        if(trackData) {
          console.log("Returning track data...")
          return trackData;
        }

        const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term", {
            headers: {
              Authorization: "Bearer " + accessToken
            }
          })
        const data = await response.json();
        localStorage.setItem("trackData", JSON.stringify(data.items));
        return data.items;
  } catch (error) {
        return redirect(`/login?message=${error.message}`)
  }
}

export async function topArtistsLoader({ request })  {
  console.log("Artists Loader running...")

  // check if access token is present
  try {
        const accessToken = await auth();

        const artistData = JSON.parse(localStorage.getItem("artistData")) || null;
        if(artistData)  {
          return artistData;
        }

        const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term", {
            headers: {
              Authorization: "Bearer " + accessToken
            }
          })
        const data = await response.json();
        localStorage.setItem("artistData", JSON.stringify(data.items));
        return data.items;
  } catch (error) {
        return redirect(`/login?message=${error.message}`)
  }
}

export async function songDetailLoader({ request, params })  {
  console.log("Song detail loader running")
  console.log("Params: ", params)
  // check if access token is present
  try {
    const accessToken = await auth();
    const id = params.id;

    // track response
    const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    const track = await trackResponse.json();

    const audioFeatureResponse = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken
        }
    });
    const audioFeatures = await audioFeatureResponse.json();

    return { track, audioFeatures };
  } catch (error) {
      return redirect(`/login?message=${error.message}`)
  }
}