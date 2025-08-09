import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaUser } from 'react-icons/fa'
import './Toolbar.css'
import { useAuth0 } from '@auth0/auth0-react'

export default function Toolbar() {
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
    const loc = useLocation()

    return (
        <header className="toolbar">
            <div className="toolbar-left" onClick={() => navigate('/')}>
                <FaHome className="toolbar-icon" title="Home" />
                <span className="brand">Ticketing</span>
            </div>

            <nav className="toolbar-nav">
                <Link className={loc.pathname === '/' ? 'active' : ''} to="/">Tickets</Link>
                <Link className={loc.pathname === '/create' ? 'active' : ''} to="/create">Crea</Link>
            </nav>

            <div className="toolbar-right">
                {/* Saluto utente se loggato */}
                {isAuthenticated && (
                    <span style={{ marginRight: 10 }}>Ciao, {user?.name || user?.email}</span>
                )}

                <FaUser
                    className="toolbar-icon"
                    title="Profilo"
                    onClick={() => navigate('/profile')}
                />

                {isAuthenticated ? (
                    <button
                        className="btn"
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    >
                        Logout
                    </button>
                ) : (
                    <button className="btn" onClick={() => loginWithRedirect()}>
                        Login
                    </button>
                )}
            </div>
        </header>
    )
}
