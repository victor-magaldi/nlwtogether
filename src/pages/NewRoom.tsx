import React, { FormEvent } from 'react'

import { Link, useHistory } from 'react-router-dom';

import logoImg from "../assets/images/logo.svg";
import illustration from "../assets/images/illustration.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

export default function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState("")


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    if (newRoom.trim() === "") {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,

    })
    console.log(firebaseRoom)
    history.push(`/rooms/${firebaseRoom.key}`)
  }
  return (
    <div id="page-auth">
      <aside>

        <img src={illustration} alt="Ilustração" />
        <strong>Crie salas de Q&A ao vivo</strong>
        <strong>Tire dúvidas em tempo real</strong>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome  da sala"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)} />

            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
