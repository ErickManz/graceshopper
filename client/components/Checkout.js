import React, { useEffect } from 'react';
import Confirmation from './Confirmation';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, submitOrder } from '../store/orderReducer';
import { Link } from 'react-router-dom';
import { me } from '../store';
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function total(orderItems) {
  return orderItems.reduce(
    (total, orderItem) =>
      total + Number(orderItem.salePrice) * orderItem.quantity,
    0
  );
}

export default function Checkout() {
  const OrderItems = useSelector((state) => state.OrderItems);
  const user = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getItems(user));
  }, []);

  function onSubmit() {
    dispatch(submitOrder(user.id));
  }
  return (
    <div className="container">
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
      <Table sx={{ maxWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell scope="col">Meme</TableCell>
            <TableCell scope="col">Price</TableCell>
            <TableCell scope="col">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderItems.map((orderItem) => {
            return (
              
              <TableRow key={orderItem.meme.memeId}>
                <TableCell>{orderItem.meme.name}</TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
                <TableCell>${orderItem.salePrice}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{' '}</TableCell>
          <TableCell>${total(OrderItems)}</TableCell>
        </TableRow>
      </Table>
      </TableContainer>
      <div className="payment">Payment Options</div>
      <div className="Shipping Address">Shipping Address</div>
      <Link to="/confirmation">
        <Button variant="contained" type="submit" label="confirm purchase" onClick={() => onSubmit()}>
          Confirm Purchase
        </Button>
      </Link>
    </div>
  );
}
