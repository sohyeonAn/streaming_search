import styled from "styled-components";
import Responsive from "./Responsive";

const HeaderBlock = styled.div`
  padding: 0;
  position: fixed;
  width: 100%;
  background-color: peachpuff;
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
`;

// 헤더가 fixed로 되어 있어 콘텐츠를 header아래에 나타내도록 해주기 위해 사용.
const Spacer = styled.div`
  height: 15rem;
`;

function Header() {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <h1>뭐로 볼 수 있어?</h1>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
