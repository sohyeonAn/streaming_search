import styled from "styled-components";
import Responsive from "./common/Responsive";
import { FiSearch } from "react-icons/fi";
import React, { useState, useCallback } from "react";

const SearchInsertBlock = styled(Responsive)`
  padding-top: 2rem;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  input {
    flex: 1;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    border: 2px solid darkgray;
    font-size: 1rem;
    padding: 1rem 2rem;
    outline: none;
    cursor: pointer;

    &:hover {
      border: 2px solid black;
    }

    &::placeholder {
      color: gray;
    }
  }

  button {
    padding: 1rem 1rem;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 4px;
    font-size: 1.3rem;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: peachpuff;
      color: white;
    }
  }
`;

function SearchInsert({ onInsert }) {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <SearchInsertBlock>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="보고 싶은 영화/드라마/예능 을 검색해보세요!"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          <FiSearch />
        </button>
      </form>
    </SearchInsertBlock>
  );
}

export default SearchInsert;
