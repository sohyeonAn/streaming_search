import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Modal from "./common/Modal";
import { API_PARAMS, IMAGE_PATH } from "../constants/API";

const color = {
  tv: "#D5F5E3",
  movie: "#FCF3CF",
};

const ItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  width: 100%;

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

  .info_txt {
    flex: 1;

    .title {
      font-size: 1.2rem;
      display: block;
    }
    .media_type {
      text-align: center;
      min-width: 3rem;
      display: inline-block;
      font-size: 1rem;
      padding: 0.3rem 0.5rem;
      border-radius: 10%;
      background-color: ${(props) => props.color};
    }
  }
`;
function Item(info) {
  const { title, thumbnail, id, media_type } = info;
  const [modal, setModal] = useState(false);
  const [providers, setProviders] = useState({});
  const [networks, setNetworks] = useState([]);

  const params = {
    append_to_response: "watch/providers",
    ...API_PARAMS,
  };

  const onClick = async () => {
    setModal(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?`,
        {
          params,
        }
      );

      if (!response) {
        return;
      }
      const newProviders = response.data["watch/providers"].results["KR"];
      setProviders(newProviders);
      const newNetworks = response.data.networks;
      setNetworks(newNetworks);

      console.log("스트리밍", response.data["watch/providers"].results.KR);
      console.log("방송사", response.data.networks);
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    setModal(false);
  };
  return (
    <>
      <ItemBlock
        onClick={onClick}
        color={media_type === "tv" ? color.tv : color.movie}
      >
        <div className="imgContainer">
          {thumbnail && (
            <img src={`${IMAGE_PATH}/${thumbnail}`} alt="포스터사진" />
          )}
        </div>
        <div className="info_txt">
          <span className="media_type">{media_type}</span>
          <span className="title">{title}</span>
        </div>
      </ItemBlock>
      <Modal
        visible={modal}
        title={title}
        buy={providers?.hasOwnProperty("buy") ? providers.buy : null}
        flatrate={
          providers?.hasOwnProperty("flatrate") ? providers.flatrate : null
        }
        rent={providers?.hasOwnProperty("rent") ? providers.rent : null}
        networks={networks}
        onCancel={onCancel}
        thumbnail={thumbnail}
      />
    </>
  );
}

export default Item;
