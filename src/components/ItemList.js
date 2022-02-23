import usePromise from "../lib/usePromise";
import styled from "styled-components";
import Responsive from "./common/Responsive";
import axios from "axios";
import Item from "./Item";

const ItemListBlock = styled(Responsive)`
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  row-gap: 2rem;
`;
function ItemList({ searchInput }) {
  const params = {
    api_key: "d277d1f5bbb9f2ba2a5bd7ca9ba09c4d",
    query: searchInput,
    language: "ko",
  };

  const [loading, response, error] = usePromise(() => {
    return axios.get("https://api.themoviedb.org/3/search/multi?", {
      params,
    });
  }, [searchInput]);

  if (loading) {
    return <ItemListBlock>불러오는 중...</ItemListBlock>;
  }

  if (!response) {
    return null;
  }

  if (error) {
    return <ItemListBlock>에러 발생!</ItemListBlock>;
  }

  const { results } = response.data;
  return (
    <>
      <ItemListBlock>
        {results &&
          results.map((item) => {
            if (item.media_type === "person") {
              return null;
            } else {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.media_type === "tv" ? item.name : item.title}
                  thumbnail={item.poster_path}
                  media_type
                />
              );
            }
          })}
      </ItemListBlock>
    </>
  );
}

export default ItemList;
