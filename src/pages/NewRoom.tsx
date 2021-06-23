import React from 'react'
import { useContext } from "react";

import { Link } from 'react-router-dom';

import logoImg from "../assets/images/logo.svg";
import illustration from "../assets/images/illustration.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { AuthContext } from '../contexts/AuthContext';

export default function NewRoom() {
    const {user} = useContext(AuthContext)
      console.log(user)
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
          <form>
            <input type="text" placeholder="Nome  da sala" />

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
