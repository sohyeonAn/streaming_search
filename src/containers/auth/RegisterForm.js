import { useEffect } from "react";
import { useReducer, useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { auth_reducer, AuthContext } from "../../contexts/auth";

const initialState = {
  register: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  auth: null,
  authError: null,
};
function RegisterForm() {
  const [state, dispatch] = useReducer(auth_reducer, initialState);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: "CHANGE_FIELD",
      form: "register",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = state.register;
    dispatch({
      type: "REGISTER",
      email,
      password,
      passwordConfirm,
    });
  };

  useEffect(() => {
    dispatch({
      type: "RESET",
      form: "register",
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(state.authError);
    if (state.authError) {
      setError(state.authError);
      dispatch({
        type: "RESET",
        form: "register",
      });
      return;
    }

    if (state.auth) {
      console.log("회원가입 성공");
      dispatch({
        type: "CHECK",
      });
    }
  }, [state.auth, state.authError, dispatch]);
  return (
    <AuthContext.Provider value={dispatch}>
      <AuthForm
        type="register"
        form={state.register}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </AuthContext.Provider>
  );
}

export default RegisterForm;
