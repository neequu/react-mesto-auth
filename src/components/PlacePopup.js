import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function PlacePopup(props) {
    const {isOpen, onClose, onAddPlace, isLoadingPlace} = props
    const [placeName, setPlaceName] = React.useState(null)
    const [placeLink, setPlaceLink] = React.useState(null)

    const handleSubmit = () => { 
      onAddPlace({
        name: placeName,
        link: placeLink,
      })
 
    }
    return (
        <PopupWithForm
          name="place"
          title="Новое место"
          isOpen={isOpen}
          onClose={onClose}
          buttonText={isLoadingPlace ? 'Создание...' : 'Создать'}
          onSubmit={handleSubmit}
        >
            <input 
              id="place-title" 
              data-input="place-name" 
              type="text"
              className="form__input"
              placeholder="Название" 
              name="name" 
              required 
              minLength="2"
              maxLength="30"
              onChange={e => setPlaceName(e.target.value)}
            />
            <span id="place-title-error" className="form__input-error"></span>
            <input 
              id="place-link" 
              data-input="place-link" 
              type="url"
              className="form__input"
              placeholder="Ссылка на картинку" 
              name="link" 
              required
              onChange={e => setPlaceLink(e.target.value)}
            />
            <span id="place-link-error" className="form__input-error"></span>
        </PopupWithForm>
  );
  }
  
  export default PlacePopup;