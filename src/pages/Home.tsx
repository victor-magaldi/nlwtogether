import illustration from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

export function Home() {
  return (
    <div>
      <aside>
        <img src={illustration} alt="Ilustração" />
        <strong>Crie salas de Q&A ao vivo</strong>
        <strong>Tire dúvidas em tempo real</strong>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="logo" />
          <button>
            <img src={googleIcon} alt="google logo" />
            Crie sua sala com o Google
          </button>
          <div>ou entre em uma sala</div>
          <form>

              <input
              type="text"
               placeholder="digite o código da sala" />
            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
}
