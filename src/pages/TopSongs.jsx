import { useLoaderData } from "react-router-dom";
import TrackCard from "../components/tracks/TrackCard";


export default function TopSongs()  {
  const trackData = useLoaderData();
  console.log("Top tracks: ", trackData)

  return(
    <main className="flex p-10 justify-center gap-10 flex-wrap overflow-scroll">
      {trackData.map(item => (
        <TrackCard 
          key={item.id} 
          id={item.id} 
          imageUrl={`${item.album.images[1].url}`} 
          name={item.name} 
          artistName={item.artists[0].name}
        />
      ))}
    </main>
  );
};