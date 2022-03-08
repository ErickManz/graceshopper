import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { me, logout } from '../store/authReducer';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CartBadge from './CartBadge';


import AllMemes from './AllMemes';
const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const isLogged = useSelector((state) => state.auth);
  const orderItems = useSelector((state)=> state.OrderItems)
  const dispatch = useDispatch();
  console.log(isLogged);
  useEffect(() => {
    dispatch(me());
  }, []);
  return (
    <AppBar position="relative">
      <Container maxwidth="xl">
        <Toolbar sx={{justifyContent: 'space-between'}}>
           {/*These buttons are encapsulating the React Router Link Component*/}
          <Button color="inherit" component={Link} to="/home">
            <Typography sx={{ fontFamily: 'Syne' }}>MemeSupreme</Typography>
          </Button>

          {isLoggedIn && isLogged.roleId === 1 ? (
            <div>
              {/* The navbar will show these links after you log in and you are a admin */}

              <Button color="inherit" href="#" onClick={() => dispatch(logout())}>
                Logout
              </Button>
              <Button color="inherit" component={Link} to="/memes">
                Memes
              </Button>
              <Button color="inherit" component={Link} to="/unlistedMemes">
                Unlisted
              </Button>

              <Button color="inherit" component={Link} to="/createMeme">
                Create Meme
              </Button>
              <Button color="inherit" component={Link} to="/users">
                View All Users
              </Button>
              <Button color="inherit" component={Link} to="/mycart">
              <CartBadge orderItems={orderItems} />
              </Button>
            </div>
          ) : isLoggedIn && isLogged.roleId === 2 ? (
            <div>
              {/* The navbar will show these links after you log in and you are a users */}
              <Button color="inherit" href="#" onClick={() => dispatch(logout())}>
                Logout
              </Button>
              <Button color="inherit" component={Link} to="/memes">Memes</Button>

              <Button color="inherit" component={Link} to={`/user/${isLogged.id}`}>
                Setting
              </Button>

              <Button color="inherit" component={Link} to="/mycart"><CartBadge orderItems={orderItems}/></Button>

            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
              <Button color="inherit" component={Link} to="/memes">Memes</Button>
              <Button color="inherit" component={Link} to="/mycart">
              <CartBadge orderItems={orderItems}/>
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
