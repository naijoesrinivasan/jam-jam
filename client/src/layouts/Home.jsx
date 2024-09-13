import React from "react";
import Header from "../components/Header";
import Music from "../components/Music";
import { Outlet } from "react-router-dom";

export default function HomeLayout()  {
  return (
    <>
      <Header />
      <Music />
    </>
  )
}