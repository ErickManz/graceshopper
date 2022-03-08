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
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="street">Street:</label>
        <input
          name="street"
          placeholder="street"
          value={formData.street}
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
        <label htmlFor="roleId">Role id:</label>
        <input
          name="roleId"
          placeholder="2"
          value={formData.roleId}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditUserForm;
