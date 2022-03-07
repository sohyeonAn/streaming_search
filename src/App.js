import React, { useReducer } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import { auth_reducer, initialState } from "./contexts/auth";

export const AuthContext = React.createContext();

function App() {
  const [auth, dispatch] = useReducer(auth_reducer, initialState);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState: auth, authDispatch: dispatch }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
