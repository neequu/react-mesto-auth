import {React, useState} from 'react'
import FormInput from './FormInput'

function AuthForm(props) {

  const {onSubmit} = props

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit(values)

    // setValues({
    //   email: '',
    //   password: ''
    // })
    // e.target.reset()
  }

  const handleInput = e => {
    const value = e.target.value
    const inputType = e.target.name

    setValues({...values, [inputType]: value})
  }

  return (
    <>
    <form
      className="form form_auth"
      onSubmit={handleSubmit}
      >
      <fieldset className="form__set">
      <h2 className="form__title">{props.title}</h2>

      <FormInput 
        id="auth-email"
        name="email" 
        type="email" 
        placeholder="Email"
        className="form__input form__input_dark"
        required
        onChange={handleInput}
        errorMsg="Введите корректный email"
        // pattern="[a-z0-9A-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}"
        // autocomplete="username"
      />

      <FormInput 
        id="auth-password"
        type="password" 
        placeholder="Пароль"
        className="form__input form__input_dark"
        name="password" 
        required
        minLength="5"
        maxLength="15"
        onChange={handleInput}
        errorMsg="Напишите пароль, состоящий из 5-15 символов. Также в пароле не должно быть пробелов"
        pattern="^\S*$"
        autoComplete="current-password"
      />


      </fieldset>
      <button type="submit" className="form__submit-button form__submit-button_dark" >{props.buttonText}</button>
      {props.children}
    </form>
  </>
  );
}

export default AuthForm;