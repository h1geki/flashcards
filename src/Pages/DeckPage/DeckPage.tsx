import React, { useEffect, useState } from 'react'
import './DeckPage.css'
import { useParams } from 'react-router-dom'
import type { Deck } from '../../types/Deck'
import axios from 'axios'
import { Target, Check , X } from 'lucide-react'
import './DeckPage.css'

interface DeckPageProps{
    decks:Deck[]
}

const DeckPage:React.FunctionComponent<DeckPageProps> = ({decks}) => {
  
    const {deckId} = useParams()

    const [correctCount,setCorrectCount] = useState(0)
    const [wrongCount,wrongtCount] = useState(0)
    const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
    const [answersCount, setAnswersCount] = useState(0)



    const fetchCurrentDeck = async (id:typeof deckId) =>{
        const res =  await axios.get<Deck>('https://68dbf0f1445fdb39dc2727be.mockapi.io/decks/'+deckId)
        return res.data 
    }

    useEffect(()=>{
        fetchCurrentDeck(deckId).then(deck => setCurrentDeck(deck))
    },[deckId])

    const cardsCount = currentDeck?.cards.length


  return (
    <div className='deck-cards'>
        <div className='deck-cards__wrapper'>
            <div className='deck-cards__progress'>
                <p> <Target/> Study progress  {answersCount}/{cardsCount}</p>
                <div className='deck-cards__progress__answers'>
                        <p className='deck-cards__propgress__answers-elem'><Check className='deck-cards__propgress__answers-elem-correct'/>{correctCount} <br /> Правильно</p>
                        <p className='deck-cards__propgress__answers-elem'><X className='deck-cards__propgress__answers-elem-wrong'/> {wrongCount} <br />  Неправильно</p>
                </div>
            </div>
            <div className='deck-cards__cards__wrapper'>

            </div>
        </div>
    </div>
  )
}

export default DeckPage