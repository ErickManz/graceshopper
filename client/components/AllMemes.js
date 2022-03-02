import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getMemes} from '../store/allMemes'




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
            <img src={meme.imgUrl} />
          </div>
        );
      })}
    </div>
  );
};

export default AllMemes;
