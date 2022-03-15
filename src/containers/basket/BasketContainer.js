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

  .searchButton {
    align-self: flex-end;
    height: min-content;
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
  const [state, dispatch] = useReducer(filterReducer, {
    mediaType: "전체",
    provider: "전체",
    provideType: "전체",
  });

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
          <button type="button" className="searchButton">
            검색
          </button>
        </FilterBlock>
      </BasketBlock>
    </Responsive>
  );
}

export default BasketContainer;
