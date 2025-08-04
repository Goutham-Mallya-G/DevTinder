import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {BE_URL} from "../../utils/constant"
import { removeUser } from "../../utils/Slice/userSlice";

const NavBar = () => {
  const data = useSelector((slice)=> slice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async() => {
    try{
      await axios.post(BE_URL + "/logout" , {} ,{withCredentials : true});
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){
      console.log("Error : " +  err.message);
    }
  }

  return (
    <div>
    {data && <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to='/'><button className="btn btn-ghost text-xl">DevTinder</button></Link>
  </div>
  <div className="mr-3">
      <p>welcome </p>
      <p>{data.firstName}</p>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={data.photoURL}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-32 p-2 shadow text-center">
        <Link className="btn" to="/profile">
            Profile
        </Link>
        <Link className="btn">Settings</Link>
        <Link className="btn" onClick={handleLogout}>Logout</Link>
      </ul>
    </div>
  </div>
  </div>}
  </div>
  )
}

export default NavBar