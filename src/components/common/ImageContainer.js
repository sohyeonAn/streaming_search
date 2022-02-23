import styled from "styled-components";

const ImageContainerBlock = styled.div`
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: fill;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const ImageContainer = ({ children, ...rest }) => {
  return <ImageContainerBlock {...rest}>{children}</ImageContainerBlock>;
};

export default ImageContainer;
