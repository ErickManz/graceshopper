import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/Order';
import { Link } from 'react-router-dom';
import {me} from '../store'

function Cart(props) {
  const OrderItems = useSelector((state) => state.OrderItems);
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  //not sure why getItem wont mount? I tried hardcoding userID.
  useEffect(() => {
     dispatch(me())
     dispatch(getItems(user));
  }, []);

  console.log(props);
  return (
    <div>
      {/* <div key={OrderItems.id} className="OrderItem">
        <h2></h2>
        <h4>{OrderItems.quantity}</h4> */}
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
