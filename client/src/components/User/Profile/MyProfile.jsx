import React, { useEffect } from 'react'
import './myprofile.css'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../../layout/loader/Loader'
import SuccessUser from '../../layout/Success/SuccessUser'

export default function MyProfile() {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${user && user.name}'s Profile`} />

                    {user ?
                        <div className="myProfile">
                            <div class="card-container">
                                <span class="pro">PROFILE</span>
                                <img class="round" src={user && user.avatar.url} alt="user" />
                                <h3>{user && user.name}</h3>
                                <p>{String(user && user.createdAt).substring(0, 10)}</p>
                                <h3>{user && user.email}</h3>

                                <div class="actions">
                                    <div class="buttons">
                                        <button class="primary">
                                            <Link to="/me/update">Edit Profile</Link>
                                        </button>
                                        <button class="primary ghost">
                                            <Link to="/orders">My Orders</Link>
                                        </button>
                                        <button class="primary ghost">
                                            <Link to="/password/update">Change Password</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                      <SuccessUser/>
                        
                    }
                </>
            )}
        </>
    )
}
