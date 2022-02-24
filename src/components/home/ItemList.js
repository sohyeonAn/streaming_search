import usePromise from "../../lib/usePromise";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import { API_PARAMS } from "../../constants/API";
import axios from "axios";
import Item from "./Item";

const ItemListBlock = styled(Responsive)`
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 0.2fr));
  gap: 1rem;
  row-gap: 2rem;
`;
function ItemList({ searchInput }) {
  const params = {
    ...API_PARAMS,
    query: searchInput,
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
                  media_type={item.media_type}
                />
              );
            }
          })}
      </ItemListBlock>
    </>
  );
}

export default ItemList;
