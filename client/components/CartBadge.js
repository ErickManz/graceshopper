import React from 'react';
import { useSelector } from 'react-redux';

import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function CartBadge(props) {
  return (
    <Badge badgeContent={props.orderItems.length} color="secondary">
      <CartIcon />
    </Badge>
  );
}
