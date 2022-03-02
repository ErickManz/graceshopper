import  React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getMemes} from '../store/allMemes';
import {Link} from 'react-router-dom';



function AllMemes(props) {
  const memes = useSelector(state => state.memes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMemes());
  }, []);


  return (<div id="all-meme-view">
      {memes.map((meme) => {
        return (
          <div key={meme.id} className="listed-meme">
            <h2>{meme.name}</h2>
            <h4>{meme.price}</h4>
            <Link to={`/memes/${meme.id}`}> <img src={meme.imageUrl} /></Link>
          </div>
        );
      })}
    </div>
  );
}

export default AllMemes;
