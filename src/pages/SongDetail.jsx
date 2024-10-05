import React from 'react'
import { Outlet, useLoaderData, useNavigate, Link } from 'react-router-dom'

export async function loader({ request, params })  {
  console.log("Song detail loader running")
  const id = params.id

  const url = new URL(request.url)
  const name = url.searchParams.get("name")
  const image = url.searchParams.get("image")
  const artist = url.searchParams.get("artist")

  const accessToken = localStorage.getItem("access_token")

  try {
      const audioFeatureResponse = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
                                      headers: {
                                            Authorization: "Bearer " + accessToken
                                      }
      })
      const audioFeatures = await audioFeatureResponse.json();
      localStorage.setItem(`af_${id}`, JSON.stringify(audioFeatures));
      return { name, image, id, audioFeatures, artist, url };
  } catch (error) {
      console.log("Error while fetching audio features...")
      console.log(error);
      return null;
  }
}

export default function SongDetail() {
  const { name, image, id, audioFeatures, artist, url } = useLoaderData()
  const navigate = useNavigate()

  console.log("Inside song detail component...")
  console.log("Audio features: ", audioFeatures);
  console.log("Name: ", name);
  console.log("Image: ", image);
  console.log("Artist: ", artist);
  console.log("url", url)

  const getRecommendations = () => {
    console.log("Recommendations...")
  }

  const getAudioFeature = () => {
    console.log("Audio Features...")
    navigate(`features${url.search}`)
  }
  return (
    <main className='h-fit p-10'>
      <section className='flex  gap-2'>
        <div className=" flex flex-col gap-1 max-w-[400px]">
          <img src={image} className="rounded-xl mb-2"></img>
          <p>Track: {name}</p>
          <p>Artist: {artist}</p>
        </div> 
        <div className='flex-1 flex flex-col'>
          <div className="flex justify-around ">
            <button onClick={getRecommendations} className="rounded-xl w-40 h-10 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white">Recommendations</button>
            <Link to={`features${url.search}`}>
              <button className="rounded-xl w-40 h-10 bg-[#6C733D] p-2 hover:bg-[#9DA65D] hover:text-white">Audio Features</button>
            </Link>
          </div>
          <div className=''>
            <Outlet context={audioFeatures}/>
          </div>
        </div>
      </section>
    </main>
  )
}
