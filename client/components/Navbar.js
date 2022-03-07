import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { me } from '../store';
const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isLogged = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(isLogged);
  useEffect(() => {
    dispatch(me());
  }, []);
  return (
    <div>
      <h1>MemeSupreme</h1>
      <nav>
        {isLoggedIn && isLogged.roleId === 1 ? (
          <div>
            {/* The navbar will show these links after you log in and you are a admin */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/memes">Listed Memes</Link>
            <Link to="/unlistedMemes">Unlisted Memes</Link>
            <Link to="/mycart">View My Cart</Link>
            <Link to="/createMeme">Create Meme</Link>
            <Link to="/users">View All Users</Link>
          </div>
        ) : isLoggedIn && isLogged.roleId === 2 ? (
          <div>
            {/* The navbar will show these links after you log in and you are a users */}
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
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>

            <Link to="/memes">All Memes</Link>
            <Link to="/mycart">View My Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
