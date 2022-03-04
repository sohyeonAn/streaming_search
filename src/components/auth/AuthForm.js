import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthFormBlock = styled.div`
  padding: 1rem;

  h3 {
    text-align: center;
    margin: 0;
    padding-bottom: 0.5rem;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: aliceblue;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid black;

  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    text-decoration: underline;

    &:hover {
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: left;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onChange={onChange}
          value={form.email}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledButton>{text}</StyledButton>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
