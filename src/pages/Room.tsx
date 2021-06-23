import React from 'react'

import { useParams } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import "../styles/room.scss"

import Button from '../components/Button'
import RoomCode from "../components/RoomCode"

export default function Room() {
    const params: RoomParams = useParams()
    type RoomParams = {
        id: string
    }
    return (
        <div>
            <div id="page-room">

                <header>
                    <div className="content">
                        <img src={logoImg} alt="letmeask" />
                        <RoomCode code={params.id} />
                    </div>
                </header>

                <main >
                    <div className="room-title">
                        <h1>Sala React</h1>
                        <span>
                            4 perguntas
                        </span>
                    </div>

                    <form >
                        <textarea className="question"
                            placeholder="o que você quer perguntar?"
                        />
                        <div className="form-footer">
                            <span>Para enviar uma pergunta, <button>faça seu Login</button> </span>
                            <Button type="submit"> Enviar pergunta</Button>

                        </div>
                    </form>

                </main>
            </div>

        </div>
    )
}
