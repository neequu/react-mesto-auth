import PopupWithForm from './PopupWithForm.js'
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProfilePopup(props) {
  const {isOpen, onClose, isLoadingUserData} = props
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState()
  const [bio, setBio] = React.useState()
  
  React.useEffect(() => {
    setName(currentUser.name);
    setBio(currentUser.about);
  }, [currentUser])

  const handleSubmit = () => {     
    props.onUpdateUser({
      name: name,
      about: bio,
    });
  }
  return (
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        buttonText={isLoadingUserData ? 'Сохранение...' : 'Сохранить'}
        onSubmit={handleSubmit}
      >
        <input 
          id="name" 
          data-input="profile-name" 
          type="text"
          className="form__input"
          placeholder="Ваше имя" 
          name="name" 
          required 
          minLength="2"
          maxLength="40"
          onChange={e => setName(e.target.value)}
          value={name || ''}
        />
        <span id="name-error" className="form__input-error">
          заполните поле
        </span>
        <input 
          id="about" 
          data-input="profile-about" 
          type="text"
          className="form__input"
          placeholder="О себе" 
          name="about" 
          required
          minLength="2"
          maxLength="200"
          onChange={e => setBio(e.target.value)}
          value={bio || ''}
        />
        <span id="about-error" className="form__input-error"></span>
    </PopupWithForm>
  );
  }
  
  export default ProfilePopup;