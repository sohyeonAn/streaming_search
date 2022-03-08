import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.key]: action.value };

    case "RESET":
      return { email: "", password: "" };
    default:
      return state;
  }
};

function LoginForm() {
  const [inputs, inputDispatch] = useReducer(reducer, {
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    inputDispatch({ type: "CHANGE_FIELD", key: name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputs;

    if (email === "") {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
      })
      .catch((error) => {
        inputDispatch({ type: "RESET" });
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      });
  };

  useEffect(() => {
    inputDispatch({
      type: "RESET",
    });
  }, []);

  return (
    <AuthForm
      type="login"
      form={inputs}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default LoginForm;
