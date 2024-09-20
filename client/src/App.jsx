import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import HomeLayout from "./layouts/HomeLayout"
import Songs, { loader as songsLoader } from "./components/Songs"
import { auth } from "./utils"
import Login, { loader as loginLoader } from "./pages/Login"
import Home, { loader as homeLoader } from "./pages/Home"
import Artists, { loader as artistsLoader } from "./components/Artists"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      loader: async () => {
        try{
          const response = await auth();
          console.log("User is logged in: ", response);
          return null;
        } catch(err) {
          console.log("Error: ", err);
          return redirect(`/login?message=${err.message}`)
        }
      },
      children: [
        {
          path: "home",
          element: <Home />,
          loader: homeLoader
        },
        {
          path: "songs",
          element: <Songs />,
          loader: songsLoader
        },
        {
          path: "artists",
          element: <Artists />,
          loader: artistsLoader
        }
      ] 
    },
    {
      path: "/login",
      element: <Login />,
      loader: loginLoader
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}