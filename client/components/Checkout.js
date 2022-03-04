import React, {useEffect} from 'react';
import Confirmation from './Confirmation';
import { useSelector, useDispatch } from 'react-redux';
import {getItems} from '../store/cart'
import {Link} from 'react-router-dom'

export default function Checkout() {
  const cartItems = useSelector((state) => state.items); //PLACEHOLDER for cartItem slice
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);


  return (<div className="container">
      <table>
      <thead>
        <tr>
            <th scope='col'>Meme</th>
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
          <tr><td>Total: $70</td></tr>
      </tbody>
      </table>
      <div className="payment">
          Payment Options
      </div>
      <div className="Shipping Address">
            Shipping Address
      </div>
      <Link to="/confirmation">
      <button type="submit" label="confirm purchase">Confirm Purchase</button>
      </Link>
    </div>
  );
}
