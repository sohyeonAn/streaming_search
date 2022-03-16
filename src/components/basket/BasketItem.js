import React from "react";
import { IMAGE_PATH, WORDS_MAPPING } from "../../constants";
import styled from "styled-components";

const BasketItemBlock = styled.li`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 0.3fr, 2fr, 2fr;
  gap: 1rem;
  row-gap: 0.3rem;
  cursor: pointer;
  position: relative;
  width: 100%;

  .title {
    grid-column: 1 / 3;
    grid-row: 0;
    font-weight: 700;
  }

  .imgContainer {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
    width: 100%;
    position: relative;
    padding-top: 135%;
    overflow: hidden;

    img {
      position: absolute;
      border-radius: 5%;
      width: 100%;
      height: 100%;
      object-fit: fill;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  .overview {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .provideContainer {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;

function BasketItem({ item }) {
  return (
    <BasketItemBlock>
      <span className="title">
        {item.media_type === "tv" ? item.name : item.title}
      </span>
      <div className="imgContainer">
        <img src={`${IMAGE_PATH}/${item.poster_path}`} alt="" />
      </div>
      <p className="overview">{item.overview}</p>
      <div className="provideContainer">
        {["구매", "렌트", "스트리밍"].map((provideType) => {
          return (
            <div key={provideType}>
              <p>{provideType}</p>
              <div>
                {item[WORDS_MAPPING[provideType]] &&
                  item[WORDS_MAPPING[provideType]].map((provider) => {
                    return (
                      <img
                        key={`${WORDS_MAPPING[provideType]}-${provider.provider_id}`}
                        src={`${IMAGE_PATH}/${provider.logo_path}`}
                        alt={provider.provider_name}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </BasketItemBlock>
  );
}

export default React.memo(BasketItem);
