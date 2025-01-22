
# Jam-Jam: A Spotify Utility App 🎵

A powerful web application that leverages Remix Router and the Spotify API to provide users with insights into their Spotify data. View your top artists, songs, modify playlists, and enjoy a music playback feature with an interactive visualizer built with React-Three-Fiber.




## Features

- **OAuth Authentication**: Secure login with Spotify.
- **Data Insights**: View top artists, tracks, and playlists using the Spotify API.
- **Playlist Management**: Modify and manage playlists through HTTP requests.
- **Audio Analysis**: Visualize track audio analysis with dynamic charts using Chart.js.
- **Music Playback**: Play tracks with a React-Three-Fiber visualizer for a stunning interactive - experience.



## Tech Stack

- **Remix Router**: For routing and server-side rendering.
- **Express.js**: Backend server for handling requests and authentication.
- **React-Three-Fiber**: 3D visualizer for music playback.
- **Chart.js**: Visual representation of audio analysis data.
- **Spotify API**: Data integration and user interactions.


## Config + Run Locally

 1. Clone the project

```bash
  git clone https://github.com/naijoesrinivasan/jam-jam.git
```

 2. Go to the project directory

```bash
  cd spotify-utility-app
```

3. Set up an app on the Spotify Developer Dashboard:
  - Go to Spotify Developer Dashboard.
  - Create a new app and retrieve the Client ID and Client Secret.
  - Set the redirect URI as http://localhost:3000/auth/callback.

4. Create a .env file in the project root and add the following variables:
```bash
  SPOTIFY_CLIENT_ID=your_spotify_client_id
  SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

5. Install dependencies:

```bash
  npm install
```

6. Run the application in development mode:

```bash
  npm run dev
```


## Usage

- Navigate to http:localhost:3000
- Login using your Spotify account
- Explore your Spotify data, manage playlists, and enjoy the visualised playback




## Acknowledgements

- [Spotify](https://open.spotify.com/) for their robust API
- [React-Three-Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) for making 3D rendering in React seamless
- [Chart.js](https://www.chartjs.org/) for dynamic and interactive charts
