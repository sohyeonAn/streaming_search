import React from "react";
import styled from "styled-components";
import Filter from "../../components/common/Filter";
import Responsive from "../../components/common/Responsive";

const BasketBlock = styled.div`
  .title {
    padding: 1rem;
    text-align: center;
  }
`;

const FilterBlock = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
const mediaType = ["movie", "tv"];
const provider = ["넷플릭스", "왓챠", "네이버스토어", "웨이브"];
const provideType = ["구매", "렌트", "스트리밍"];

function BasketContainer() {
  return (
    <Responsive>
      <BasketBlock>
        <h2 className="title">✨ 나의 찜 리스트 ✨</h2>
        <FilterBlock>
          <Filter selectTitle="미디어타입" selectList={mediaType} />
          <Filter selectTitle="제공사" selectList={provider} />
          <Filter selectTitle="제공형태" selectList={provideType} />
        </FilterBlock>
      </BasketBlock>
    </Responsive>
  );
}

export default BasketContainer;
