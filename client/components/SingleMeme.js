import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMeme } from '../store/singleMemeReducer';
import { addItems } from '../store/orderReducer';
import { me } from '../store';
import { addItemToLocalCart } from '../store/localStorageReducer';
import EditMemeForm from './forms/EditMemeForm';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

function SingleMeme(props) {
  const meme = useSelector((state) => state.singleMeme);
  const user = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeme(props.match.params.id));
    dispatch(me());
  }, []);

  const onSubmit = (e, meme) => {
    e.preventDefault();
    if (user.id) {
      dispatch(
        addItems(user.id, {
          memeId: meme.id,
          quantity: quantity,
          salePrice: meme.price,
        })
      );
    } else {
      dispatch(
        addItemToLocalCart({
          id: meme.id,
          name: meme.name,
          price: meme.price,
          quantity: quantity,
          url: meme.imageUrl,
        })
      );
    }
    setQuantity(1);
    setOpen(true);
  };

  // const onSubmit = (e, memeId) => {
  //   e.preventDefault();
  //   dispatch(addItems(user.id, { memeId: memeId, quantity: quantity }));
  //   setQuantity(1);
  //   setOpen(true)
  // };

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
      <button type="button" onClick={(e) => onSubmit(e, meme)}>
        Add to cart{' '}
      </button>

      <div id="edit-meme">
        {user.roleId === 1 ? <EditMemeForm meme={meme} /> : <div> </div>}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Meme Added To Cart"
        action={
          <React.Fragment>
            <Button color="secondary" onClick={() => setOpen(false)}>
              CLOSE
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default SingleMeme;
