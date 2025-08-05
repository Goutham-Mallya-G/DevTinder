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
    try{
      const res = await axios.get(BE_URL + "/userList/feed" , {withCredentials : true});
      dispatch(addFeed(res?.data))
    }catch(err){
      console.log("Error fetching feed: " + err.message);
    }
  }

  useEffect(()=>{
    getFeed()
  },[])

  if(!feed || feed.length === 0) {
    return (
      <div className="flex justify-center p-4">
        <p>No more users to show in feed</p>
      </div>
    );
  }

  return (
    <div>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed