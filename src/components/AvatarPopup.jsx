import PopupWithForm from './PopupWithForm.jsx'
import FormInput from './FormInput.jsx'
import { useState } from 'react';



function AvatarPopup(props) {
    const {isOpen, onClose, onUpdateAvatar, isLoadingAvatar} = props
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = () => onUpdateAvatar( {avatar: avatar} )

    const handleChange = e => setAvatar(e.target.value)

    return (
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isOpen}
          onClose={onClose}
          buttonText={isLoadingAvatar ? 'Сохранение...' :'Сохранить'}
          onSubmit={handleSubmit}
        >
            <FormInput 
              id="avatar-link" 
              data-input="avatar-link" 
              type="url"
              className="form__input"
              placeholder="Ссылка на картинку" 
              name="link" 
              required
              onChange={handleChange}
              errorMsg="Вставьте ссылку"
              onClose={onClose}
            />

        </PopupWithForm>
  );
  }
  
  export default AvatarPopup;