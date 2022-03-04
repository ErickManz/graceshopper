import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>memeMart</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/memes">All Memes</Link>

            <Link to="/mycart">View My Cart</Link>

          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/memes">All Memes</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
