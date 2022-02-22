import { useCallback, useState } from "react";
import Header from "./common/Header";
import ItemList from "./ItemList";
import SearchInsert from "./SearchInsert";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const onInsert = useCallback((input) => {
    setSearchInput(input);
  }, []);

  return (
    <>
      <Header />
      <SearchInsert onInsert={onInsert} />
      {searchInput && <ItemList searchInput={searchInput} />}
    </>
  );
}

export default Home;
