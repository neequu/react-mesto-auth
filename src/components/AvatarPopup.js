import PopupWithForm from './PopupWithForm.js'
import {useRef} from 'react'


function AvatarPopup(props) {
    const {isOpen, onClose, onUpdateAvatar, isLoadingAvatar} = props
    const avatar = useRef(null);

    const handleSubmit = () => { 
      onUpdateAvatar({
        avatar: avatar.current.value,
      });

    }
    return (
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isOpen}
          onClose={onClose}
          buttonText={isLoadingAvatar ? 'Сохранение...' :'Сохранить'}
          onSubmit={handleSubmit}
        >
            <input 
              id="avatar-link" 
              data-input="avatar-link" 
              type="url"
              className="form__input"
              placeholder="Ссылка на картинку" 
              name="link" 
              required
              ref={avatar}
            />

            <span id="avatar-link-error" className="form__input-error"></span>
        </PopupWithForm>
  );
  }
  
  export default AvatarPopup;