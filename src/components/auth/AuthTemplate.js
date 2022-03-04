import styled from "styled-components";
import { Link } from "react-router-dom";

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #85c1e9;
`;

const WhiteBox = styled.div`
  padding: 1rem;
  width: 360px;
  background: #fff;
  border-radius: 10px;

  .logo_area {
    padding: 0.5rem;
    display: block;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    background-color: #8fcae7;
    border-radius: 10px;
  }
`;

function AuthTemplate({ children }) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo_area">
          <Link to="/">어디서 봐?</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthTemplate;
