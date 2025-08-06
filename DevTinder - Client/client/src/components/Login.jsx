import { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/Slice/userSlice';
import { BE_URL } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [gender , setGender] = useState("Select your Gender");
  const [age , setAge] = useState("");
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");
  const [isLogin ,setIsLogin] = useState(true);
  const [error, setError] = useState("");
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

  const handleSignup = async() => {
      setError("");
    
      if (!firstName || !lastName || gender === "Select your Gender" || !age || !emailId || !password) {
        setError("All fields are required");
        setTimeout(()=>{
          setError("");
        },2000)
        return;
      }
      
      if (parseInt(age) < 18 || parseInt(age) > 120) {
        setError("Age must be between 18 and 120");
        return;
      }
      
      try{
        const res = await axios.post(BE_URL + "/signup" , {firstName , lastName , gender , age: parseInt(age) , emailId , password} , {withCredentials : true});
        dispatch(addUser(res.data));
        return navigate("/profile")
      }catch(err){
        const errorMessage = err.response?.data || err.message || "Signup failed";
        setError(errorMessage);
        console.log("Error : " + err.message);
        console.log("Response data:", err.response?.data);
        console.log("Status:", err.response?.status);
      }
  }

  return (
    <div>
    <div>
    {error && <div className="toast toast-top toast-end">
  <div className="alert bg-red-500">
    <span>{error}</span>
  </div>
</div>}
</div>
    <div className='flex justify-center'>
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <p className='text-center text-xl font-bold'>{isLogin?"Login" : "Sign Up"}</p>
          
          {!isLogin && <div className='space-y-1'>
          <label className="label">First Name</label>
          <input type="text" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

          <label className="label">Last Name</label>
          <input type="text" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

          <label className="label">Gender</label>
          <div className='flex flex-col'>
          <div className="dropdown">
            <div tabIndex={0} className="input">{gender}</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><button onClick={()=>setGender("male")}>Male</button></li>
                <li><button onClick={()=>setGender("female")}>Female</button></li>
                <li><button onClick={()=>setGender("others")}>Others</button></li>
              </ul>
            </div>
          </div>


          <label className="label">Age</label>
          <input type="number" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>

        </div>}

        
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={emailId} onChange={(event) => setEmailId(event.target.value)}/>

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn bg-blue-900 mt-4" onClick={isLogin ? handlelogin : handleSignup}>{isLogin ? "Login" : "Sign up"}</button>

          <p className='cursor-pointer text-center' onClick={()=>setIsLogin(!isLogin)}>{isLogin ? "New user ? Sign Up ! " : "Existing user ? Log in !"}</p>
      </fieldset>
    </div>
    </div>
  )
}

export default Login