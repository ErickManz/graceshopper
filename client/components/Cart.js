import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMemes } from '../store/allMemes';
import { Link } from 'react-router-dom';
import { fetchItems } from '../store/cart';

function Cart(props) {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  console.log(props);
  return (
    <div>
      {/* <div key={meme.id} className="singleMeme">
        <h2>{meme.name}</h2>
        <h4>{meme.price}</h4>
        <h4>{meme.genre}</h4>
        <img src={meme.imageUrl} />
        <p>{`${meme.description} by ${meme.artist}`}</p>
        <h4>{meme.stockQuantity}</h4>
        <button type="button">
          {' '}
          <Link to="/checkout">Checkout </Link>
        </button>
      </div> */}
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
