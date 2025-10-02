import React from 'react'
import type { Deck } from '../../types/Deck'
import MyButton from '../ui/MyButton/MyButton';
import './DeckComponent.css'
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface DeckComponentProps {
  deck:Deck;
  removeDeck:(id:number)=>void
}
const DeckComponent:React.FunctionComponent <DeckComponentProps> = ({deck, removeDeck}) => {

  const navigate = useNavigate()
  return (
    <div className='deck'>
      <h3 className='deck__title'>{deck.title}</h3>
      <div className='deck__img'>
      </div>
      <p className='deck__descr'>{deck.descr}</p>
      <div className='deck__btns'>
        <MyButton onClick={() =>navigate(`/${deck.id}`)} >Learn</MyButton>
        <button className='deck__btns-add'>Add Card</button>
      </div>
      <Trash onClick={() => removeDeck(deck.id)}  className='deck__delete'/>
    </div>
  )
}

export default DeckComponent