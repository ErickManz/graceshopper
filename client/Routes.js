import React, { Component, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllMemes from './components/AllMemes';
import SingleMemes from './components/SingleMeme';
import Confirmation from './components/Confirmation';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import { me } from './store';

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
          <Route path="/memes/:id" component={SingleMemes} />
          <Route path="/memes" component={AllMemes} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/mycart" component={Cart} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
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
