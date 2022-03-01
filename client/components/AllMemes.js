import React from 'react';
import { useSelector } from 'react-redux';

const memes = [
  { id: 1, name: 'wojak', price: 25.99, imgUrl: 'testurl' },
  { id: 2, name: 'Elmo burns', price: 34.99, imgUrl: 'testurl' },
  { id: 3, name: 'pepe', price: 19.99, imgUrl: 'testurl' },
];

const AllMemes = () => {
  return (
    <div id="all-meme-view">
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
