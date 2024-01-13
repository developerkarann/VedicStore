import React, { useState, useEffect } from 'react';
import './updatepassword.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { clearErrors, updatePassword } from '../../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstants';

export default function UpdatePassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.user)
    const { error, loading, isUpdated } = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(updatePassword(myForm))
    }


    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Profile Updated')
            navigate("/account")
            dispatch({ type: UPDATE_PASSWORD_RESET});
        }
    }, [dispatch, error, alert, navigate, isUpdated])
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title='Change Password' />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className='upadateProfileHeading'>Change Password</h2>

                            <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                                <div >
                                    <VpnKeyIcon />
                                    <input type="password" placeholder='Old Passowrd' required value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)} />
                                </div>
                                <div >
                                    <LockOpenIcon />
                                    <input type="password" placeholder='New Passowrd' required value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div >
                                    <LockIcon />
                                    <input type="password" placeholder='Confirm Passowrd' required value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input type="submit" value='Change Password' className='updatePasswordBtn' />

                            </form>
                        </div>
                    </div>
                </>}
        </>
    )
}
