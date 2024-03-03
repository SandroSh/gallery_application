import styled from "styled-components";

export const ImagesDiv = styled.div`
  max-width: 1800px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    align-items: center;
  }
`;
export const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  margin: 12px;
  img {
    width: 100%;
    margin: 12px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;
