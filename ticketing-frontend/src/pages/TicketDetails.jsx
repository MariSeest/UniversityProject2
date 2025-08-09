import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GoBackButton from '../components/GoBackButton'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

export default function TicketDetails() {
    const { id } = useParams()
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()

    const [ticket, setTicket] = useState(null)
    const [tree, setTree] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(()=>{ load() },[id])

    async function load(){
        // ⬇⬇ URL completi
        const t = await axios.get(`http://localhost:8080/tickets/${id}`)
        setTicket(t.data)
        const c = await axios.get(`http://localhost:8080/tickets/${id}/comments`)
        setTree(c.data)
    }

    async function addComment(parentId=null){
        if(!newComment.trim()) return
        if (!isAuthenticated) {
            loginWithRedirect()
            return
        }
        await axios.post(`http://localhost:8080/tickets/${id}/comments`, {
            content: newComment, parentId,
            author: user?.name || user?.email || 'Anon'
        })
        setNewComment('')
        load()
    }

    async function deleteComment(commentId){
        if(!confirm('Eliminare il commento?')) return
        await axios.delete(`http://localhost:8080/tickets/${id}/comments/${commentId}`)
        load()
    }

    function Node({node}){
        const [replyOpen, setReplyOpen] = useState(false)
        const [replyText, setReplyText] = useState('')
        return (
            <div style={{borderLeft:'2px solid #e5e7eb', marginLeft:12, paddingLeft:12, marginTop:8}}>
                <div className="row">
                    <div style={{fontWeight:600}}>{node.author || 'Anon'}</div>
                    <div style={{marginLeft:'auto', fontSize:12, color:'#6b7280'}}>{node.createdAt}</div>
                </div>
                <div>{node.content}</div>
                <div className="row" style={{gap:8, marginTop:4}}>
                    <button className="go-back" onClick={()=>setReplyOpen(v=>!v)}>Rispondi</button>
                    <button className="go-back" onClick={()=>deleteComment(node.id)}>Elimina</button>
                </div>
                {replyOpen && (
                    <div style={{marginTop:6}}>
                        {!isAuthenticated ? (
                            <button className="primary" onClick={()=>loginWithRedirect()}>Login per rispondere</button>
                        ) : (
                            <>
                                <textarea rows={3} value={replyText} onChange={e=>setReplyText(e.target.value)} />
                                <div>
                                    <button className="primary" onClick={async ()=>{
                                        if(!replyText.trim()) return
                                        await axios.post(`http://localhost:8080/tickets/${id}/comments`, {
                                            content: replyText, parentId: node.id,
                                            author: user?.name || user?.email || 'Anon'
                                        })
                                        setReplyText(''); setReplyOpen(false); load()
                                    }}>Invia</button>
                                </div>
                            </>
                        )}
                    </div>
                )}
                {(node.replies||[]).map(r => <Node key={r.id} node={r} />)}
            </div>
        )
    }

    if(!ticket) return <p>Caricamento…</p>

    return (
        <div className="page">
            <GoBackButton />
            <h2>{ticket.title} <span className={`badge ${ticket.priority?.toLowerCase()}`}>{ticket.priority}</span></h2>
            <p>{ticket.description}</p>

            <h3 style={{marginTop:24}}>Commenti</h3>
            <div className="card">
                {(tree||[]).length === 0 && <p>Nessun commento.</p>}
                {tree.map(n => <Node key={n.id} node={n} />)}
                <div style={{marginTop:12}}>
                    {!isAuthenticated ? (
                        <button className="primary" onClick={()=>loginWithRedirect()}>Login per commentare</button>
                    ) : (
                        <>
                            <textarea rows={3} value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Scrivi un commento…" />
                            <div><button className="primary" onClick={()=>addComment(null)}>Invia</button></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
