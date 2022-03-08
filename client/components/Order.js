import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, editItems } from '../store/orderReducer';
import { Link } from 'react-router-dom';
import { me } from '../store';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Order(props) {
  const orderItems = useSelector((state) => state.OrderItems);
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getItems(user));
  }, []);

  const onSubmit = (e, meme, num) => {
    e.preventDefault();
    dispatch(editItems(user, { memeId: meme, quantity: num }));
  };

  console.log(orderItems);

  return (
    <Stack spacing={2}>
      {orderItems.map((orderItem) => (
        <Card
          key={orderItem.id}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
            
        >
          <CardMedia
            component="img"
            height="200px"
            image={orderItem.meme.imageUrl}
          />

          <CardContent>
            <h3>{orderItem.meme.name}</h3>
            <h3>${orderItem.meme.price}</h3>
            <h3>{orderItem.quantity}</h3>
          </CardContent>
          <Button
            onClick={(e) =>
              onSubmit(e, orderItem.meme.id, ++orderItem.quantity)
            }
          >
            +
          </Button>
          <Button
            onClick={(e) =>
              onSubmit(e, orderItem.meme.id, --orderItem.quantity)
            }
            disabled={orderItem.quantity <= 0}
          >
            -
          </Button>
        </Card>
      ))}

      <Button >
        <Link to="/checkout">Checkout </Link>
      </Button>
    </Stack>
  );
}

export default Order;

// Completed Tier 1 (or mostly done!)
// Up-to-date Project Board
// Deployed website to demo for us at Code Review
// You can walk through vertical slices of anyone's code

// Teamwork
// Coding practices
// Architectural decisions
// Security
