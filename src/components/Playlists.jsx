import { Link } from "react-router-dom"

export function FeaturedPlaylists({ playlists }) {
  return (
    <div className='flex-1 overflow-auto'>
      <h1>Featured Playlists</h1>
      <div className="flex flex-nowrap gap-2 overflow-x-scroll">
        {playlists.map((item) => (
          <div key={item.id} className="w-[250px] h-[300px] bg-black bg-opacity-80 hover:bg-opacity-100 flex flex-col rounded-lg p-4 overflow-clip">
            <Link to={`/songs/${item.id}`}>
              <img src={`${item.images[0].url}`} className="rounded-xl mb-2 w-[200px] aspect-square"></img>
            </Link>
            <div className="">
              <p className="text-ellipsis">{item.name}</p>
            </div>
          </div> 
        ))}
      </div>
    </div>
  )
}

export function RecommendedPlaylists({ playlists })  {
  return (
    <div className="flex-1 overflow-auto">
      <h1>Recommended playlists</h1>
      <div className="flex gap-2 overflow-x-scroll">
      {playlists.map(item => 
        <div key={item.id} className="w-[250px] h-[300px] bg-black bg-opacity-80 hover:bg-opacity-100 flex flex-col rounded-lg p-4 overflow-clip">
          <Link to={`/songs/${item.id}`}>
            <img src={`${item.album.images[0].url}`} className="rounded-xl mb-2 w-[200px] aspect-square"></img>
          </Link>
          <div className="">
            <p className="text-ellipsis">{item.name}</p>
            <p>{item.artists[0].name}</p>
          </div>
        </div> 
      )}
      </div>
    </div>
  )
}
