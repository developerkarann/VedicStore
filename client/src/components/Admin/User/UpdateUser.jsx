import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/MetaData'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from '@material-ui/icons/Person'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Sidebar from '../Dashboard/Sidebar'
import Loader from '../../layout/loader/Loader'
import { UPDATE_USER_RESET } from '../../../constants/userConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getUserDetails, updateUser } from '../../../actions/userAction'
import { useEffect } from 'react'

export default function UpdateUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { loading, error, user } = useSelector((state) => state.userDetails)

    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")


    const updateUserSubmitHandler = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('role', role)

        dispatch(updateUser(id, myForm))
    }



    useEffect(() => {

        if (user && user._id !== id) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors)
        }

        if (isUpdated) {
            alert.success("User Updated")
            navigate('/admin/dashboard')
            dispatch({ type: UPDATE_USER_RESET })
        }


    }, [navigate, dispatch, error, alert, isUpdated, updateError, user,id])

    // console.log(name, email, role)
    return (
        <>
            {/* {!user ? <Loader /> : */}
            <>
                <MetaData title="Update User - Admin" />

                <div className="dashboard">
                    <Sidebar />

                    <div className="newProductContainer">
                        {/* {loading ? <Loader /> : */}
                        <form className='createProductForm' encType='multipart/form-data' onSubmit={updateUserSubmitHandler}>

                            <h1>UPDATE USER</h1>

                            <div>
                                <PersonIcon />
                                <input type="text" placeholder='Name' required
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input type="email" placeholder='Email' required
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>


                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)} >
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="role">User</option>

                                </select>
                            </div>


                            <Button id='createProductBtn' type='submit' disabled={updateLoading ? true : false || role === '' ? true : false}>
                                Update User
                            </Button>


                        </form>
                        {/* } */}
                    </div>
                </div>

            </>
            {/* } */}
        </>
    )
}
