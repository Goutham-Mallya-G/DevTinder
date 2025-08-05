import React from 'react'
import UserCard from './UserCard'
import {BE_URL} from "../../utils/constant"
import { useEffect } from 'react'
import {useDispatch , useSelector} from "react-redux";
import { addFeed } from '../../utils/Slice/feedSlice';
import axios from "axios";
const Feed = () => {
  const feed = useSelector((slice)=>slice.feed);
  const dispatch = useDispatch();
  const getFeed = async() =>{
    if(feed) return;
    try{
      const res = await axios.get(BE_URL + "/userList/feed" , {withCredentials : true});
      dispatch(addFeed(res?.data))
    }catch(err){
      console.log("Error : " + err.message);
    }
  }

  useEffect(()=>{
    getFeed()
  },[])

  return (
    <div>
  {feed && <UserCard user={feed[0]} />}
   </div>
  )
}

export default Feed