import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store';

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;

    dispatch(authenticate(username, password, formName));
  };
  const handleChangeForUser = (evt) => {
    setUsername(evt.target.value);
  };
  const handleChangeForPassword = (evt) => {
    setPassword(evt.target.value);
  };

  // let isUserNamePasswordEmpty = true;
  // if (username.length > 0 && password.length > 0) {
  //   isUserNamePasswordEmpty = false;
  // }
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>

          <input
            name="username"
            type="text"
            required={true}
            onChange={handleChangeForUser}
          />

          <label htmlFor="password">
            <small>Password</small>
          </label>

          <input
            name="password"
            type="password"
            required={true}
            onChange={handleChangeForPassword}
          />
          {name === 'signup' ? (
            <>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="email" />{' '}
            </>
          ) : null}
        </div>

        <button type="submit">{displayName}</button>

        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
