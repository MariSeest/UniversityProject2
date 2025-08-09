import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GoBackButton from '../components/GoBackButton'
import axios from 'axios'

export default function TicketDetails() {
    const { id } = useParams()
    const [ticket, setTicket] = useState(null)

    useEffect(()=>{ load() },[id])
    async function load(){
        const { data } = await axios.get(`/api/tickets/${id}`)
        setTicket(data)
    }

    if (!ticket) return <p>Caricamento…</p>

    return (
        <div className="page">
            <GoBackButton />
            <h2>{ticket.title} <span className={`badge ${ticket.priority?.toLowerCase()}`}>{ticket.priority}</span></h2>
            <p>{ticket.description}</p>

            {/* Qui in seguito aggiungiamo Commenti (CRUD + risposte annidate) */}
        </div>
    )
}
