import styled from "styled-components";
import ItemList from "./ItemList";
import SearchInsert from "./SearchInsert";
import { IoIosArrowUp } from "react-icons/io";

const StyledButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  border-radius: 50%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    color: #fff;
    background-color: #316588;
  }
`;

function Home({ showButton, searchInput, onInsert, scrollToTop }) {
  return (
    <>
      <SearchInsert onInsert={onInsert} />
      {searchInput && <ItemList searchInput={searchInput} />}
      {showButton && (
        <StyledButton type="button" onClick={scrollToTop}>
          <IoIosArrowUp />
        </StyledButton>
      )}
    </>
  );
}

export default Home;
