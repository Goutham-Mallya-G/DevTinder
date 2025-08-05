import axios from 'axios'
import React, { useEffect } from 'react'
import { BE_URL } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../../utils/Slice/requestsSlice'

const Requests = () => {

    const requests = useSelector((slice)=>(slice.requests));

    const dispatch = useDispatch();

    const setStatus = async(status, _id)=>{
        try{
            await axios.post(BE_URL + "/request/receive/"+ status + "/" +_id , {}, {withCredentials : true});
            dispatch(removeRequest(_id));
        }catch(err){
            console.log("Error : " + err.message);
        }
    }

    const getRequests = async() => {
        try{
            const users = await axios.get(BE_URL + "/userList/request/received" , {withCredentials : true});
            dispatch(addRequests(users.data));
            console.log(users.data)
        }catch(err){
            console.log("Error : " + err.message);
        }
    }

    useEffect(()=>{
        getRequests();
    },[])

    if(requests.length === 0){
        return (
            <div className="flex justify-center p-4">
                <p>There are no new requests</p>
            </div>
        );
    }

  return (
    <div className='max-w-4xl mx-auto px-4'>
    <div>
    <div className='flex justify-center font-bold text-xl sm:text-2xl p-3 sm:p-5'>requests</div>
    {requests.map((request) => {
        const {_id , firstName , lastName , age , about , gender , photoURL} = request;

        return(
            <div key = {_id} className='flex rounded-xl sm:rounded-2xl bg-base-300 mb-2 sm:mb-3 mx-2 sm:mx-0 md:w-150'>
            <div key={_id} className='flex items-center p-2 sm:p-4 flex-shrink-0'>
                <img className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover" src={photoURL}/>
            </div>

            <div className='flex flex-col justify-center gap-1 flex-grow min-w-0 p-2 sm:p-3'>
                <p className='font-bold text-sm sm:text-base truncate'>{firstName + " " + lastName}</p>
                <p className='text-xs sm:text-sm'>{age},&nbsp;{gender}</p>
                <p className='text-xs sm:text-sm truncate'>{about}</p>
            </div>

            <div className='flex items-center gap-3 mr-3'>
                <button className="btn btn-primary" onClick={()=>setStatus("rejected" , _id)}>Reject</button>
                <button className="btn btn-secondary" onClick={()=>setStatus("accepted" , _id)}>Accept</button>
                </div>

            </div>

        )

    })}
    </div>
    </div>
  )
}

export default Requests