import React, { useEffect, useState } from 'react'
import './DeckPage.css'
import { useParams } from 'react-router-dom'
import type { Deck } from '../../types/Deck'
import axios from 'axios'
import { Target, Check , X } from 'lucide-react'
import './DeckPage.css'
import CardComponent from '../../components/Card/CardComponent'
import type { Card } from '../../types/Card'
interface DeckPageProps{
    decks:Deck[]
}

const DeckPage:React.FunctionComponent<DeckPageProps> = ({decks}) => {
  
    const {deckId} = useParams()

    const [correctCount,setCorrectCount] = useState(0)
    const [wrongCount,setWrongtCount] = useState(0)
    const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
    const [answersCount, setAnswersCount] = useState(0)
    const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined)
    const [currentSideIndex , setCurrentSideIndex] = useState<1 | 0>(0)
    const [cardIndex, setCardIndex] = useState(0)
    const [isResult, setIsPesult] = useState(false)



    const fetchCurrentDeck = async (id:typeof deckId) =>{
        const res =  await axios.get<Deck>('https://68dbf0f1445fdb39dc2727be.mockapi.io/decks/'+deckId)
        return res.data 
    }

    useEffect(()=>{
        fetchCurrentDeck(deckId).then(deck => {
            setCurrentDeck(deck)
            if(deck){
                setCurrentCard(deck.cards[cardIndex])
            }
        })
    },[deckId])

    const cardsCount = currentDeck?.cards.length

    const handleCardClick = () =>{
        setCurrentSideIndex(currentSideIndex === 1 ? 0 : 1 )
    }
    const handleCorrectClick = () => {
        setCorrectCount(correctCount + 1)
        setAnswersCount(answersCount+1)
        cardIndexSwitcher()
        
    }
    const handleWrongClick = () => {
        setWrongtCount(wrongCount + 1)
        setAnswersCount(answersCount+1)
        cardIndexSwitcher()
        
        
    }

    const cardIndexSwitcher = () => {

        if(currentDeck?.cards && cardIndex >= currentDeck?.cards.length - 1){
            setIsPesult(true)
            return
        }

        const newIndex = cardIndex + 1
        setCardIndex(newIndex)
        setCurrentCard(currentDeck?.cards[newIndex])
    }

    const restart = () => {
        setAnswersCount(0)
        setCorrectCount(0)
        setWrongtCount(0)
        setCardIndex(0)
        setCurrentSideIndex(0)
        setIsPesult(false)
        setCurrentCard(currentDeck?.cards[0])
    }

  return (
    <div className='deck-cards'>
            <div className='deck-cards__wrapper'>
                {
                    cardsCount === 0 ? (
                    <div className='deck-cards__empty'>
                        <h1>No cards</h1>
                    </div>) : (
                            <>
                                <div className='deck-cards__progress'>
                                    <p> <Target/> Study progress  {answersCount}/{cardsCount}</p>
                                    <div className='deck-cards__progress__answers'>
                                            <p className='deck-cards__propgress__answers-elem'><Check className='deck-cards__propgress__answers-elem-correct'/>{correctCount} <br /> Правильно</p>
                                            <p className='deck-cards__propgress__answers-elem'><X className='deck-cards__propgress__answers-elem-wrong'/> {wrongCount} <br />  Неправильно</p>
                                    </div>
                                </div>
                                {
                                    isResult 
                                            ? 
                                            <div className='deck-cards__result'>
                                                <p>Deck completed! 🎉</p>
                                                <span>You got {correctCount} correct of {cardsCount}</span>
                                                <button onClick={() => restart()}>Restart</button>
                                            </div> 
                                            : 
                                            <div className='deck-cards__cards__wrapper'>
                                                <p className='deck-cards__cards__wrapper__title'>Card {answersCount+1} of {cardsCount}</p>
                                                <p className='deck-cards__cards__wrapper__descr'>Learning deck "{currentDeck?.title}"</p>
                                                <CardComponent handleCorrectClick={handleCorrectClick} handleWrongClick={handleWrongClick} handleCardClick={handleCardClick} currentCard = {currentCard} setCurrentCard = {setCurrentCard} currentSideIndex={currentSideIndex}/>
                                            </div>
                                }
                            
                            </>
                    )
                }

                
            </div>

        
    </div>
  )
}

export default DeckPage