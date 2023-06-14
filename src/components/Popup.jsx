function PopupWithForm(props) {
  const {onClose, isOpen, name, children} = props
  
  const handleOverlayClick = e => {
    if (e.target.classList.contains('popup')) onClose()
  }
  
  const handleKeyDown = e => {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div 
      className={`popup ${isOpen ? 'popup_opened' : ''}`} 
      id={`popup-${name}`}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {children}
    </div>

  );
}

export default PopupWithForm;