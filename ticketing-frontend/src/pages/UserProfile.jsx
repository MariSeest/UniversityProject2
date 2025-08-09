import React from 'react'
import GoBackButton from '../components/GoBackButton'
import { useAuth0 } from '@auth0/auth0-react'

export default function UserProfile() {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()
    if (!isAuthenticated) {
        return (
            <div className="page">
                <GoBackButton />
                <p>Non sei loggato.</p>
                <button className="primary" onClick={()=>loginWithRedirect()}>Login</button>
            </div>
        )
    }

    return (
        <div className="page">
            <GoBackButton />
            <h2>Profilo utente</h2>
            <img src={user.picture} alt="avatar" width={72} height={72} style={{borderRadius:'50%'}} />
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    )
}
