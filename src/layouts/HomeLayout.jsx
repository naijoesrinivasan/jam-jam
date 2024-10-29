import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import { Outlet, useLoaderData } from "react-router-dom";

export default function HomeLayout()  {
  const { userData, topTracks, topArtists, recommendations, featuredPlaylists } = useLoaderData();

  return (
    <section className="h-full flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row flex-grow overflow-auto">
        <Sidebar />
        {/* <div className="border" /> */}
        <Outlet context={{recommendations, userData, topTracks, topArtists, featuredPlaylists}}/>
        <Bottombar/>
      </div>
    </section>
  )
}