import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomeLayout from './layouts/HomeLayout';
import TopSongs from "./pages/TopSongs"
import Login from "./pages/Login"
import TopArtists from "./pages/TopArtists"
import SongDetail from "./pages/SongDetail"
import AudioFeatures from "./components/AudioFeatures"
import SDK from "./components/SDK"
import Playback from "./components/Playback"

// loaders
import { homeLoader, topSongsLoader, topArtistsLoader, songDetailLoader } from './lib/loaders'
import Home from "./pages/Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      loader: homeLoader,
      children: 
        [
          {
            index: true,
            element: <Home />
          },
          {
            path: "topsongs",
            element: <TopSongs />,
            loader: topSongsLoader
          },
          {
            path: "topartists",
            element: <TopArtists />,
            loader: topArtistsLoader
          },
          {
            path: "songs/:id",
            element: <SongDetail />,
            loader: songDetailLoader,
          },
        ]
    },
    {
      path: "sdk",
      element: <SDK />
    },
    {
      path: "login",
      element: <Login />,
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}