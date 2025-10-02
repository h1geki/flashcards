import React from 'react'
import type { Card} from '../../types/Card'
import './CardComponent.css'
import { Check, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps{
  currentCard:Card | undefined,
  setCurrentCard:(card:Card) => void,
  currentSideIndex: 1 | 0,
  handleCardClick:() => void,
  handleCorrectClick:() => void,
  handleWrongClick:() => void
}

const CardComponent:React.FunctionComponent<CardProps> = ({currentCard, currentSideIndex,handleCardClick, handleCorrectClick,handleWrongClick}) => {
  return (
    <motion.div className='card' onClick={() => handleCardClick()}>
        {
        !currentSideIndex ? 
        <motion.div 
          className='card__first-side cardCur'
        >
            {currentCard?.firstSide}
        </motion.div> 
        : 
        <motion.div 
            className='card__second-side cardCur'
        >
          {currentCard?.secondSide} 
          <div className='card__second-side__btns'>
            <button onClick={() => handleWrongClick() } className='card__second-side__btns-elem btn-wrong'><X size={17}/>Wrong</button>
            <button onClick={() => handleCorrectClick()} className='card__second-side__btns-elem btn-correct'><Check/>Correct</button>
          </div>
        </motion.div>
      }
    </motion.div>
  )
}

export default CardComponent