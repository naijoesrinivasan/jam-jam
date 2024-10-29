import { useLoaderData } from "react-router-dom"

export default function SongDetail() {
  const { track, audioFeatures } = useLoaderData();
  console.log("Song detail page: \nTracks: ", track, "\nFeatures: ", audioFeatures);
  return (
    <section className="grid grid-rows-2 grid-cols-3 text-white flex-grow">
      <div className="border"><h1>Song details page</h1></div>
    </section>
  )
}
