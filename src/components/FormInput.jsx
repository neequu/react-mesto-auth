import {React, useEffect, useState} from 'react'
function FormInput(props) {

  const { onChange, errorMsg, value,...inputProps } = props;
  const [valid, setValid] = useState(null)
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState('')

  const [show, setShow] = useState(false)

  const getErr = () => valid ? setError('') : setError(errorMsg)

  const handleChange = e => {
    onChange(e)
    setValid(e.target.validity.valid)
  }
  const handleFocus = () => setFocused(true)

  useEffect(() => {
    if (valid === false && focused) {
      console.log(valid);
      setShow(true)
      getErr()
    } else {
      setShow(false)
    }

  }, [valid, focused, error])


 

  return (
    <>
      <input 
        {...inputProps}
        onChange={handleChange}
        onBlur={handleFocus}
        value={value}
      />
      <p 
        className={`form__input-error ${show ? 'form__input-error_active' : ''}`} 
      >{error}</p>
  </>
  );
}

export default FormInput;