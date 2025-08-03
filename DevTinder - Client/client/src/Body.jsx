import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import React from 'react';
import Footer from "./components/Footer";

const Body = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body;    