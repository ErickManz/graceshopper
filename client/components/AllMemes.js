import  React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getMemes} from '../store/allMemes';
import {Link} from 'react-router-dom';
import { addItems } from '../store/cart';
import {me} from '../store';



function AllMemes(props) {
  const memes = useSelector(state => state.memes)
  const user = useSelector(state => state.auth.id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMemes());
    dispatch(me());
  }, []);
 const onSubmit = (e ,memeId) =>{
   e.preventDefault();
   dispatch(addItems(user,{memeId: memeId, quantity: quantity}))
   setQuantity(1);
 }


  return (<div id="all-meme-view">
      {memes.map((meme) => {
        return (
          <div key={meme.id} className="listed-meme">
            <h2>{meme.name}</h2>
            <h4>{meme.price}</h4>
            <div>
            <label htmlFor="quantity">Quantity:</label>
            <input type= "number" name="quantity" value={quantity} onChange={e=> setQuantity(e.target.value)} />
            </div>
            <button type= "button" onClick={(e) => onSubmit(e ,meme.id) } >Add to cart </button>
            <Link to={`/memes/${meme.id}`}> <img src={meme.imageUrl} /></Link>
          </div>

        );
      })}
    </div>
  );
}

export default AllMemes;
