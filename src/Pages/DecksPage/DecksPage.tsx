import React, { useState, type ReactEventHandler } from 'react'
import type { Deck } from '../../types/Deck'
import DeckComponent from '../../components/Deck/DeckComponent'
import './DecksPage.css'
import { Plus, Save } from 'lucide-react'
import Modal from '../../components/Modal/Modal'
import MyTextArea from '../../components/ui/MyInput/MyTextArea'
import type { DeckForm } from '../../types/DeckForm'
import axios from 'axios'
import type { Card } from '../../types/Card'

interface DecksPageProps{
    decks:Deck[] | [];
    setDecks:(decks:Deck[]) => void
}


const DecksPage:React.FunctionComponent<DecksPageProps> = ({decks,setDecks}) => {

  
  const [isModal , setIsModal] = useState(false)
  const [isModalCard , setIsModalCard] = useState(false)
  const [currentDeckId,setCurrentDeckId] = useState<number | null>(null)

  const removeDeck = async (id:number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту колоду?')) {
    return
    }

    try{
      await axios.delete(`https://68dbf0f1445fdb39dc2727be.mockapi.io/decks/${id}`)
      const filterDecks = decks.filter(deck => deck.id !== id)
      setDecks(filterDecks)


    }catch (error){
      console.error('Error', error)
      alert('Не удалось найти колоду')
    }
    
  }

  const [deckFormData , setDeckFormData] = useState<DeckForm>({
    title:'',
    descr:'',
    logo:'',
    cards:[],
  })
  const [cardFormData, setCardFormData] = useState<Card>({
    firstSide:'',
    secondSide:''
  })

  const createDeck = async () => {
    const response = await axios.post<Deck>('https://68dbf0f1445fdb39dc2727be.mockapi.io/decks',deckFormData)
    setDecks([...decks, response.data])
    setIsModal(false)
    setDeckFormData({
      title: '',
      descr: '',
      logo: '',
      cards: [],
    })
  }

  const handleModal = () => {
    setIsModal(!isModal)
  }
  const handleModalCard = (deckId?:number) => {
    if(deckId){
      setCurrentDeckId(deckId)
    }

    setIsModalCard(!isModalCard)
    if(isModalCard){
      setCardFormData({
        firstSide:"",
        secondSide:""
      })
    }
  }


  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name , value} = e.target
    setDeckFormData((prev) => ({...prev, [name]:value}))
  }
  const handleChangeCard = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name,value} = e.target
    setCardFormData((prev) => ({...prev, [name]:value}))
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    createDeck()  
  }

  const handleSubmitCard = async (e:React.FormEvent) => {
    e.preventDefault()


    if(!currentDeckId) return

    try {
      const updateDeck = decks.find(deck => deck.id === currentDeckId)

      if(!updateDeck) return;

      const newCard:Card = {
        firstSide:cardFormData.firstSide,
        secondSide:cardFormData.secondSide,
      } 

      const newDeck:Deck  = {
        ...updateDeck, cards:[...updateDeck.cards , newCard]
      }

      const response = await axios.put<Deck>(`https://68dbf0f1445fdb39dc2727be.mockapi.io/decks/${currentDeckId}` , newDeck)
      
      setDecks(decks.map(deck => deck.id === currentDeckId ? response.data : deck))

      setIsModalCard(false)
      setCardFormData({
        firstSide: '',
        secondSide: ''
      })
      setCurrentDeckId(null)
    }

    catch (error) {
    console.error('Ошибка при создании карточки:', error)
  }
  }
  return (
    <div className='decks'>
        <Modal isModal={isModal}>
            <div className='decks__modal-title'>Create a new Deck</div>
            <form className='decks__modal__form' onSubmit={handleSubmit}>
                <div className='decks__modal__form__text-wrapper'>
                    <label htmlFor="deck-name">Deck name</label>
                    <MyTextArea value={deckFormData.title} onChange={handleChange} name='title' rows={5} placeholder={'Enter Deck name'}/>
                </div>
                <div className='decks__modal__form__text-wrapper'>
                    <label htmlFor="deck-descr">Deck description</label>
                    <MyTextArea onChange={handleChange} name='descr' rows={5} placeholder={'Enter Deck description'}/>
                </div>
                <div className='decks__modal__form__btns'>
                    <button className='dekcs__modal__form__btns-save'><Save size={17}/> Save Deck</button>
                    <button className='dekcs__modal__form__btns-cancel' onClick={() => handleModal()}>Cancel</button>
                </div>    
            </form>
        </Modal>

        <Modal isModal={isModalCard}>
            <div className='decks__modal-title'>Create a new Card</div>
            <form className='decks__modal__form' onSubmit={handleSubmitCard}>
                <div className='decks__modal__form__text-wrapper'>
                    <label htmlFor="card-firstSide">Card firstside</label>
                    <MyTextArea name='firstSide' rows={5} onChange={handleChangeCard} placeholder={'Enter Card firstside text'}/>
                </div>
                <div className='decks__modal__form__text-wrapper'>
                    <label htmlFor="card-secondSide">Card secondside</label>
                    <MyTextArea name='secondSide' onChange={handleChangeCard} rows={5} placeholder={'Enter Card secondside text'}/>
                </div>
                <div className='decks__modal__form__btns'>
                    <button className='dekcs__modal__form__btns-save'><Save size={17}/> Save Card</button>
                    <button className='dekcs__modal__form__btns-cancel' onClick={() => handleModalCard()}>Cancel</button>
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
                        <DeckComponent key={deck.id} deck={deck} removeDeck={removeDeck} handleModalCard={handleModalCard}/>
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