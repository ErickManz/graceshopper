import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { me } from '../store';
import { getUsers,editUser } from '../store/userReducer';

function AllUser(props) {
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state)=> state.auth.id)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(me())

  }, []);
  const handleSubmit = (e, id, num) => {
    e.preventDefault();
    dispatch(editUser(id, {roleId: num}));
  };
  return (
    <div>
      {users.map((user) => {

         if (user.roleId === 1 && user.id !== currentUser) {
          return (
            <div key={user.id}>
              <h2>
                Id {user.id}{' '}
                username: {user.username} {""}
                 role: admin
                 <button type="button" onClick={(e)=>handleSubmit(e,user.id, 2)}> demote to user</button>
              </h2>
            </div>
          );
        } else if(user.roleId === 2 && user.id !== currentUser) {
          return (
            <div key={user.id}>
              <h2>
                Id {user.id}{" "}
                username: {user.username} {""}
                 role: customer
                 <button type="button" onClick={(e)=>handleSubmit(e,user.id, 1)}> Make Admin</button>

              </h2>
            </div>
          );
        }
      })}
    </div>
  );
}
export default AllUser;
