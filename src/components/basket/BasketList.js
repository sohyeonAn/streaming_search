import React from "react";
import styled from "styled-components";
import BasketItem from "./BasketItem";

const BasketListBlock = styled.ul`
  padding: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

function BasketList({ items }) {
  return (
    <BasketListBlock>
      {items.length > 0
        ? items.map((item) => {
            return <BasketItem key={`basket-${item.id}`} item={item} />;
          })
        : "검색 결과에 해당하는 항목이 없습니다. 😥"}
    </BasketListBlock>
  );
}

export default React.memo(BasketList);
