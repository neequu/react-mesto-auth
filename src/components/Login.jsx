import AuthForm from "./AuthForm";

function Login(props) {

  const handleSubmit = (email, password) => {
    props.onLogin(email, password)
  }
  return (
    <>
      <AuthForm title="Вход" buttonText="Войти" onSubmit={handleSubmit}/>
    </>
  );
}

export default Login;