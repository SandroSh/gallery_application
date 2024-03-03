import styled from "styled-components";
import { lightPurple, lightGreen } from "./Colors.style";
import { lineAnimation } from "./Animations.style";

export const MainDiv = styled.div`
  max-width: 2000px;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.2% 0;
  cursor: pointer;
  &:hover {
    transition:2s;
    transform:scale(0.97);
    img {
      animation: ${lineAnimation} 1s linear infinite;
    }
  }
  @media (max-width: 768px) {
    width:80vw;
    
  }
`;

export const LeftContainer = styled.div`
  width: 49.7%;
  background-color: ${lightPurple};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items:center;
  padding: 10px;
  height: 70px;

  h1 {
    color: white;
    span {
      color: ${lightGreen};
    }
  }
  @media (max-width: 768px) {
    width:150px;
    h1{
      font-size:15px;
    }
    
  }
`;

export const RightContainer = styled.div`
  width: 49.7%;
  height: 70px;
  background-color: ${lightPurple};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items:center;
  h4 {
    color: white;
    display: flex;
    align-items: center;
    margin-right: 15px;
    span {
      margin-left: 10px;
      color: ${lightGreen};
      font-size: 34px;
    }
  }
  @media (max-width: 768px) {
    width:150px;
    h4{
      span{
      font-size:10px;
    }
    }
    
    
  }
`;
export const ConnectorLineImg = styled.img`
  position: absolute;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 600px) {
    display:none !important;
    
  }
`;
