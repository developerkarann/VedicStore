import React, { useState, useEffect } from 'react';
import './resetpassword.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import { clearErrors, resetPassowrd } from '../../../actions/userAction';




export default function ResetPassword() {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {token} = useParams()


    const { error, loading, success } = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('password', password)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(resetPassowrd(token,myForm))
    }



    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Password Updated')
            navigate("/login")

        }
    }, [dispatch, error, alert, navigate, success])
  return (
    <>
    {loading ? <Loader /> :
        <>
            <MetaData title='Reset Password' />
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                    <h2 className='upadateProfileHeading'>Reset Password</h2>

                    <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                       
                        <div>
                            <LockOpenIcon />
                            <input type="password" placeholder='New Passowrd' required value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <LockIcon />
                            <input type="password" placeholder='Confirm Passowrd' required value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <input type="submit" value='Update Password' className='resetPasswordBtn' />

                    </form>
                </div>
            </div>
        </>}
</>
  )
}
