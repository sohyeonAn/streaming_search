import { Link } from "react-router-dom";
import styled from "styled-components";
import Responsive from "./Responsive";
import { IoBasket } from "react-icons/io5";

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
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    .userInfo {
      font-weight: 700;
    }

    .basket {
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
    }
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

function Header({ user, onLogout }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <h1>이거 어디서 봐?</h1>
          {user ? (
            <div className="right">
              <span className="userInfo">{user.email}</span>
              <Link className="basket" to="/basket">
                <IoBasket />
              </Link>
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
