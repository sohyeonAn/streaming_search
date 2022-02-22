import styled from "styled-components";
import axios from "axios";

const ItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;

  &:hover > .imgContainer::after {
    content: "";
    display: block;
    border-radius: 5%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .imgContainer {
    position: relative;
    img {
      position: relative;
      border-radius: 5%;
      width: 100%;
      object-fit: contain;
    }
  }

  span {
    font-size: 1.2rem;
  }
`;
function Item({ title, thumbnail, id, isMovie }) {
  const params = {
    api_key: "d277d1f5bbb9f2ba2a5bd7ca9ba09c4d",
    append_to_response: "watch/providers",
    language: "ko",
  };

  const onClick = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${isMovie ? "movie" : "tv"}/${id}?`,
      {
        params,
      }
    );
    console.log("스트리밍", response.data["watch/providers"]);
    console.log("방송사", response.data.networks);
  };
  return (
    <ItemBlock onClick={onClick}>
      {thumbnail && (
        <div className="imgContainer">
          <img
            src={`https://image.tmdb.org/t/p/original/${thumbnail}`}
            alt="포스터사진"
          />
        </div>
      )}
      <span>{title}</span>
    </ItemBlock>
  );
}

export default Item;
