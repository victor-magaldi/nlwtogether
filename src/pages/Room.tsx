import React, { FormEvent, useState, useEffect } from 'react'

import { useParams } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import "../styles/room.scss"

import Button from '../components/Button'
import RoomCode from "../components/RoomCode"
import Question from "../components/Question"
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHightLighted: boolean

}>
type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHightLighted: boolean
}
type RoomParams = {
    id: string
}
export default function Room() {
    const { user } = useAuth()
    const params: RoomParams = useParams()
    const [newQuestion, setNewQuestion] = useState("")
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    const roomId = params.id

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)


        roomRef.on("value", room => {
            const dataBaseQuestions = room.val()
            const firebaseQuestions: FirebaseQuestions = dataBaseQuestions.questions ?? {}
            const parsetQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHightLighted: value.isHightLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(dataBaseQuestions.title)
            setQuestions(parsetQuestions)
        })

    }, [roomId])
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        if (newQuestion.trim() === "") return
        if (!user) {
            throw new Error("You must be logged in")
        }
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar
            },
            isHightLighted: false,
            isAnswered: false
        }
        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')

    }

    return (
        <div>
            <div id="page-room">

                <header>
                    <div className="content">
                        <img src={logoImg} alt="letmeask" />
                        <RoomCode code={roomId} />
                    </div>
                </header>

                <main >
                    <div className="room-title">
                        <h1>Sala {title}</h1>
                        {questions.length > 0 && <span>
                            {questions.length} pergunta(s)
                        </span>}


                    </div>

                    <form onSubmit={handleSendQuestion}>
                        <textarea className="question"
                            placeholder="o que você quer perguntar?"
                            onChange={e => setNewQuestion(e.target.value)}
                            value={newQuestion}
                        />
                        <div className="form-footer">
                            {user ?
                                (<div className="user-info">
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>) :
                                (<span>Para enviar uma pergunta, <button>faça seu Login</button> </span>)
                            }

                            <Button type="submit" disabled={!user}> Enviar pergunta</Button>

                        </div>
                    </form>
                   {questions.map(question=>{
                       return(
                           <Question key={question.id}content={question.content} author={question.author}/>
                       )
                   })}
                </main>
            </div>

        </div>
    )
}
