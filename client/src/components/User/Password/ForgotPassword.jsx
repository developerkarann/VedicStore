import React, { useState, useEffect } from 'react';
import './forgotpassword.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { clearErrors, forgotPassowrd } from '../../../actions/userAction';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, loading, message } = useSelector((state) => state.forgotPassword)

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('email', email)

        dispatch(forgotPassowrd(myForm))
    }


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message)
            // navigate("/account")
        }
    }, [dispatch, error, alert, message])
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title='Forgot Password' />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className='upadateProfileHeading'>Forgot Passowrd</h2>

                            <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit}>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder='Email' name='email' required value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <input type="submit" value='Forgot Passowrd' className='forgotPasswordBtn' />

                            </form>
                        </div>
                    </div>
                </>}
        </>
    )
}
