import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { AuthContext } from "../../App";

function LoginForm() {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    authContext.authDispatch({
      type: "CHANGE_FIELD",
      form: "login",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = authContext.authState.login;
    authContext.authDispatch({
      type: "LOGIN",
      email,
      password,
    });
  };

  useEffect(() => {
    authContext.authDispatch({
      type: "RESET",
      form: "login",
    });
  }, []);

  useEffect(() => {
    if (authContext.authState.authError) {
      setError(authContext.authState.authError);
      authContext.authDispatch({
        type: "RESET",
        form: "login",
      });
      return;
    }

    if (authContext.authState.auth) {
      console.log("로그인 성공");
      authContext.authDispatch({
        type: "CHECK",
      });
    }
  }, [
    authContext.authState.authError,
    authContext.authState.auth,
    authContext.authDispatch,
  ]);

  // useEffect(()=>{
  //   if(user){
  //     navigate('/');
  //     try{
  //       localStorage.setItem('user', JSON.stringify(user));
  //     }catch(e){
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [user, navigate])
  return (
    <AuthForm
      type="login"
      form={authContext.authState.login}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default LoginForm;
