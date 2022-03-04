import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/cart';
import { Link } from 'react-router-dom';

function Cart(props) {
  const cartItems = useSelector((state) => state.items);
  const dispatch = useDispatch();

  //not sure why getItem wont mount? I tried hardcoding userID.
  useEffect(() => {
    // dispatch(getItems());
  }, []);

  console.log(props);
  return (
    <div>
      {/* <div key={cartItems.id} className="cartItem">
        <h2></h2>
        <h4>{cartItems.quantity}</h4> */}
      <button type="button">
        {' '}
        <Link to="/checkout">Checkout </Link>
      </button>
      {/* </div> */}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     item: state.item,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchItems: () => dispatch(fetchItems()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);

export default Cart;
