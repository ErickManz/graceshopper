import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../store/User';

function AllUser(props){
 const users = useSelector((state)=> state.user.users);
 const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getUsers());
},[])

  return(
    <div>
      {users.map((user)=>{
        if(user.roleId === 1){
          return(
            <div key={user.id}>
            <h2>Id {user.id} <Link to={`/user/${user.id}`}> username: {user.username} </Link> role: admin</h2>
            </div>
          )
        }else {
        return(
          <div key={user.id}>
            <h2>Id {user.id} <Link to={`/user/${user.id}`}> username: {user.username} </Link> role: customer</h2>
          </div>
        )
        }
      })}
    </div>
  )
}
export default AllUser;
