import { Link } from "react-router-dom";
import styled from "styled-components";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  padding: 0;
  position: fixed;
  width: 100%;
  background-color: #85c1e9;
  z-index: 50;
`;

const Wrapper = styled(Responsive)`
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  h1 {
    font-size: 3.5rem;
    color: white;
  }

  .right {
    padding: 1rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  @media screen and (max-width: 430px) {
    height: 10rem;
    h1 {
      font-size: 2rem;
    }
  }
`;

// 헤더가 fixed로 되어 있어 콘텐츠를 header아래에 나타내도록 해주기 위해 사용.
const Spacer = styled.div`
  height: 15rem;

  @media screen and (max-width: 430px) {
    height: 10rem;
  }
`;

const UserInfo = styled.div`
  font-weight: 700;
  display: inline-block;
  margin-right: 1rem;
`;

function Header({ user, onLogout }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <h1>이거 어디서 봐?</h1>
          {user ? (
            <div className="right">
              <UserInfo>{user.email}</UserInfo>
              <button onClick={onLogout}>로그아웃</button>
            </div>
          ) : (
            <div className="right">
              <Link to="/login">로그인</Link>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
