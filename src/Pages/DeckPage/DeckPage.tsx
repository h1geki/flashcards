import React from 'react'
import './DeckPage.css'
import { useParams } from 'react-router-dom'
import type { Deck } from '../../types/Deck'

interface DeckPageProps{
    decks:Deck[]
}

const DeckPage:React.FunctionComponent<DeckPageProps> = ({decks}) => {
  
    const {deckId} = useParams()

    const currentDeck = decks.find(deck => deck.id === Number(deckId))
    console.log(currentDeck)

  return (
    <div className='deck-cards'>
        <div className='deck-cards__wrapper'>
            <div className='deck-cards__progress'>
                {
                    currentDeck?.title
                }
            </div>
        </div>
    </div>
  )
}

export default DeckPage