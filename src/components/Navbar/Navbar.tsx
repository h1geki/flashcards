import React from 'react'
import { BookOpen,Plus, TrendingUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar:React.FunctionComponent = () => {
  
  const navigate = useNavigate()

  const navLinks = [
    {icon:BookOpen , text:'My decks', to:'/'}  
]
  
  return (
    <header className='header'>
        <nav className='header__navigation'>
            <div className='header__logo' onClick={() => navigate('/')}>
                <div className='header__logo-img'>
                    <BookOpen/>
                </div>
                <h1>FlashCards</h1>
            </div>
            <ul className='header__navigation__list'>
                {
                    navLinks.map(link => (
                        <Link key={link.to} className='header__navigation__list-item' to={link.to}>
                            <link.icon className='header__navigation__list-item-icon'/>
                            <div className='header__navigation__list-item-text'>
                                {link.text}
                            </div>    
                        </Link>
                    ))
                }
            </ul>
        </nav>
    </header>
  )
}

export default Navbar