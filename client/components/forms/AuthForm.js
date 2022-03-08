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
              <input
                name="email"
                type="email"
                placeholder="email"
                required={true}
              />

              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input
                name="firstName"
                placeholder="First Name"
                required={true}
              />

              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" placeholder="Last Name" required={true} />

              <label htmlFor="street1">
                <small>Address Line 1</small>
              </label>
              <input name="street1" placeholder="123 Main St" required={true} />

              <label htmlFor="street2">
                <small>Address Line 2</small>
              </label>
              <input name="street2" placeholder="Apartment #304, etc." />

              <label htmlFor="city">
                <small>City</small>
              </label>
              <input name="city" placeholder="City" required={true} />
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
