import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import React from 'react';
import Footer from "./components/Footer";
import axios from "axios";
import { BE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slice/userSlice";
import { useEffect , useState } from "react";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[theme , setTheme] = useState(()=>{
    const storedtheme = localStorage.getItem('theme');
    if(storedtheme === null){
      localStorage.setItem('theme', JSON.stringify(true));
      return true;
    }
    return JSON.parse(storedtheme); 
  })
  
  const fetchUser = async () => {
    try{
      const res = await axios.get(BE_URL + "/profile" , {withCredentials : true});
      dispatch(addUser(res.data));
    }catch(err){
      if(err.response?.status === 401){
       navigate("/login");
      }else{
      console.log("Error : " + err.message);
      }
    }
  }

  useEffect(()=>{
    fetchUser();
  } , []);

  return (
    <div data-theme={theme ? "dark" : "light"}>
     <div className="h-screen flex flex-col w-full overflow-x-hidden">
       <NavBar theme= {theme} setTheme={setTheme}/>
       <div className="flex-grow flex justify-center items-center">
         <Outlet/>
       </div>
       <Footer/>
     </div>
     </div>
  )
}

export default Body;    