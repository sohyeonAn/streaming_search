import styled from "styled-components";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import React, { useState } from "react";

const SelectBlock = styled.div`
  position: relative;
  width: 20%;
  min-width: 100px;

  .label {
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
  .input {
    button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border: 1px solid black;
      border-radius: 10px;
      margin-top: 0.3rem;

      span {
        font-size: 1rem;
        vertical-align: bottom;
      }
    }
  }

  .list {
    position: absolute;
    top: 4.5rem;
    left: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    background-color: white;
    z-index: 50;
    li {
      margin: 0.3rem 0.5rem;

      &:hover {
        background-color: aliceblue;
      }
    }
  }
`;

function Filter({ selectTitle, selectList, selectedItem, dispatch }) {
  const [showList, setShowList] = useState(false);
  const itemClickHandler = (e) => {
    dispatch({ name: selectTitle, value: e.target.textContent });
    setShowList(false);
  };
  return (
    <SelectBlock>
      <span className="label">{selectTitle}</span>
      <div className="input" onClick={() => setShowList(!showList)}>
        <button type="button">
          <span>{selectedItem}</span>
          {showList ? <BiUpArrow /> : <BiDownArrow />}
        </button>
      </div>
      {showList && (
        <ul className="list">
          <li onClick={itemClickHandler}>전체</li>
          {selectList.map((item) => (
            <li key={`select-${item}`} onClick={itemClickHandler}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </SelectBlock>
  );
}

export default React.memo(Filter);
