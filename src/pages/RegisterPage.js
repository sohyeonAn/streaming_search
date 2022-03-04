import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterForm from "../containers/auth/RegisterForm";

function RegisterPage() {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
}

export default RegisterPage;
