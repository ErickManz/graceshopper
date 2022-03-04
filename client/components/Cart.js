import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/cart';
import { Link } from 'react-router-dom';
import { me } from '../store';

function Cart(props) {
  //should match reducer key
  // const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  //not sure why getItem wont mount? I tried hardcoding userID.
  useEffect(() => {
    //me was from boiler plate
    dispatch(me());
    dispatch(getItems(user));
  }, []);

  console.log(user);

  // console.log(cartItems);
  return (
    <div>
      {/* <div key={cartItems.id} className="cartItem"> */}
      <h2></h2>
      {/* <h4>{cartItems.quantity}</h4> */}
      <button type="button">
        <Link to="/checkout">Checkout </Link>
      </button>
    </div>
    // </div>
  );
}

export default Cart;

// Completed Tier 1 (or mostly done!)
// Up-to-date Project Board
// Deployed website to demo for us at Code Review
// You can walk through vertical slices of anyone's code

// Teamwork
// Coding practices
// Architectural decisions
// Security
