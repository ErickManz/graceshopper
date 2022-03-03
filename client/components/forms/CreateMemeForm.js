import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function CreateMemeForm(props) {
  return (
    <div className="create-edit">
      <form id="create-meme">
        <label htmlFor="name">Name:</label>
        <input name="name" placeholder="Name" />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          min="0.01"
          step=".01"
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input type="url" name="imageUrl" placeholder="Image URL" />

        <label htmlFor="genre">Genre:</label>
        <input name="genre" placeholder="Genre" />

        <label htmlFor="stock-quantity">Stock Quantity:</label>
        <input type="number" name="stock-quantity" placeholder="Qty" />

        <label htmlFor="artist">Artist:</label>
        <input name="artist" placeholder="Artist" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateMemeForm;
