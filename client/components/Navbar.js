import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { me, logout } from '../store/authReducer';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import AllMemes from './AllMemes';
const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isLogged = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(isLogged);
  useEffect(() => {
    dispatch(me());
  }, []);
  return (
    <AppBar position="relative">
      <Container maxwidth="xl">
        <Toolbar>
          <Button color="inherit" component={Link} to="/home">
            <Typography sx={{ fontFamily: 'Syne' }}>MemeSupreme</Typography>
          </Button>

          {isLoggedIn && isLogged.roleId === 1 ? (
            <div>
              {/* The navbar will show these links after you log in and you are a admin */}

              <a href="#" onClick={() => dispatch(logout())}>
                Logout
              </a>
              <Button color="inherit" component={Link} to="/memes">
                Listed Memes
              </Button>
              <Button color="inherit" component={Link} to="/unlistedMemes">
                Unlisted Memes
              </Button>
              <Button color="inherit" component={Link} to="/mycart">
                View My Cart
              </Button>
              <Button color="inherit" component={Link} to="/createMeme">
                Create Meme
              </Button>
              <Button color="inherit" component={Link} to="/users">
                View All Users
              </Button>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
