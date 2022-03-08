import React, { Component, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/forms/AuthForm';
import Home from './components/Home';
import AllMemes from './components/AllMemes';
import SingleMeme from './components/SingleMeme';
import Confirmation from './components/Confirmation';
import Checkout from './components/Checkout';
import CreateMemeForm from './components/forms/CreateMemeForm';
import AllUser from './components/AllUsers';
import SingleUser from './components/SingleUser';
import { me } from './store/authReducer';
import Order from './components/Order';
import UnlistedMemes from './components/UnlistedMemes';

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/memes" component={AllMemes} />
          <Route path="/unlistedMemes" component={UnlistedMemes} />
          <Route path="/memes/:id" component={SingleMeme} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/mycart" component={Order} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/createMeme" component={CreateMemeForm} />
          <Route path="/users" component={AllUser} />
          <Route path="/user/:id" component={SingleUser} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/memes" component={AllMemes} />
          <Route path="/memes/:id" component={SingleMeme} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact>
            {Login}
          </Route>
          <Route path="/login">{Login}</Route>
          <Route path="/signup">{Signup}</Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
