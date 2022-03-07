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
    case "SET_USER": {
      const { user, authError } = action;
      return { ...state, auth: null, authError, user };
    }
    case "SET_ERROR": {
      const { authError } = action;
      return { ...state, authError };
    }
    default:
      return state;
  }
};

export const initialState = {
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

const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return {
      authError: null,
      auth: user,
    };
  } catch (error) {
    return {
      authError: error.message,
      auth: null,
    };
  }
};
