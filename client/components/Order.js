import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, editItems } from '../store/orderReducer';
import { Link } from 'react-router-dom';
import { me } from '../store';

function Order(props) {
  console.log('hello world');
  let orderItems = 0;
  let localItems = 0;
  try {
    orderItems = useSelector((state) => state.OrderItems);
    localItems = JSON.parse(window.localStorage.getItem('guestCart'));
  } catch (err) {
    console.log(err);
  }

  console.log(localItems);
  console.log(orderItems);

  const user = useSelector((state) => state.auth.id);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getItems(user));
  }, [user]);

  const onSubmit = (e, meme, num) => {
    e.preventDefault();

    dispatch(editItems(user, { memeId: meme, quantity: num }));
  };
  console.log(isLoggedIn);
  //nothing in the cart
  if (!isLoggedIn && localItems) {
    return (
      <div>
        {localItems.map((item) => (
          <div key={item.id}>
            <img src={item.url}></img>
            <h2>quantity: {item.quantity}</h2>
            <h2>price: {item.price}</h2>
          </div>
        ))}

        <button type="button">
          <Link to="/checkout">Checkout </Link>
        </button>
      </div>
    );
  } else if (isLoggedIn) {
    return (
      <div>
        <div className="orderItem">
          {orderItems.map((orderItem) => (
            <div key={orderItem.id}>
              <h3>{orderItem.meme.name}</h3>
              <img src={orderItem.meme.imageUrl}></img>
              <h3>Price: {orderItem.salePrice}</h3>
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
  } else {
    return <h1>Nothing in the cart </h1>;
  }
}

export default Order;
