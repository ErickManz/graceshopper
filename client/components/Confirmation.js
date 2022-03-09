import React from 'react';
import { useSelector } from 'react-redux';

//temporary value for login state

export default function Confirmation() {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  localStorage.clear();
  return (
    <div className="container">
      <div className="message">Order Confirmed!</div>
      {isLoggedIn ? (
        <a>View Transactions</a>
      ) : (
        <a>Create Account to review transactions</a>
      )}
    </div>
  );
}
