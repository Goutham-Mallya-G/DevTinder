import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"
const Profile = () => {
  const user = useSelector((slice)=>(slice.user));
  return (
    <div>
      {user && <EditProfile user ={user}/>}
    </div>
  )
}

export default Profile