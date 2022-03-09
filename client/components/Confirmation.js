import React from 'react';

//temporary value for login state
const isLoggedIn = false;

export default function Confirmation() {
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
