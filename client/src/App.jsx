import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomeLayout from "./layouts/Home"
import Songs from "./components/Songs"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
    },
    {
      path:"/songs",
      element: <Songs />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}