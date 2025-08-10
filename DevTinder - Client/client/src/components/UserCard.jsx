import React from 'react'
import axios from "axios";
import {BE_URL} from "../../utils/constant";
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../utils/Slice/feedSlice';
const UserCard = ({user}) => {

    const dispatch = useDispatch();

    const setConnection = async(status , _id) => {
        try{
            await axios.post(BE_URL + "/request/sent/" + status + "/" + _id , {} , {withCredentials : true});
            dispatch(removeFeed(_id));
        }catch(err){
            console.log("Error : " + err.message);
        }
    } 
  return (
     <div className='flex justify-center items-center'>
    <div className="card bg-base-300 w-66 shadow-md max-h-110">
        <figure>
            <img className='object-contain'
            src={user.photoURL}
            alt="profile picture" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}&nbsp;{user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
            <p>{user.age},&nbsp; {user.gender === "male" ? "Male" : user.gender === "female" ? "Female" : "Others"}</p>
            <p>{user.about}</p>
            <div className="card-actions flex justify-center gap-4">
            <button className="btn btn-secondary" onClick={()=>setConnection("ignored" , user._id)}>Ignore</button>
            <button className="btn btn-primary"onClick={()=>setConnection("intrested" , user._id)}>Intrested</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default UserCard