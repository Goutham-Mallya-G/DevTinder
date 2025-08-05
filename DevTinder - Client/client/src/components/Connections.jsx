import axios from 'axios'
import React from 'react'
import { BE_URL } from '../../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../../utils/Slice/connectionSlice'

const Connections = () => {
    const connections = useSelector((slice)=>(slice.connection))
    const dispatch = useDispatch();
    const getConnections = async() =>{
        try{
            const res = await axios.get(BE_URL + "/userList/connection" , {withCredentials : true})
            console.log(res.data);
            dispatch(addConnections(res.data));
        }catch(err){
            console.log("Error : " + err.message);
        }
    }

    useEffect(() => {
        getConnections();
    },[]);

    if(!connections) return;

    if(connections && connections.length === 0){
        return <p>There are no Connections</p>
    }

  return (
    <div>
    <div className='flex justify-center font-bold text-2xl p-5'>Connections</div>
    {connections.map((connection) => {
        const {_id , firstName , lastName , age , about , gender , photoURL} = connection;

        return(
            <div className='flex md:h-4/12 md:w-6/12 m-auto rounded-2xl bg-base-300 mb-3'>
            <div key={_id} className='flex items-center p-4'>
                <img className="w-20 h-20 rounded-full" src={photoURL}/>
            </div>
            <div className='flex flex-col justify-center gap-1'>
                <p className='font-bold'>{firstName + " " + lastName}</p>
                <p className='text-sm'>{age},&nbsp;{gender}</p>
                <p>{about}</p>
            </div>
            </div>

        )

    })}
    </div>
  )
}

export default Connections