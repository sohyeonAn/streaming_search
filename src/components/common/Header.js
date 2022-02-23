import styled from "styled-components";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  padding: 0;
  position: fixed;
  width: 100%;
  background-color: #2471a3;
  z-index: 50;
`;

const Wrapper = styled(Responsive)`
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 3.5rem;
    color: white;
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

function Header() {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <h1>이거 어디서 봐?</h1>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
