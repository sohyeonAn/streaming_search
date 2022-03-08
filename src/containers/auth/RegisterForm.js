import { useEffect, useState, useReducer } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.key]: action.value };
    case "RESET":
      return { email: "", password: "", passwordConfirm: "" };
    default:
      return state;
  }
};

function RegisterForm() {
  const [inputs, inputDispatch] = useReducer(reducer, {
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    inputDispatch({ type: "CHANGE_FIELD", key: name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = inputs;
    if (email === "") {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (password === "") {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    if (passwordConfirm === "") {
      setError("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호 확인이 비밀번호와 일치하지 않습니다.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        inputDispatch({ type: "RESET" });
        setError(error.message);
      });
  };

  useEffect(() => {
    inputDispatch({
      type: "RESET",
    });
  }, []);

  return (
    <AuthForm
      type="register"
      form={inputs}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default RegisterForm;
