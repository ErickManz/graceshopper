import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMeme } from '../store/singleMemeReducer';
import { addItems } from '../store/orderReducer';
import { me } from '../store';
import EditMemeForm from './forms/EditMemeForm';

function SingleMeme(props) {
  const meme = useSelector((state) => state.singleMeme);
  const user = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeme(props.match.params.id));
    dispatch(me());
  }, []);
  const onSubmit = (e, memeId) => {
    e.preventDefault();
    dispatch(addItems(user.id, { memeId: memeId, quantity: quantity }));
    setQuantity(1);
  };

  return (
    <div key={meme.id} className="singleMeme">
      <h2>{meme.name}</h2>
      <h4>{meme.price}</h4>
      <h4>{meme.genre}</h4>
      <img src={meme.imageUrl} />
      <p>{meme.description}</p>
      <h4>Stock quantity left: {meme.stockQuantity}</h4>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          min="1"
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      {meme.status === 'listed' ? (
        <button type="button" onClick={(e) => onSubmit(e, meme.id)}>
          Add to cart{' '}
        </button>
      ) : (
        <div>This Meme is currently Unavailable</div>
      )}

      <div id="edit-meme">
        {user.roleId === 1 ? <EditMemeForm meme={meme} />: (<div> </div>) }
      </div>
    </div>
  );
}

export default SingleMeme;
