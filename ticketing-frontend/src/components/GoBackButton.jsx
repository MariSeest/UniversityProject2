import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GoBackButton.css'

export default function GoBackButton() {
    const navigate = useNavigate()
    return <button className="go-back" onClick={() => navigate(-1)}>← Back</button>
}
