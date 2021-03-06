import React, {} from "react";

import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"

import "../styles/room.scss";

import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import Question from "../components/Question";

import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};
export default function AdminRoom() {
//   const { user } = useAuth();
  const params: RoomParams = useParams();
  const history = useHistory()
//   const [newQuestion, setNewQuestion] = useState("");

  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  
  async function handleDelete(questionId:string) {
    if( window.confirm("deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }  
  }
  async function handleEndRoom() {
      await database.ref(`room/${roomId}`).update({
          endedAt: new Date()
      })
      history.push("/")
  }
  async function handleCheckAsAnswered(questionId:string){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
          isAnswered:true
      })

  }
  async function handleHilightQuestion(questionId:string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
          isHighlighted:true
      })
  }

  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="letmeask" />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                    <button type="button" onClick={(e)=>{handleCheckAsAnswered(question.id)}}>
                        <img src={checkImg} alt="" />
                    </button>
                                      <button type="button" onClick={(e)=>{handleHilightQuestion(question.id)}}>
                        <img src={answerImg} alt="repondida" />
                    </button>
                    <button type="button" onClick={(e)=>{handleDelete(question.id)}}>
                        <img src={deleteImg} alt="deletar " />
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
