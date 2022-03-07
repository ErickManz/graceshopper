import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../store/SingleUser';
import EditUserForm from './forms/EditUserForm';

function SingleUser(props){
  const user = useSelector((state)=> state.singleUser)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser(props.match.params.id))
  },[])
  return(
    <div key= {user.id}>
      <h2>UserName:{user.username}</h2>
      <h2>Email:{user.email}</h2>
      <ul>
        <li>Street: {user.street} </li>
        <li>City: {user.city} </li>
        <li>Zip code: {user.zip} </li>
        <li>Phone Number: {user.phoneNumber}</li>
      </ul>
    <EditUserForm user ={user}/>
    </div>
  )

}
export default SingleUser;
