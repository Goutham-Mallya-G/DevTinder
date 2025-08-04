import { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/Slice/userSlice';
import { BE_URL } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async()=>{
      try{
        const res = await axios.post(BE_URL + "/login" , {emailId , password},{withCredentials:true});
        console.log(res.data);
        dispatch(addUser(res.data));
        return navigate("/");
      }catch(err){
        console.log("Error : " + err.message)
      }
  }

  return (
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <p className='text-center text-xl font-bold'>Login</p>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="btn bg-blue-900 mt-4" onClick={handlelogin}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login