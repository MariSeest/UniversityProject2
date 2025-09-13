import React, { useState } from 'react';
import GoBackButton from '../components/GoBackButton';
import api from '../lib/api'; // <- usa il client centralizzato

export default function CreateTicket() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'LOW',
        status: 'OPEN',
    });
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/tickets', form); // <- niente hardcoded URL
            alert('Ticket creato!');
            setForm({ title: '', description: '', priority: 'LOW', status: 'OPEN' });
        } catch (err) {
            console.error(err);
            alert('Errore nel salvataggio');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <GoBackButton />
            <h2>Crea ticket</h2>
            <form className="form-grid" onSubmit={submit}>
                <input
                    placeholder="Titolo"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Descrizione"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={5}
                    required
                />
                <div className="row">
                    <label>Priorità</label>
                    <select
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                        <option>LOW</option>
                        <option>MEDIUM</option>
                        <option>HIGH</option>
                    </select>
                    <label>Stato</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                        <option>OPEN</option>
                        <option>IN_PROGRESS</option>
                        <option>CLOSED</option>
                    </select>
                </div>
                <button className="primary" disabled={loading}>
                    {loading ? 'Salvataggio…' : 'Crea'}
                </button>
            </form>
        </div>
    );
}
