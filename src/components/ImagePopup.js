function ImagePopup(props) {
    const {name, link} = props.card
    const {isOpen, onClose} = props
  

    return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} id="popup-image">
      <div className="popup__expanded-image-container">
      <button type="button" className="popup__close-button"
          data-button="close" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={link} id="popup-img" className="popup__img" alt={name}/>
          <figcaption id="popup-caption" className="popup__caption">{name}</figcaption>
        </figure>
      </div>
    </div>
  
      );
  }
  
  export default ImagePopup;