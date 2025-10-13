import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import DecksPage from './Pages/DecksPage/DecksPage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Deck } from './types/Deck'
import DeckPage from './Pages/DeckPage/DeckPage'

function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const [decks,setDecks] = useState<Deck[] | []>([])

  const getDecks = async () =>{
    const res = await axios.get(`${apiKey}/decks`)
    setDecks([...res.data])
  }

  useEffect(() =>{
    getDecks()
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<DecksPage decks={decks} setDecks={setDecks}/>} />
          <Route path='/:deckId' element={<DeckPage decks={decks} />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
