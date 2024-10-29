import { useLoaderData } from 'react-router-dom';
import ArtistCard from '../components/artists/ArtistCard';

export default function TopArtists() {
  const artistData = useLoaderData();

  return (
    <main className="flex flex-row p-10 justify-center gap-10 flex-wrap overflow-auto">
      {artistData.map((item) => ( 
        <ArtistCard 
          key={item.id}
          id={item.id} 
          imageUrl={`${item.images[1].url}`} 
          name={item.name} 
          popularity={item.popularity}
        />
      ))}
    </main>
  );
};
