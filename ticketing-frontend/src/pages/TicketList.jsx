import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api'; // <- client centralizzato

export default function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [priority, setPriority] = useState('ALL');
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const { data } = await api.get('/tickets'); // <- niente hardcoded URL
            setTickets(data || []);
        } catch (err) {
            console.error(err);
            alert('Errore nel caricamento dei ticket');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    const filtered =
        tickets.filter(t => priority === 'ALL' ? true : t.priority === priority);

    return (
        <div className="page">
            <div className="row">
                <h2 style={{ marginRight: 'auto' }}>Tickets</h2>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="ALL">Tutte le priorità</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                </select>
                <button className="primary" onClick={load} disabled={loading}>
                    {loading ? 'Aggiorno…' : 'Aggiorna'}
                </button>
            </div>

            <div className="list">
                {filtered.map((t) => (
                    <div className="card" key={t.id}>
                        <div className="row">
                            <strong style={{ marginRight: 'auto' }}>{t.title}</strong>
                            <span className={`badge ${t.priority?.toLowerCase()}`}>
                {t.priority}
              </span>
                        </div>
                        <p>{t.description}</p>
                        <Link to={`/tickets/${t.id}`}>Apri</Link>
                    </div>
                ))}
                {!loading && filtered.length === 0 && <p>Nessun ticket</p>}
            </div>
        </div>
    );
}
