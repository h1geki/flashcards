import React, { useState } from 'react'
import type { Deck } from '../../types/Deck'
import MyButton from '../ui/MyButton/MyButton';
import './DeckComponent.css'
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';


interface DeckComponentProps {
  deck:Deck;
  removeDeck:(id:number)=>void;
  handleModalCard:(deckID:number) => void
}
const DeckComponent:React.FunctionComponent <DeckComponentProps> = ({deck, removeDeck , handleModalCard}) => {
  const navigate = useNavigate()
  return(
    <div className='deck'>
      
      <h3 className='deck__title'>{deck.title}</h3>
      <div className='deck__img'>
      </div>
      <p className='deck__descr'>{deck.descr}</p>
      <div className='deck__btns'>
        <MyButton onClick={() =>navigate(`/${deck.id}`)} >Learn</MyButton>
        <button className='deck__btns-add' onClick={() => handleModalCard(deck.id)} >Add Card</button>
      </div>
      <Trash onClick={() => removeDeck(deck.id)}  className='deck__delete'/>
    </div>
  )
}

export default DeckComponent