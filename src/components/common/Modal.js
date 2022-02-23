import styled from "styled-components";
import { IMAGE_PATH } from "../../constants/API";
import { VscChromeClose } from "react-icons/vsc";
import ImageContainer from "./ImageContainer";

const Fullscreen = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBlock = styled.div`
  width: 40rem;
  position: relative;
  color: #fff;
  background: #34495e;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  gap: 3rem;

  button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 2rem;
    color: white;
    position: absolute;
    top: -2.5rem;
    right: 0.5rem;
    cursor: pointer;

    &:hover {
      color: gray;
    }
  }
  .info {
    flex: 1;
    padding: 1rem 0 0;
    min-width: 10rem;
    h2 {
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .network_name + .network_name::before {
      content: "\\00B7";
      padding: 0 0.3rem;
    }
  }

  @media screen and (max-width: 430px) {
    padding: 1rem;
    width: 15rem;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    .info {
      width: 100%;

      h2 {
        font-size: 1rem;
      }

      .network_name {
        font-size: 0.8rem;
      }
    }
  }
`;
const ImageContainerBlock = styled(ImageContainer)`
  width: 18rem;
  height: 27rem;
  padding-top: 27rem;
  img {
    border-radius: 10px;
  }

  @media screen and (max-width: 430px) {
    width: 9rem;
    height: 12rem;
    padding-top: 12rem;
  }
`;

const ProviderListBlock = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  .providerContainer {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .method {
    display: block;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid gainsboro;
  }

  @media screen and (max-width: 430px) {
    .method {
      font-size: 0.8rem;
    }
  }
`;

const ProviderItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 10px;
    width: 3rem;
    height: 3rem;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
  }

  @media screen and (max-width: 430px) {
    img {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const Modal = ({
  visible,
  title,
  buy,
  rent,
  flatrate,
  networks,
  onCancel,
  thumbnail,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen onClick={onCancel}>
      <ModalBlock>
        {thumbnail && (
          <ImageContainerBlock>
            <img src={`${IMAGE_PATH}/${thumbnail}`} alt={title} />
          </ImageContainerBlock>
        )}
        <section className="info">
          <h2>{title}</h2>
          {networks &&
            networks.map((network) => {
              return (
                <span className="network_name" key={`network-${network.id}`}>
                  {network.name}
                </span>
              );
            })}
          {[buy, rent, flatrate].map((providers, idx) => {
            return (
              <ProviderListBlock key={`providers-${idx}`}>
                <span className="method">
                  {idx === 0 ? "구매" : idx === 1 ? "렌트" : "스트리밍"}
                </span>
                <div className="providerContainer">
                  {providers &&
                    providers.map((provider) => {
                      return (
                        <ProviderItemBlock
                          key={`provider-${provider.provider_id}`}
                        >
                          <img
                            src={`${IMAGE_PATH}/${provider.logo_path}`}
                            alt={provider.provider_name}
                          />
                          <span>{provider.provider_name}</span>
                        </ProviderItemBlock>
                      );
                    })}
                </div>
              </ProviderListBlock>
            );
          })}
        </section>
        <button type="button" onClick={onCancel}>
          <VscChromeClose />
        </button>
      </ModalBlock>
    </Fullscreen>
  );
};

export default Modal;
