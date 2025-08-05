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
    <div className='max-w-4xl mx-auto px-4'>
    <div className='flex justify-center font-bold text-xl sm:text-2xl p-3 sm:p-5'>Connections</div>
    {connections.map((connection) => {
        const {_id , firstName , lastName , age , about , gender , photoURL} = connection;

        return(
            <div className='flex rounded-xl sm:rounded-2xl bg-base-300 mb-2 sm:mb-3 mx-2 sm:mx-0'>
            <div key={_id} className='flex items-center p-2 sm:p-4 flex-shrink-0'>
                <img className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover" src={photoURL}/>
            </div>
            <div className='flex flex-col justify-center gap-1 flex-grow min-w-0 p-2 sm:p-3'>
                <p className='font-bold text-sm sm:text-base truncate'>{firstName + " " + lastName}</p>
                <p className='text-xs sm:text-sm'>{age},&nbsp;{gender}</p>
                <p className='text-xs sm:text-sm truncate'>{about}</p>
            </div>
            </div>

        )

    })}
    </div>
  )
}

export default Connections