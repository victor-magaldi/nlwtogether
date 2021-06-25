import React, {} from "react";

import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg"
import "../styles/room.scss";

import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import Question from "../components/Question";
// import { useAuth } from "../hooks/useAuth";
// import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};
export default function AdminRoom() {
//   const { user } = useAuth();
  const params: RoomParams = useParams();
//   const [newQuestion, setNewQuestion] = useState("");

  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  
  async function handleDelete(questionId:string) {
    if( window.confirm("deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
      
  }

  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="letmeask" />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined>Encerrar sala</Button>
            </div>
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>

          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                    <button type="button" onClick={(e)=>{handleDelete(question.id)}}>
                        <img src={deleteImg} alt="" />
                    </button>
                </Question>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
