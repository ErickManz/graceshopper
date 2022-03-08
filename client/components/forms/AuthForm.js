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

              <label htmlFor="State">
                <small>State</small>
              </label>
              <select name="state">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>

              <label htmlFor="zip">
                <small>ZIP Code</small>
              </label>
              <input
                name="zip"
                type="number"
                placeholder="12345"
                required={true}
              />

              <label htmlFor="phone">
                <small>Telephone XXX-XXX-XXXX</small>
              </label>
              <input
                name="phone"
                type="tel"
                required={true}
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="ex. 123-456-7890"
              />
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
