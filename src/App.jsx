import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Songs, { loader as songsLoader } from "./components/Songs"
import { auth } from "./utils"
import Login, { loader as loginLoader } from "./pages/Login"
import Home, { loader as homeLoader } from "./pages/Home"
import Artists, { loader as artistsLoader } from "./components/Artists"
import SongDetail, { loader as songDetailLoader } from "./pages/SongDetail"
import AudioFeatures from "./components/AudioFeatures"
import SDK from "./components/SDK"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      loader: async () => {
        console.log("HomeLayout Loader running...")
        try{
          const response = await auth();
          console.log("Auth allowed: ", response);
          return null;
        } catch(err) {
          console.log("Error: ", err);
          return redirect(`/login?message=${err.message}`)
        }
      },
      children: [
        {
          path: "home",
          index: true,
          element: <Home />,
          loader: homeLoader
        },
        {
          path: "songs",
          element: <Songs />,
          loader: songsLoader,
        },
        {
          path: "songs/:id",
          element: <SongDetail />,
          loader: songDetailLoader,
          children: [
            {
              path: "features",
              element: <AudioFeatures />
            }
          ]
        },
        {
          path: "artists",
          element: <Artists />,
          loader: artistsLoader
        },
        {
          path: "sdk",
          element: <SDK />
        }
      ] 
    },
    {
      path: "login",
      element: <Login />,
      loader: loginLoader
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}