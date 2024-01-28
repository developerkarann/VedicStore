import React, { useRef, useState, useEffect } from 'react'
import './LoginSignup.css'
import Loader from '../layout/loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction'
import { useAlert } from 'react-alert'


export default function LoginSignUp() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user)

    const loginTag = useRef(null);
    const registerTag = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = user

    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(login(loginEmail, loginPassword))

    }
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("./profile.png")

    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('password', password)
        myForm.set('avatar', avatar)

        console.log(myForm)
        dispatch(register(myForm))

        // navigate("/account")
        // setTimeout(() => {
        //     location.reload()
        // }, 6000);
        // alert.success("Account Created! Please Login now (:")
    }
    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    const switchTabs = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTag.current.classList.remove("shiftToNeutralForm");
            loginTag.current.classList.remove("shiftToLeft");

        }
        if (tab === 'register') {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTag.current.classList.add("shiftToNeutralForm");
            loginTag.current.classList.add("shiftToLeft");

        }
    }

    const redirect = location.search ? location.search.split('=')[1] : '/account';

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isAuthenticated) {
            navigate(redirect)
            // navigate('/account')

        }
    }, [dispatch, clearErrors, error, navigate, isAuthenticated, redirect])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signup_toggle">
                                    <p onClick={(e) => switchTabs(e, 'login')}>Login</p>
                                    <p onClick={(e) => switchTabs(e, 'register')}>Register</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className='loginForm' ref={loginTag} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder='Email' required value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder='Passowrd' required value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                                <Link to="/password/forgot">Forgot Password ?</Link>
                                <input type="submit" value='login' className='loginBtn' />

                            </form>

                            <form className='signUpForm' ref={registerTag} encType='multipat/from-data' onSubmit={registerSubmit}>
                                <div className="signUpName">
                                    <FaceIcon />
                                    <input type="text" placeholder='Name' name='name' required value={name}
                                        onChange={registerDataChange} />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder='Email' name='email' required value={email}
                                        onChange={registerDataChange} />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder='Passowrd' name='password' required value={password}
                                        onChange={registerDataChange} />
                                </div>
                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
                                </div>
                                {/* <Link to="/password/forgot">Forgot Password ?</Link> */}
                                <input type="submit" value='register' className='signUpBtn' />

                            </form>
                        </div>
                    </div>
                </>}
        </>
    )
}
