import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/singleUserReducer';
function EditUserForm(props) {
  const user = props.user;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    ...user,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setFormData({ ...formData, [name]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(user.id, formData));
  };
  return (
    <div className="create-edit">
      <form id="edit-user" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          placeholder="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">last Name:</label>
        <input
          name="lastName"
          placeholder="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="street1">Street 1:</label>
        <input
          name="street1"
          placeholder="street line 1"
          value={formData.street1}
          onChange={handleChange}
        />

        <label htmlFor="street2">Street 2:</label>
        <input
          name="street2"
          placeholder="street line 2"
          value={formData.street2}
          onChange={handleChange}
        />
        <label htmlFor="State">State:</label>
        <input
          name="state"
          placeholder="state"
          value={formData.state}
          onChange={handleChange}
        />

        <label htmlFor="city">City:</label>
        <input
          name="city"
          placeholder="city"
          value={formData.city}
          onChange={handleChange}
        />
        <label htmlFor="zip">Zip code:</label>
        <input
          name="zip"
          placeholder="Zip code"
          value={formData.zip}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          name="phoneNumber"
          placeholder="Phone#"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditUserForm;
