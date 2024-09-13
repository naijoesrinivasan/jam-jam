import React from "react";

const endPoint = 'https://accounts.spotify.com/authorize?';
const response_type = 'code';
const redirect_uri = 'http://localhost:5173/songs';
const client_id = '856e9ad5e4a946d2aee20e5a7f3aae75';
const scope = 'user-read-private user-read-email user-top-read';
const params = new URLSearchParams({
  client_id: client_id,
  response_type: response_type,
  redirect_uri: redirect_uri,
  scope: scope,
  state: "123"
});
const authEndpoint = `${endPoint}${params}`;

export default function Music() {
  return (
    <main className="row-span-11 grid grid-cols-3 gap-2 p-3 border-2 border-green-600">
      <section className=" border-2 border-red-600 flex flex-col gap-4 items-center">
        <div className="rounded-r-xl h-fit bg-lightBlack p-4">
          <h2 className="text-vividMagenta pb-2">Discover Your Music Universe</h2>
          <p>Welcome to your personalized music hub, where your eclectic taste finds its perfect companion. 
             Whether you're vibing to classic rock, immersing in hip-hop beats, or diving into indie and experimental sounds, 
             this platform brings all your Spotify data to life. Seamlessly connect your Spotify account to view your profile, 
             explore playlists, and dive deeper into your unique music journey.
          </p>
          <p>Music is more than just sound—it's an experience. Let's explore yours.</p>
        </div>
        <div className="col-start-1">
          <a href={authEndpoint} target=""><button className="rounded-xl h-12 bg-neonGreen p-2">Play Around</button></a>
        </div>
      </section>
      <div className="border-2 border-red-600">Div 2</div>
      <div className="grid grid-rows-2 border-2 border-red-600">Div 3</div>
      
    </main>
  )
}

// border-2 border-red-500 
// border-2 border-white 