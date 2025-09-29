import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import DecksPage from './Pages/DecksPage/DecksPage'
import CreatePage from './Pages/CreatePage/CreatePage'
import StatisticPage from './Pages/StatisticPage/StatisticPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<DecksPage/>} />
          <Route path='/statistic' element={<StatisticPage/>}/>
          <Route path='/create' element={<CreatePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
