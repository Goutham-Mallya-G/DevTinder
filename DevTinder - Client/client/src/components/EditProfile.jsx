import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { BE_URL } from '../../utils/constant';
import axios from 'axios';
import { addUser } from '../../utils/Slice/userSlice';
import UserCard from './UserCard';


const editProfile = ({user}) => {
  const dispatch = useDispatch();
  
  const [firstName , setFirstName] = useState(user.firstName);
  const [lastName , setLastName] = useState(user.lastName);
  const [age , setAge] = useState(user.age);
  const [photoURL , setPhotoURL] = useState(user.photoURL);
  const [about , setAbout] = useState(user.about);
  const [toast , setToast] = useState(false);

  const handleUpdate = async() =>{
    try{
      const res = await axios.patch(BE_URL + "/update",{firstName , lastName , age , photoURL , about},{withCredentials : true})
      dispatch(addUser(res?.data))
      setToast(true);
      setTimeout(()=>{
        setToast(false);
      },3000);
    }catch(err){
      console.log("Error : "+ err.message);
    }
  }

  return (
    <div className='flex justify-center items-center gap-5'>
    {user && <div className='flex justify-center items-center p-5'>
    <div className="card bg-base-300 w-106 shadow-sm flex flex-col items-center">
    <div className="card-body">
    <h2 className="font-bold text-xl text-center">Edit your profile</h2>
  <fieldset className="fieldset">
    <legend className="fieldset-legend">First Name</legend>
    <input type="text" className="input w-80" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
  </fieldset>
  <fieldset className="fieldset">
    <legend className="fieldset-legend">Last Name</legend>
    <input type="text" className="input" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
  </fieldset>
  <fieldset className="fieldset">
    <legend className="fieldset-legend">Age</legend>
    <input type="text" className="input" value={age} onChange={(e)=>{setAge(e.target.value)}} />
  </fieldset>
  <fieldset className="fieldset">
    <legend className="fieldset-legend">Photo URL</legend>
    <input type="text" className="input" value={photoURL} onChange={(e)=>{setPhotoURL(e.target.value)}} />
  </fieldset>
  <fieldset className="fieldset">
    <legend className="fieldset-legend">About</legend>
    <textarea className="textarea" value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
  </fieldset>
    <button className="btn btn-primary w-50 mx-auto" onClick={handleUpdate}>Save</button>
  </div>
</div>
</div>}
<div>
  <UserCard user={user}></UserCard>
</div>
    {toast && <div className="toast toast-top toast-end">
  <div className="alert alert-success">
    <span>Profile Updated successfully.</span>
  </div>
</div>}
</div>
  )
}

export default editProfile