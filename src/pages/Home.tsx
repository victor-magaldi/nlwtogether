import { useHistory } from "react-router-dom"

import illustration from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import Button from "../components/Button";

import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory()
  const [roomCode, setRoomCode] = useState('')

  const { signInWithGoogle, user } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push("/rooms/new")
  }
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') return


    // busca apenas o registro de uma sala 
    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert("Room does not exist")
      return
    }
    if(roomRef.val().endedAt){
      alert('Room already closed ')
      return
    }

    history.push(`/rooms/${roomCode}`)
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

          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="google logo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value)} />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
