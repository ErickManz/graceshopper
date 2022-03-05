import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../store/User';
import { me } from '../store';

function AllUser(props){
 const users = useSelector((state)=> state.user);
 const {currentUser} = useSelector((state)=> state.auth)
 const dispatch = useDispatch();

useEffect(()=>{
  dispatch(me());
  dispatch(getUser());
},[])

  return("hello")
}
export default AllUser;
