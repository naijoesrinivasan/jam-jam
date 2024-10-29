import PropTypes from "prop-types";

export default function ArtistCard({ id, imageUrl, name, popularity }) {
  return (
    <div key={id} className="w-[250px] h-[300px] rounded-lg p-4 bg-black bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm">
      <img src={imageUrl} className="rounded-xl mb-2 w-[200px] aspect-square cursor-pointer"></img>
      <p>{name}</p>
      <p>{popularity}</p>
    </div> 
  );
};

ArtistCard.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  popularity: PropTypes.number
};