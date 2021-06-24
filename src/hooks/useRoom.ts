import { useEffect, useState } from "react"
import { database } from "../services/firebase"

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

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHightLighted: boolean

}>
export function useRoom(roomID :string){
    
       const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomID}`)


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

    }, [roomID])

    return {
        questions,title
    }

}