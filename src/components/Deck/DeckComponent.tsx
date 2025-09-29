import React from 'react'
import type { Deck } from '../../types/Deck'
import MyButton from '../ui/MyButton/MyButton';
import './DeckComponent.css'


interface DeckComponentProps {
  deck:Deck;
}
const DeckComponent:React.FunctionComponent <DeckComponentProps> = ({deck}) => {
  return (
    <div className='deck'>
      <h3 className='deck__title'>{deck.title}</h3>
      <div className='deck__img'>
      </div>
      <p className='deck__descr'>{deck.desck}</p>
      
    </div>
  )
}

export default DeckComponent