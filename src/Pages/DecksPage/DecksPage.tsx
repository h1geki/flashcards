import React, { useState } from 'react'
import type { Deck } from '../../types/Deck'
import cardBgc from '../../imgs/card-bgc.jpeg'
import './DecksPage.css'
import DeckComponent from '../../components/Deck/DeckComponent'
import './DecksPage.css'

interface DecksPageProps{
    decks:Deck[] | [];
    setDecks:(decks:Deck[]) => void
}


const DecksPage:React.FunctionComponent<DecksPageProps> = ({decks,setDecks}) => {
  const removeDeck = (id:number):void => {
    const filterDecks = decks.filter(deck => deck.id !== id)
    setDecks(filterDecks)
  }

  return (
    <div className='decks'>
        <div className="decks__wrapper">
            <div className='decks__header'>
                <div className='decks__text'>
                    <h2 className='decks__title'>My decks</h2>
                    <p className='decks__descr'>Manage your card decks</p>
                </div>
            </div>
            {
                decks?.length ? <div className='decks__list'>
                {
                    decks.map(deck => (
                        <DeckComponent key={deck.id} deck={deck} removeDeck={removeDeck}/>
                    ))
                }
            </div>
            :
            <div className='decks__message'>You don't have decks yet</div>
            }
            
        </div>
    </div>
  )
}

export default DecksPage