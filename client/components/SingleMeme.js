import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleMeme, addCartItem } from '../store/SingleMemes';


function SingleMemes(props) {
  const meme = useSelector(state => state.singleMeme)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleMeme(props.match.params.id));
  }, []);

//current can not set up the function of adding to the cart
  return (
          <div key={meme.id} className="singleMeme">
            <h2>{meme.name}</h2>
            <h4>{meme.price}</h4>
            <h4>{meme.genre}</h4>
            <img src={meme.imageUrl} />
            <p>{`${meme.description} by ${meme.artist}`}</p>
            <h4>{meme.stockQuantity}</h4>
            <button type= "button" onClick={() =>dispatch(addCartItem()) } >Add to cart </button>
          </div>

  );
}

export default SingleMemes;
