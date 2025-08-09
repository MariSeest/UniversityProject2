import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome, FaUser } from 'react-icons/fa'
import './Toolbar.css'
import { useAuth0 } from '@auth0/auth0-react'

export default function Toolbar() {
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    return (
        <header className="toolbar">
            <div className="toolbar-left" onClick={() => navigate('/')}>
                <FaHome className="toolbar-icon" title="Home" />
                <span className="brand">Ticketing</span>
            </div>

            <nav className="toolbar-nav">
                <Link to="/">Tickets</Link>
                <Link to="/create">Crea</Link>
            </nav>

            <div className="toolbar-right">
                <FaUser className="toolbar-icon" title="Profilo" onClick={() => navigate('/profile')} />
                {isAuthenticated ? (
                    <button className="btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                ) : (
                    <button className="btn" onClick={() => loginWithRedirect()}>Login</button>
                )}
            </div>
        </header>
    )
}
