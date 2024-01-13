import React from 'react'
import { useSelector } from 'react-redux'
import { Route , redirect, useNavigate} from 'react-router-dom'

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user)
    const navigate = useNavigate()

    return (
        <>
            {!loading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (!isAuthenticated) {
                            // return redirect('/login')
                            return navigate('/login')
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}
