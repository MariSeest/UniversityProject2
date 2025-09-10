import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './pages/App.css'

const root = createRoot(document.getElementById('root'))

root.render(
    <Auth0Provider
        domain="dev-7jjbq4g0dtlsvfqj.us.auth0.com"
        clientId="xgbNikoiGQCRNuEx6jyh7dAmbf5BZcDN"
        authorizationParams={{ redirect_uri: window.location.origin }}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Auth0Provider>
)
