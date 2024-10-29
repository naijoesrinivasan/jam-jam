import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function TrackCard({ id, name, artistName, imageUrl }) {
  return (
    <div className="w-[250px] h-[300px] flex flex-col rounded-lg p-4 bg-black bg-opacity-80 hover:bg-opacity-100 overflow-clip backdrop-blur-sm">
      <Link to={`/songs/${id}`}>
        <img src={imageUrl} className="rounded-xl mb-2 w-[200px] aspect-square"></img>
      </Link>
      <div className="">
        <p className="text-ellipsis">{name}</p>
        <p>{artistName}</p>
      </div>
    </div> 
  )
}

TrackCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  artistName: PropTypes.string,
  imageUrl: PropTypes.string
};