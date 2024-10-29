import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const track = {
  name: "",
  album: { images: [{ url: "" }] },
  artists: [{ name: "" }]
};

function WebPlayback() {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [loading, setLoading] = useState(true); // Add a loading state
  const playerRef = useRef(null);  // Use ref for the player object
  const token = localStorage.getItem('access_token')
  const { uri } = useOutletContext()
  console.log("Uri in playback: ", uri, typeof uri)

  // Ensure Web SDK player is properly initialized
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      playerRef.current = player;

      // Player is ready
      playerRef.current.addListener('ready', ({ device_id }) => {
        console.log('Player ready with Device ID:', device_id);
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
          headers: {
            Authorization: "Bearer " + token
          },
          method: 'PUT',
          body: JSON.stringify({ uris: [uri] })
        })
          .then(res => console.log("Response after playback: ", res))
          .then(res => console.log(res))
          .catch(err => console.log(err))
        setLoading(false);  // Player is ready, stop showing loading
      });

      // Player is not ready
      playerRef.current.addListener('not_ready', ({ device_id }) => {
        console.log('Player not ready with Device ID:', device_id);
        setActive(false);
      });

      // Listen to state changes
      playerRef.current.addListener('player_state_changed', (state) => {
        if (!state) {
          console.log('Player state is null.');
          return;
        }

        console.log('Player state changed:', state);
        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        // Check if player is active
        playerRef.current.getCurrentState().then(state => {
          if (!state) {
            console.log('Player state is not active.');
            setActive(false);
          } else {
            setActive(true);
          }
        }).catch(error => {
          console.error('Error getting current state:', error);
        });
      });

      // Connect the player and activate it
      playerRef.current.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
          playerRef.current.activateElement(); // Activate the player after connection
        } else {
          console.error('Failed to connect to the Web Playback SDK');
        }
      });
    };
  }, [token]);

  // Retry logic for playback control
  const retryTogglePlay = (player, retries = 3) => {
    return new Promise((resolve, reject) => {
      function attempt() {
        playerRef.current.togglePlay().then(resolve).catch((error) => {
          if (retries > 0) {
            console.log('Retrying togglePlay...');
            retries--;
            setTimeout(attempt, 500); // Retry after 500ms
          } else {
            reject('Unable to toggle play after retries.');
          }
        });
      }
      attempt();
    });
  };

  const retryPreviousTrack = (player, retries = 3) => {
    return new Promise((resolve, reject) => {
      function attempt() {
        playerRef.current.previousTrack().then(resolve).catch((error) => {
          if (retries > 0) {
            console.log('Retrying previousTrack...');
            retries--;
            setTimeout(attempt, 500);
          } else {
            reject('Unable to go to previous track after retries.');
          }
        });
      }
      attempt();
    });
  };

  const retryNextTrack = (player, retries = 3) => {
    return new Promise((resolve, reject) => {
      function attempt() {
        playerRef.current.nextTrack().then(resolve).catch((error) => {
          if (retries > 0) {
            console.log('Retrying nextTrack...');
            retries--;
            setTimeout(attempt, 500);
          } else {
            reject('Unable to go to next track after retries.');
          }
        });
      }
      attempt();
    });
  };

  if (!is_active) {
    return (
      <div className="container">
        <div className="main-wrapper">
          {loading ? (
            <b>Loading player...</b>  // Display while loading
          ) : (
            <b>Instance not active. Transfer your playback using your Spotify app</b>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-2 border-red-500">
        <div className="main-wrapper">
          <img src={current_track?.album.images[0].url} className="now-playing__cover" alt="" />
          <div className="now-playing__side">
            <div className="now-playing__name">{current_track?.name}</div>
            <div className="now-playing__artist">{current_track?.artists[0].name}</div>

            <button className="btn-spotify" onClick={() => {
              retryPreviousTrack(playerRef.current).catch(error => {
                console.error('Error with previousTrack:', error);
              });
            }}>
              &lt;&lt;
            </button>

            <button className="btn-spotify" onClick={() => {
              retryTogglePlay(playerRef.current).catch(error => {
                console.error('Error with togglePlay:', error);
              });
            }}>
              {is_paused ? "PLAY" : "PAUSE"}
            </button>

            <button className="btn-spotify" onClick={() => {
              retryNextTrack(playerRef.current).catch(error => {
                console.error('Error with nextTrack:', error);
              });
            }}>
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default WebPlayback;
