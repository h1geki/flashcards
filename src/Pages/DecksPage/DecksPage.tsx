import React, { useState } from 'react'
import type { Deck } from '../../types/Deck'
import cardBgc from '../../imgs/card-bgc.jpeg'
import './DecksPage.css'
import DeckComponent from '../../components/Deck/DeckComponent'
import './DecksPage.css'
import MyButton from '../../components/ui/MyButton/MyButton'
import { Plus, Save } from 'lucide-react'
import Modal from '../../components/Modal/Modal'
import MyTextArea from '../../components/ui/MyInput/MyTextArea'

interface DecksPageProps{
    decks:Deck[] | [];
    setDecks:(decks:Deck[]) => void
}


const DecksPage:React.FunctionComponent<DecksPageProps> = ({decks,setDecks}) => {


  const [isModal , setIsModal] = useState(false)


  const removeDeck = (id:number):void => {
    const filterDecks = decks.filter(deck => deck.id !== id)
    setDecks(filterDecks)
  }

  const handleModal = () => {
    setIsModal(!isModal)
  }
  return (
    <div className='decks'>
        <Modal isModal={isModal} handleModal={handleModal}>
            <div className='decks__modal-title'>Create a new Deck</div>
            <form className='decks__modal__form'>
                <div className='decks__modal__form__text-wrapper'>
                    <label htmlFor="deck-name">Deck name</label>
                    <MyTextArea name='deck-name' rows={5} placeholder={'Enter Deck name'}/>
                </div>
                <div className='decks__modal__form__text-wrapper'>
                    <label htmlFor="deck-descr">Deck description</label>
                    <MyTextArea name='deck-descr' rows={5} placeholder={'Enter Deck description'}/>
                </div>
                <div className='decks__modal__form__btns'>
                    <button className='dekcs__modal__form__btns-save'><Save size={17}/> Save Deck</button>
                    <button className='dekcs__modal__form__btns-cancel' onClick={() => handleModal()}>Cancel</button>
                </div>    
            </form>

        </Modal>
        <div className="decks__wrapper">
            <div className='decks__header'>
                <div className='decks__text'>
                    <h2 className='decks__title'>My decks</h2>
                    <p className='decks__descr'>Manage your card decks</p>
                </div>
                    <button className='decks__header-btn' onClick={() => setIsModal(true)} ><Plus size={20}/>Create</button>
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