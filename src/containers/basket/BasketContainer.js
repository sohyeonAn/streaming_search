import { useState } from "react";
import { useReducer } from "react";
import styled from "styled-components";
import Filter from "../../components/common/Filter";
import Responsive from "../../components/common/Responsive";
import {
  MEDIA_TYPE,
  PROVIDER,
  PROVIDE_TYPE,
  WORDS_MAPPING,
} from "../../constants/index";
import { useStateValue } from "../../contexts/StateProvider";

const BasketBlock = styled.div`
  .title {
    padding: 1rem;
    text-align: center;
  }
`;

const FilterBlock = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  .searchButton {
    align-self: flex-end;
    height: min-content;
    min-width: 50px;
    padding: 0.6rem;
    border: 1px solid black;
    border-radius: 10px;

    &:hover {
      background-color: aliceblue;
    }
  }
`;

function filterReducer(state, action) {
  return {
    ...state,
    [WORDS_MAPPING[action.name]]: action.value,
  };
}

function BasketContainer() {
  const [{ basket }, _] = useStateValue();
  const [state, dispatch] = useReducer(filterReducer, {
    mediaType: "전체",
    provider: "전체",
    provideType: "전체",
  });
  const [basketList, setBasketList] = useState(basket);

  const onClick = () => {
    const result = basket.filter((item) => {
      let okCount = 0;
      // 미디어타입 일치
      if (state.mediaType === "전체" || item.media_type === state.mediaType)
        okCount += 1;

      // 제공형태 일치
      if (state.provideType === "전체") {
        okCount += 1;
      } else if (
        item.hasOwnProperty(WORDS_MAPPING[state.provideType]) &&
        item[WORDS_MAPPING[state.provideType]].length > 0
      ) {
        okCount += 1;
      }

      // 제공사 일치
      if (state.provider === "전체") {
        okCount += 1;
      } else {
        const flatrate = item.flatrate || [];
        const rent = item.rent || [];
        const buy = item.buy || [];
        const providers = [].concat(flatrate, rent, buy);
        providers.find(
          (provider) =>
            provider["provider_name"] === WORDS_MAPPING[state.provider]
        ) && okCount++;
      }
      if (okCount === 3) return item;
      return null;
    });

    setBasketList(result);
  };
  return (
    <Responsive>
      <BasketBlock>
        <h2 className="title">✨ 나의 찜 리스트 ✨</h2>
        <FilterBlock>
          <Filter
            selectTitle="미디어타입"
            selectList={MEDIA_TYPE}
            selectedItem={state.mediaType}
            dispatch={dispatch}
          />
          <Filter
            selectTitle="제공사"
            selectList={PROVIDER}
            selectedItem={state.provider}
            dispatch={dispatch}
          />
          <Filter
            selectTitle="제공형태"
            selectList={PROVIDE_TYPE}
            selectedItem={state.provideType}
            dispatch={dispatch}
          />
          <button type="button" className="searchButton" onClick={onClick}>
            검색
          </button>
        </FilterBlock>
      </BasketBlock>
      <div>
        {basketList.length > 0
          ? basketList.map((item) => {
              return (
                <p key={`basket-${item.id}`}>
                  {item.id}-{item.title}
                </p>
              );
            })
          : "검색 결과에 해당하는 항목이 없습니다. 😥"}
      </div>
    </Responsive>
  );
}

export default BasketContainer;
