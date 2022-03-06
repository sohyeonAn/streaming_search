import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { auth_reducer, AuthContext } from "../../contexts/auth";
const initialState = {
  register: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    email: "",
    password: "",
  },
  auth: null,
  authError: null,
};
function LoginForm() {
  const [state, dispatch] = useReducer(auth_reducer, initialState);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: "CHANGE_FIELD",
      form: "login",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state.login;
    dispatch({
      type: "LOGIN",
      email,
      password,
    });
  };

  useEffect(() => {
    dispatch({
      type: "RESET",
      form: "login",
    });
  }, [dispatch]);

  useEffect(() => {
    if (state.authError) {
      setError(state.authError);
      dispatch({
        type: "RESET",
        form: "login",
      });
      return;
    }

    if (state.auth) {
      console.log("로그인 성공");
      dispatch({
        type: "CHECK",
      });
    }
  }, [state.auth, state.authError, dispatch]);

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
    <AuthContext.Provider value={dispatch}>
      <AuthForm
        type="login"
        form={state.login}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </AuthContext.Provider>
  );
}

export default LoginForm;
