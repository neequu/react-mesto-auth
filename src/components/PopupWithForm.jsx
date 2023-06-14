import React, { useState } from 'react'
import Popup from './Popup'

function PopupWithForm({isOpen, name, onClose, children, buttonText, title, onSubmit}) {
    const handleSubmit = async e => {
      e.preventDefault()
      onSubmit()
      await new Promise(res => setTimeout(res, 1000))
      e.target.reset()
    }

    const form = React.useRef()


    const handleClose = () => {
      onClose()
      form.current.reset()
    }

    return (
      <Popup 
        isOpen={isOpen}
        name={name}
        onClose={handleClose}
      >
        
        <div className="popup__container">
          <button type="button" className="popup__close-button"
            data-button="close" onClick={onClose}></button>
          <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
          <form 
            name={`form-${name}`} 
            id={`${name}-form`} 
            className="form popup__form"
            onSubmit={handleSubmit}
            ref={form}
          >
            <fieldset className="form__set">
              {children}
              <button 
                type="submit" 
                className="form__submit-button" 
              >
              {buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </Popup>
  
    );
  }
  
  export default PopupWithForm;