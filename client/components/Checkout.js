import React, {useEffect} from 'react';
import Confirmation from './Confirmation';
import { useSelector, useDispatch } from 'react-redux';
import {getMemes} from '../store/allMemes'

export default function Checkout() {
  const cartItems = useSelector((state) => state.memes); //PLACEHOLDER for cartItem slice
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemes());
  }, []);


  return (<div className="container">
      <table>
      <thead>
        <tr>
            <th>Meme</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
        </tr>
        </thead>
        <tbody>
          {cartItems.map((meme) => (
            <tr key={meme.id}>
              <td>{meme.name}</td>
              <td>${meme.price}</td>
              <td>Quantity: 2</td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}
