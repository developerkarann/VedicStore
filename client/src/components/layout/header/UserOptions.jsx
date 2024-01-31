import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import Deshboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListAlt from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import './header.css';

export default function UserOptions({ user }) {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart)

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const deshboard = () => {
    navigate('/admin/dashboard')
    setOpen(false)
  }
  const orders = () => {
    navigate('/orders')
    setOpen(false)
  }
  const cart = () => {
    navigate('/cart')
    setOpen(false)
  }
  const account = () => {
    navigate('/account')
    setOpen(false)
  }
  const logoutUser = async () => {
    setOpen(false)
    dispatch(logout())
    alert.success('Logged Out Successfully')
    navigate('/login')
    setTimeout(() => {
      location.reload()
    }, 3000);
  }

  const options = [
    { icon: <ListAlt />, name: 'Orders', func: orders },
    { icon: <Person />, name: 'Profile', func: account },
    { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }} />, name: `Cart${cartItems.length}`, func: cart },
    { icon: <ExitToApp />, name: 'Logout', func: logoutUser },
  ]

  if (user && user.role === 'admin') {
    options.unshift({ icon: <Deshboard />, name: 'Deshboard', func: deshboard })
  }


  return (
    <>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      <SpeedDial
        ariaLabel='SpeedDial toolkit example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={<img className='speedDialIcon' src={user && user.avatar.url ? user.avatar.url : '/profile.png'} alt='Profile' />}
        direction='down'
        className='speedDial'
      >
        {options.map((item, index) => (
          <SpeedDialAction key={index} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true : false} />
        ))}
      </SpeedDial>
    </>
  )
}
