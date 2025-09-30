import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import DecksPage from './Pages/DecksPage/DecksPage'
import CreatePage from './Pages/CreatePage/CreatePage'
import StatisticPage from './Pages/StatisticPage/StatisticPage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Deck } from './types/Deck'
import DeckPage from './Pages/DeckPage/DeckPage'

function App() {

  const [decks,setDecks] = useState<Deck[] | []>([])

  const getDecks = async () =>{
    const res = await axios.get('https://68dbf0f1445fdb39dc2727be.mockapi.io/decks')
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
          <Route path='/statistic' element={<StatisticPage/>}/>
          <Route path='/create' element={<CreatePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
