    import React, { type ReactNode } from 'react'
    import './Modal.css'

    interface ModalProps{
        children:ReactNode,
        isModal:boolean
    }

    const Modal:React.FunctionComponent<ModalProps> = ({children, isModal}) => {
    return isModal ? (
        <div className='modal'>
            <div className='modal__content'>
                {
                    children
                }
            </div>
        </div>
        
    ) : null
}

export default Modal