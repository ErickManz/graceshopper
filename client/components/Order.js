import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, editItems } from '../store/orderReducer';
import { Link } from 'react-router-dom';
import { me } from '../store';
import { getCart } from '../store/localStorageReducer';

function Order(props) {
  const orderItems = useSelector((state) => state.OrderItems);
  const localItems = JSON.parse(window.localStorage.getItem('guestCart'));
  console.log(localItems);
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getItems(user));
  }, []);

  const onSubmit = (e, meme, num) => {
    e.preventDefault();

    dispatch(editItems(user, { memeId: meme, quantity: num }));
  };

  // (orderItems.length === 0) {

  // } else {
  // }

  return (
    <div>
      <div className="orderItem">
        {orderItems.map((orderItem) => (
          <div key={orderItem.id}>
            <h3>{orderItem.meme.name}</h3>
            <img src={orderItem.meme.imageUrl}></img>
            <h3>Price: {orderItem.meme.price}</h3>
            <label htmlFor="quantity">Quantity:{orderItem.quantity}</label>

            <button
              type="button"
              onClick={(e) =>
                onSubmit(e, orderItem.meme.id, ++orderItem.quantity)
              }
            >
              +
            </button>
            <button
              type="button"
              onClick={(e) =>
                onSubmit(e, orderItem.meme.id, --orderItem.quantity)
              }
              disabled={orderItem.quantity <= 0}
            >
              -
            </button>
          </div>
        ))}

        <button type="button">
          <Link to="/checkout">Checkout </Link>
        </button>
      </div>
    </div>
  );
}

export default Order;

// Completed Tier 1 (or mostly done!)
// Up-to-date Project Board
// Deployed website to demo for us at Code Review
// You can walk through vertical slices of anyone's code

// Teamwork
// Coding practices
// Architectural decisions
// Security
