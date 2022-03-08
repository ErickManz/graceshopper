import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMemes } from '../store/memesReducer';
import { Link } from 'react-router-dom';
import { addItems } from '../store/orderReducer';
import { me } from '../store';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

function UnlistedMemes() {
  const memes = useSelector((state) => state.memes);
  const user = useSelector((state) => state.auth.id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getMemes());
  }, []);
  const onSubmit = (e, meme) => {
    e.preventDefault();
    dispatch(
      addItems(user, {
        memeId: meme.id,
        quantity: quantity,
        salePrice: meme.price,
      })
    );
    setQuantity(1);
  };

  return (
    <Grid container spacing="6">
      {memes.map((meme) => {
        if (meme.status === 'unlisted')
          return (
            <Grid item xs={3} key={meme.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '5px',
                }}
              >
                <CardActionArea component={Link} to={`/memes/${meme.id}`}>
                  <CardMedia
                    component="img"
                    height="200px"
                    image={meme.imageUrl}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography variant="subtitle1">{meme.name}</Typography>
                  <Typography variant="subtitle1">
                    Currently Unavailable
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
      })}
    </Grid>
  );
}

export default UnlistedMemes;
