import { createContext } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login_reducer = (state, action) => {
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
          register: { ...preRegisterState, key: value },
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
          console.log(error);
          return { ...state, authError: error.massage, auth: null };
        });

      return state;
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

export const LoginContext = createContext(initialState);

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
