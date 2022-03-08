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

function AllMemes() {
  const memes = useSelector((state) => state.memes);
  const user = useSelector((state) => state.auth.id);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
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
    setOpen(true);
  };

  return (
    <Grid container spacing="6">
      {memes.map((meme) => {
        if (meme.status === 'listed')
          return (
            <Grid item key={meme.id}>
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
                  <Typography variant="subtitle1">${meme.price}</Typography>
                </CardContent>

                <CardActions>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    min="1"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </CardActions>
                <Button color="secondary" onClick={(e) => onSubmit(e, meme)}>
                  Add to cart{' '}
                </Button>
              </Card>
            </Grid>
          );
      })}
      <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={() => setOpen(false)}
                  message="Meme Added To Cart"
                  action={<React.Fragment>
                    <Button color="secondary" onClick={() => setOpen(false)}>CLOSE</Button>
                  </React.Fragment>}
                />
    </Grid>
  );
}

export default AllMemes;
