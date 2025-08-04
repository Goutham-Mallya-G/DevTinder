import React from 'react'

const UserCard = ({user}) => {
    console.log(user);
  return (
     <div className='flex justify-center items-center'>
    <div className="card bg-base-300 w-66 shadow-md max-h-110">
        <figure>
            <img className='object-contain'
            src={user.photoURL}
            alt="profile picture" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user.firstName}&nbsp;{user.lastName}</h2>
            <p>{user.age},&nbsp; {user.gender === "male" ? "Male" : "Female"}</p>
            <p>{user.about}</p>
            <div className="card-actions flex justify-center gap-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Intrested</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default UserCard