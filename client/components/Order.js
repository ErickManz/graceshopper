import React, { useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, editItems } from '../store/Order';
import { Link } from 'react-router-dom';
import { me } from '../store';

function Order(props) {
  const orderItems = useSelector((state) => state.OrderItems);
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  // console.log(user);
  //not sure why getItem wont mount? I tried hardcoding userID.
  useEffect(() => {
    //me was from boiler plate
    dispatch(me());
    dispatch(getItems(user));
  }, []);

  const onSubmit = (e, meme, num) => {
    e.preventDefault();
    dispatch(editItems(user, { memeId: meme, quantity: num}));
  };

  console.log(orderItems);
  let num = 0;
  return (
    <div>
      <div className="orderItem">
        {orderItems.map((orderItem) => (
          <div key={orderItem.id}>
            <h3>{orderItem.meme.name}</h3>
            <img src={orderItem.meme.imageUrl}></img>
            <h3>Price: {orderItem.meme.price}</h3>
            <label htmlFor="quantity">Quantity:</label>
              <input
                min="1"
                type="number"
                name="quantity"
                value={orderItem.quantity}
                onChange={(e) => {orderItem.quantity = e.target.value}} // usedipatch and edit it that way
              />
                <button type="button" onClick={(e) => onSubmit(e, orderItem.meme.id , num)}>
                set amount
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
