import usePromise from "../lib/usePromise";
import styled from "styled-components";
import Responsive from "./common/Responsive";
import axios from "axios";
import Item from "./Item";

const ItemListBlock = styled(Responsive)`
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 20%));
  gap: 1rem;
  row-gap: 2rem;
`;
function ItemList({ searchInput }) {
  const params = {
    api_key: "d277d1f5bbb9f2ba2a5bd7ca9ba09c4d",
    query: searchInput,
    language: "ko",
  };

  const [movieLoading, movieResponse, movieError] = usePromise(() => {
    return axios.get("https://api.themoviedb.org/3/search/movie?", {
      params,
    });
  }, [searchInput]);
  const [tvLoading, tvResponse, tvError] = usePromise(() => {
    return axios.get("https://api.themoviedb.org/3/search/tv?", { params });
  }, [searchInput]);

  if (tvLoading || movieLoading) {
    return <ItemListBlock>불러오는 중...</ItemListBlock>;
  }

  if (!tvResponse && !movieResponse) {
    return null;
  }

  if (tvError || movieError) {
    return <ItemListBlock>에러 발생!</ItemListBlock>;
  }

  return (
    <>
      <ItemListBlock>
        {tvResponse &&
          tvResponse.data.results.map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                isMovie={false}
                title={item.name}
                thumbnail={item.poster_path}
              />
            );
          })}
        {movieResponse &&
          movieResponse.data.results.map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                isMovie={true}
                title={item.title}
                thumbnail={item.poster_path}
              />
            );
          })}
      </ItemListBlock>
    </>
  );
}

export default ItemList;
