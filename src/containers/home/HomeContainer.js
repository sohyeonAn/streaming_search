import Home from "../../components/home/Home";
import { useCallback, useState, useEffect } from "react";

function HomeContainer() {
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
    <Home
      showButton={showButton}
      searchInput={searchInput}
      onInsert={onInsert}
      scrollToTop={scrollToTop}
    />
  );
}

export default HomeContainer;
