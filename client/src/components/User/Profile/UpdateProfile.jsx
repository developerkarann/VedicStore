import React, { useState, useEffect } from 'react';
import './updateprofile.css';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants';
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';


export default function UpdateProfile() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user)
    const { error, loading, isUpdated } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("./profile.png")


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('avatar', avatar)
        dispatch(updateProfile(myForm))
    }
    const updateProfileDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0])
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Profile Updated')
            dispatch(loadUser())
            navigate("/account")
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title='Update Profile' />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className='upadateProfileHeading'>Update Profile</h2>

                            <form className='updateProfileForm' encType='multipat/from-data' onSubmit={updateProfileSubmit}>
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input type="text" placeholder='Name' name='name' required value={name}
                                        onChange={(e)=> setName(e.target.value)} />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder='Email' name='email' required value={email}
                                        onChange={(e)=> setEmail(e.target.value)} />
                                </div>
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name='avatar' accept='image/*' onChange={updateProfileDataChange} />
                                </div>
                                <input type="submit" value='Update Profile' className='updateProfileBtn' />

                            </form>
                        </div>
                    </div>
                </>}
        </>
    )
}
