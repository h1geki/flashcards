import React from 'react'
import './MyTextArea.css'

interface MyTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{

}

const MyTextArea = ({...props}) => {
  return (
    <textarea className='myTextArea' {...props}>

    </textarea>
  )
}

export default MyTextArea