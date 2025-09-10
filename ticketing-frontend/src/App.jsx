import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Toolbar from './components/Toolbar'
import TicketList from './pages/TicketList'
import CreateTicket from './pages/CreateTicket'
import TicketDetails from './pages/TicketDetails'
import UserProfile from './pages/UserProfile'
import { useAuth0 } from '@auth0/auth0-react'

function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
    if (isLoading) return <p>Loading…</p>
    if (!isAuthenticated) {
        loginWithRedirect()
        return <p>Redirecting to login…</p>
    }
    return children
}

export default function App() {
    return (
        <>
            <Toolbar />
            <div className="page-container">
                <Routes>
                    <Route path="/" element={<TicketList />} />
                    <Route
                        path="/create"
                        element={
                            <PrivateRoute>
                                <CreateTicket />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/tickets/:id" element={<TicketDetails />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </>
    )
}
