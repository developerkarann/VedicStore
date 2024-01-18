import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './css/OrderSuccess.css'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function OrderSuccess() {
  return (
    <>
    <div className="orderSuccess">
        <CheckCircleIcon/>

        <Typography>Your Order has been placed successfully</Typography>
        <Link to='/orders'>View Orders</Link>
    </div>
    </>
  )
}
