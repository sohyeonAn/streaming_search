import { createContext } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const auth_reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD": {
      const { form, key, value } = action;
      const preLoginState = state.login;
      const preRegisterState = state.register;
      let newState;
      if (form === "login") {
        newState = {
          ...state,
          login: { ...preLoginState, [key]: value },
          register: { ...preRegisterState },
        };
      } else if (form === "register") {
        newState = {
          ...state,
          login: { ...preLoginState },
          register: { ...preRegisterState, [key]: value },
        };
      }
      return newState;
    }
    case "RESET": {
      const { form } = action;
      return { ...state, [form]: initialState[form], authError: null };
    }
    case "LOGIN": {
      const { email, password } = action;
      //로그인 요청 api

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          return { ...state, authError: null, auth: user };
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
          return { ...state, authError: error.massage, auth: null };
        });

      return state;
    }
    case "REGISTER": {
      const { email, password, passwordConfirm } = action;
      if (password !== passwordConfirm) {
        return {
          ...state,
          authError: "비밀번호 확인을 다시 입력해주세요.",
          auth: null,
        };
      }
      let newState;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          newState = { ...state, authError: null, auth: user };
        })
        .catch((error) => {
          console.log(error.code);
          newState = { ...state, authError: error, auth: null };
        });
      return newState;
    }
    default:
      return state;
  }
};

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

export const AuthContext = createContext(initialState);

// const LoginProvider = ({ children }) => {
//   const [login, setLogin] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const onChange = (key, value) => {
//     setLogin({ ...login, [key]: value });
//   };

//   const reset = () => {
//     setLogin({ email: "", password: "" });
//   };

//   const login = {
//     state: { email, password },
//     actions: { setEmail, setPassword },
//   };

//   return (
//     <LoginContext.Provider login={login}>{children}</LoginContext.Provider>
//   );
// };

// // const {Consumner: LoginConsumer} = LoginContext;
// const LoginConsumer = LoginContext.Consumer;

// export { LoginConsumer, LoginProvider, LoginContext };
