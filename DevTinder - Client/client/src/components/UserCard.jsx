import React from 'react'

const UserCard = ({user}) => {
  return (
     <div className='flex justify-center items-center'>
   <div className="card bg-base-300 w-66 shadow-sm">
  <figure>
    <img
      src={user.photoURL}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName}</h2>
    <p>{user.description}</p>
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