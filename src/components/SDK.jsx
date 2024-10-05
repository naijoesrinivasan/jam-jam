import React, { useEffect, useState } from 'react'
const track = {
  name: "",
  album: {
    images: [
      { url: "" }
    ]
  },
  artists: [
    { name: "" }
  ]
}
export default function SDK() {
  const [player, setPlayer] = useState(undefined);
  useEffect(() => {
    async function playMusic() {
      const accessToken = await localStorage.getItem("access_token");

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = accessToken
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });
        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('initialization_error', ({ message }) => {
          console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
          console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('player_state_changed', (state => {

          if (!state) {
            return;
          }

          // setTrack(state.track_window.current_track);
          // setPaused(state.paused);


          // player.getCurrentState().then(state => {
          //   (!state) ? setActive(false) : setActive(true)
          // });

        }));

        // document.getElementById('togglePlay').onclick = function () {
        //   player.togglePlay();
        // };

        player.connect();
      }
    }
    playMusic();


  }, [])

  return (
    <div>
      SDK
      <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
        play
      </button>

    </div>
  )
}
