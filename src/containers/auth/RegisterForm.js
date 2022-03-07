import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../App";
import AuthForm from "../../components/auth/AuthForm";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function RegisterForm() {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { value, name } = e.target;
    authContext.authDispatch({
      type: "CHANGE_FIELD",
      form: "register",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = authContext.authState.register;
    if (password !== passwordConfirm) {
      setError("비밀번호 확인을 다시 입력해주세요.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authContext.authDispatch({
          type: "SET_USER",
          user,
        });
      })
      .catch((error) => {
        authContext.authDispatch({
          type: "SET_ERROR",
          authError: error.message,
        });
      });
  };

  useEffect(() => {
    authContext.authDispatch({
      type: "RESET",
      form: "register",
    });
  }, []);

  useEffect(() => {
    console.log("갱신");
    console.log(authContext.authState.authError);
    if (authContext.authState.authError) {
      setError(authContext.authState.authError);
      // authContext.authDispatch({
      //   type: "RESET",
      //   form: "register",
      // });
      return;
    }

    if (authContext.authState.auth) {
      console.log("회원가입 성공");
      authContext.authDispatch({
        type: "CHECK",
      });
    }
  }, [authContext]);
  return (
    <AuthForm
      type="register"
      form={authContext.authState.register}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default RegisterForm;
