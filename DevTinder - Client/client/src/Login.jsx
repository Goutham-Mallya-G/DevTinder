import { useState } from 'react';
import axios from "axios";
const Login = () => {
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");

  const handlelogin = async()=>{
      try{
        const res = await axios.post("http://localhost:3000/login" , {emailId , password},{withCredentials:true});
        console.log(res.data);
      }catch(err){
        console.log("Error : " + err.message)
      }
  }

  return (
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="btn btn-neutral mt-4" onClick={handlelogin}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login