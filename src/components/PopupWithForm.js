function PopupWithForm(props) {
    const {isOpen, name, onClose, children, buttonText, title, onSubmit} = props
    const handleSubmit = async e => {
      e.preventDefault()
      onSubmit()
      await new Promise(res => setTimeout(res, 1000))
      e.target.reset()
    }
    
    return (
      <div 
        className={`popup ${isOpen ? 'popup_opened' : ''}`} 
        id={`popup-${name}`}
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
      </div>
  
    );
  }
  
  export default PopupWithForm;