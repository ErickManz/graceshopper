import React, { useEffect } from 'react';
import Confirmation from './Confirmation';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/Order';
import { Link } from 'react-router-dom';
import { me } from '../store';

export function total(orderItems){
  return orderItems.reduce((currentOrderItem, previousTotal) =>
  {( previousTotal + currentOrderItem.salePrice*currentOrderItem.quantity)})
}
export default function Checkout() {
  const OrderItems = useSelector((state) => state.OrderItems); 
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getItems(user));
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th scope="col">Meme</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {OrderItems.map((orderItem) => {
            return (
              <tr key={orderItem.meme.memeId}>
                <td>{orderItem.meme.name}</td>
                <td>${orderItem.meme.price}</td>
                <td>{orderItem.quantity}</td>
              </tr>
            );
          })}
        </tbody>

        <tr>
          <td>Total</td>
          <td>{total(OrderItems)}</td>
        </tr>
      </table>
      <div className="payment">Payment Options</div>
      <div className="Shipping Address">Shipping Address</div>
      <Link to="/confirmation">
        <button type="submit" label="confirm purchase">
          Confirm Purchase
        </button>
      </Link>
    </div>
  );
}
