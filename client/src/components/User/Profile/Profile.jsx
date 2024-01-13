import React, { useEffect } from 'react'
import MetaData from '../../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../layout/loader/Loader'
import './profile.css'

export default function Profile() {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {
      if(isAuthenticated === false){
         navigate('/login')
      }
    }, [navigate, isAuthenticated])
    
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${user.name}'s Profile`} />

                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined on</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
