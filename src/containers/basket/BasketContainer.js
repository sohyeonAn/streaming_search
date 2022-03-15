import React from "react";
import styled from "styled-components";
import Filter from "../../components/common/Filter";
import Responsive from "../../components/common/Responsive";
import { MEDIA_TYPE, PROVIDER, PROVIDE_TYPE } from "../../constants/index";
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

function BasketContainer() {
  return (
    <Responsive>
      <BasketBlock>
        <h2 className="title">✨ 나의 찜 리스트 ✨</h2>
        <FilterBlock>
          <Filter selectTitle="미디어타입" selectList={MEDIA_TYPE} />
          <Filter selectTitle="제공사" selectList={PROVIDER} />
          <Filter selectTitle="제공형태" selectList={PROVIDE_TYPE} />
        </FilterBlock>
      </BasketBlock>
    </Responsive>
  );
}

export default BasketContainer;
