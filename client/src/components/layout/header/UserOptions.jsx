import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import Deshboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListAlt from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import './header.css';

export default function UserOptions({user}) {

  const dispatch = useDispatch();
  const alert = useAlert();

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const deshboard = () => {
    navigate('/deshboard')
  }
  const orders = () => {
    navigate('/orders')
  }
  const account = () => {
    navigate('/account')

  }
  const logoutUser = async () => {
    dispatch(logout())
    alert.success('Logout Successfully')
    navigate('/login')
    location.reload()
  }

  const options = [
    { icon: <ListAlt />, name: 'Orders', func: orders },
    { icon: <Person />, name: 'Profile', func: account },
    { icon: <ExitToApp />, name: 'Logout', func: logoutUser },
  ]

  if (user.role === 'admin') {
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
        icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : '/profile.png'} alt='Profile' />}
        direction='down'
        className='speedDial'
      >
        {options.map((item, index) => (
          <SpeedDialAction key={index} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
      </SpeedDial>
    </>
  )
}
