import React from 'react'
import type { Deck } from '../../types/Deck'
import cardBgc from '../../imgs/card-bgc.jpeg'
import './DecksPage.css'
import DeckComponent from '../../components/Deck/DeckComponent'
import './DecksPage.css'
import MyButton from '../../components/ui/MyButton/MyButton'
import {Plus} from 'lucide-react'

const DecksPage:React.FunctionComponent = () => {

  const decks:Deck[] = [
    {title:'Deutsch' , logo:cardBgc, desck:'Основные слова и фразы для изучения немецкого'},
    {title:'Englisch' , logo:cardBgc, desck:'Основные слова и фразы для изучения английского'},
    {title:'Common' , logo:cardBgc, desck:'Основные слова и фразы для изучения common'}
  ]
  return (
    <div className='decks'>
        <div className="decks__wrapper">
            <div className='decks__header'>
                <div className='decks__text'>
                    <h2 className='decks__title'>My decks</h2>
                    <p className='decks__descr'>Manage your card decks</p>
                </div>
            </div>

            <div className='decks__list'>
                {
                    decks.map(deck => (
                        <DeckComponent key={deck.title} deck={deck}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default DecksPage