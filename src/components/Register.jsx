import { Link } from 'react-router-dom';
import AuthForm from "./AuthForm";

function Register(props) {

  const handleSubmit = (email, password) => {
  
    props.onRegister(email, password)
  }

  return (
    <>
      <AuthForm title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <p>Уже зарегистрированы? <Link className="form__link" to='/sign-in'>Войти</Link></p>
      </AuthForm>
  </>
  );
}

export default Register;