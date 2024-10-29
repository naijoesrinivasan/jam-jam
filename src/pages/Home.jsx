import { useOutletContext, Link } from "react-router-dom";
import { FeaturedPlaylists, RecommendedPlaylists } from "../components/Playlists";

export default function Home() {
  const { recommendations, featuredPlaylists } = useOutletContext();
  const recommendedTracks = recommendations.tracks;
  const playlists = featuredPlaylists.playlists.items;

  console.log("Data in home: ", recommendations, featuredPlaylists)
  return (
    <section className='flex-grow flex flex-col p-10 justify-center gap-10 flex-wrap overflow-scroll' >
      <FeaturedPlaylists playlists={playlists}/>
      <RecommendedPlaylists playlists={recommendedTracks}/>
    </section>
  )
}
