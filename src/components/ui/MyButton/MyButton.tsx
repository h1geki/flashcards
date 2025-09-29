import React from 'react'
import './MyButton.css'

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
}


const MyButton:React.FunctionComponent<MyButtonProps> = ({children , ...props}) => {
  return (
    <button className='myBtn' {...props}>{children}</button>
  )
}

export default MyButton