import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
  });

  const {
    username,
    password,
    email,
    firstName,
    lastName,
    street1,
    street2,
    city,
    state,
    zip,
    phoneNumber,
  } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formName = e.target.name;
    console.log(formName);
    dispatch(authenticate(formData, displayName));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setFormData({ ...formData, [name]: val });
    console.log(formData);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack alignItems="center">
        <TextField
          name="username"
          label="Username"
          id="outlined-required"
          required
          value={username}
          onChange={handleChange}
        />

        <TextField
          name="password"
          type="password"
          label="Password"
          id="outlined-required"
          required={true}
          value={password}
          onChange={handleChange}
        />
        {name === 'signup' ? (
          <>
            <TextField
              label="Email"
              id="outlined-required"
              required={true}
              value={email}
              onChange={handleChange}
            />

            <TextField
              name="firstName"
              id="outlined-required"
              label="First Name"
              required={true}
              value={firstName}
              onChange={handleChange}
            />

            <TextField
              name="lastName"
              id="outlined-required"
              label="Last Name"
              required={true}
              value={lastName}
              onChange={handleChange}
            />

            <TextField
              name="street1"
              id="outlined-required"
              label="123 Main St"
              required={true}
              value={street1}
              onChange={handleChange}
            />

            <TextField
              name="street2"
              id="outlined-required"
              label="Apartment #304, etc."
              value={street2}
              onChange={handleChange}
            />

            <TextField
              name="city"
              id="outlined-required"
              label="City"
              required={true}
              value={city}
              onChange={handleChange}
            />

            <FormControl variant="outlined"><Select
              name="state"
              value={state}
              label="State"
              required
              onChange={handleChange}
            >
              <MenuItem value="AL">Alabama</MenuItem>
              <MenuItem value="AK">Alaska</MenuItem>
              <MenuItem value="AZ">Arizona</MenuItem>
              <MenuItem value="AR">Arkansas</MenuItem>
              <MenuItem value="CA">California</MenuItem>
              <MenuItem value="CO">Colorado</MenuItem>
              <MenuItem value="CT">Connecticut</MenuItem>
              <MenuItem value="DE">Delaware</MenuItem>
              <MenuItem value="DC">District Of Columbia</MenuItem>
              <MenuItem value="FL">Florida</MenuItem>
              <MenuItem value="GA">Georgia</MenuItem>
              <MenuItem value="HI">Hawaii</MenuItem>
              <MenuItem value="ID">Idaho</MenuItem>
              <MenuItem value="IL">Illinois</MenuItem>
              <MenuItem value="IN">Indiana</MenuItem>
              <MenuItem value="IA">Iowa</MenuItem>
              <MenuItem value="KS">Kansas</MenuItem>
              <MenuItem value="KY">Kentucky</MenuItem>
              <MenuItem value="LA">Louisiana</MenuItem>
              <MenuItem value="ME">Maine</MenuItem>
              <MenuItem value="MD">Maryland</MenuItem>
              <MenuItem value="MA">Massachusetts</MenuItem>
              <MenuItem value="MI">Michigan</MenuItem>
              <MenuItem value="MN">Minnesota</MenuItem>
              <MenuItem value="MS">Mississippi</MenuItem>
              <MenuItem value="MO">Missouri</MenuItem>
              <MenuItem value="MT">Montana</MenuItem>
              <MenuItem value="NE">Nebraska</MenuItem>
              <MenuItem value="NV">Nevada</MenuItem>
              <MenuItem value="NH">New Hampshire</MenuItem>
              <MenuItem value="NJ">New Jersey</MenuItem>
              <MenuItem value="NM">New Mexico</MenuItem>
              <MenuItem value="NY">New York</MenuItem>
              <MenuItem value="NC">North Carolina</MenuItem>
              <MenuItem value="ND">North Dakota</MenuItem>
              <MenuItem value="OH">Ohio</MenuItem>
              <MenuItem value="OK">Oklahoma</MenuItem>
              <MenuItem value="OR">Oregon</MenuItem>
              <MenuItem value="PA">Pennsylvania</MenuItem>
              <MenuItem value="RI">Rhode Island</MenuItem>
              <MenuItem value="SC">South Carolina</MenuItem>
              <MenuItem value="SD">South Dakota</MenuItem>
              <MenuItem value="TN">Tennessee</MenuItem>
              <MenuItem value="TX">Texas</MenuItem>
              <MenuItem value="UT">Utah</MenuItem>
              <MenuItem value="VT">Vermont</MenuItem>
              <MenuItem value="VA">Virginia</MenuItem>
              <MenuItem value="WA">Washington</MenuItem>
              <MenuItem value="WV">West Virginia</MenuItem>
              <MenuItem value="WI">Wisconsin</MenuItem>
              <MenuItem value="WY">Wyoming</MenuItem>
            </Select>
            </FormControl>
            <TextField
              name="zip"
              type="number"
              placeholder="12345"
              required={true}
              value={zip}
              onChange={handleChange}
            />

            <TextField
              name="phoneNumber"
              type="tel"
              required={true}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="ex. 123-456-7890"
              value={phoneNumber}
              onChange={handleChange}
            />
          </>
        ) : null}

        <Button type="submit" onClick ={handleSubmit}>{displayName}</Button>
      </Stack>
    </Box>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
