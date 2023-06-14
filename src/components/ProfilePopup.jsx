import PopupWithForm from './PopupWithForm.jsx'
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
// import FormInput from './FormInput.jsx'
const FormInput = React.lazy(() => import('./FormInput.jsx'))

function ProfilePopup(props) {
  const {isOpen, onClose, isLoadingUserData, onUpdateUser} = props
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({
    name: '',
    about: ''
  })

  const errors = {
    name: 'Заполните это поле. Длина строки должна быть от 2 до 40 символов',
    about: 'Заполните это поле. Длина строки должна быть от 2 до 200 символов'
  }

  
  React.useEffect(() => setValues({name: currentUser.name, about: currentUser.about}), [currentUser])

  const handleSubmit = () => onUpdateUser(values)

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleClose = async e => {
    onClose()
    await new Promise(r => setTimeout(r, 100))
    setValues({name: currentUser.name, about: currentUser.about})
  }



  return (
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={handleClose}
        buttonText={isLoadingUserData ? 'Сохранение...' : 'Сохранить'}
        onSubmit={handleSubmit}
      >
        <FormInput 
          id="name" 
          data-input="profile-name" 
          type="text"
          className="form__input"
          placeholder="Ваше имя" 
          name="name" 
          required 
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ''}
          errorMsg={errors.name}
        />
        <FormInput 
          id="about" 
          data-input="profile-about" 
          type="text"
          className="form__input"
          placeholder="О себе" 
          name="about" 
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values.about || ''}
          errorMsg={errors.about}
        />
    </PopupWithForm>
  );
  }
  
  export default ProfilePopup;