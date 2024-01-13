import React from 'react'
import { useSelector } from 'react-redux'
import { Route , redirect} from 'react-router-dom'

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user)

    return (
        <>
            {!loading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (!isAuthenticated) {
                            return redirect('/login')
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}
