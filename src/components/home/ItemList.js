import styled from "styled-components";
import Responsive from "../common/Responsive";
import { API_PARAMS } from "../../constants";
import axios from "axios";
import Item from "./Item";
import React, { useState, useEffect, useRef } from "react";

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
  const currPage = useRef(1);
  const scrollRemember = useRef(0);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const scrollBottomHandler = () => {
    if (error || isLoading || !hasMore) return;
    const { innerHeight, scrollY } = window;
    const { scrollHeight } = document.body;

    if (scrollY >= scrollHeight - innerHeight) {
      scrollRemember.current = scrollY;
      setTimeout(loadData, 300);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollBottomHandler);
    window.scrollTo({
      top: scrollRemember.current,
    });
    return () => window.removeEventListener("scroll", scrollBottomHandler);
  });

  useEffect(() => {
    setResult([]);
    currPage.current = 1;
    scrollRemember.current = 0;

    loadData();
  }, [searchInput]);

  const loadData = async () => {
    console.log("loadData() called");

    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/multi?",
        { params: { ...params, page: currPage.current } }
      );
      if (!response) {
        return;
      }
      if (currPage.current < response.data.total_pages) {
        setHasMore(true);
        currPage.current += 1;
      } else if (currPage.current === response.data.total_pages) {
        setHasMore(false);
        window.removeEventListener("scroll", scrollBottomHandler);
      }
      setIsLoading(false);

      const { results } = response.data;
      setResult((prevResult) => [...prevResult, ...results]);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  if (error) {
    return <div>에러 발생! {error.message}</div>;
  }
  if (isLoading) {
    return <div>불러 오는 중...</div>;
  }

  return (
    <>
      <ItemListBlock>
        {result.map((item) => {
          if (item.media_type === "person") {
            return null;
          }
          return (
            <Item
              key={`${item.media_type}-${item.id}`}
              id={item.id}
              title={item.media_type === "tv" ? item.name : item.title}
              thumbnail={item.poster_path}
              media_type={item.media_type}
            />
          );
        })}
      </ItemListBlock>
      {!hasMore && <div>모든 정보를 읽어왔습니다.</div>}
    </>
  );
}

export default React.memo(ItemList);
