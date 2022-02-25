import styled from "styled-components";
import { useCallback, useState, useEffect } from "react";
import Header from "../common/Header";
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

function Home() {
  const [showButton, setShowButton] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const onInsert = useCallback((input) => {
    setSearchInput(input);
  }, []);

  const scrollToTopHandler = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollToTopHandler);
    return () => window.removeEventListener("scroll", scrollToTopHandler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Header />
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
