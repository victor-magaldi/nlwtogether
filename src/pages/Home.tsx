import {useHistory} from "react-router-dom"

import illustration from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import Button from "../components/Button";

import { useAuth } from "../hooks/useAuth";

export function Home() {
  const history = useHistory()

  const {signInWithGoogle, user} = useAuth()

  async function handleCreateRoom(){
    if(!user){
       await signInWithGoogle()
    }
    history.push("/rooms/new")
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
          <button  onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="google logo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="digite o código da sala" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
