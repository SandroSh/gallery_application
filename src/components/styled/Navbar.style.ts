import styled from "styled-components";
import { lightPurple } from "./Colors.style";
import {rotate} from './Animations.style'

export const MainDiv = styled.header<{ $myBackground?: string }>`
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:85px;
  padding:10px;
  background-color: ${(props) => props.$myBackground};
  z-index:1;
  
`;
export const InnerDiv = styled.div`position: relative;
  max-width:1600px;
  margin:0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
 img {
    animation: ${rotate} 4s linear infinite;
    margin-left:20px;
  }
  h1 {
    color: ${lightPurple};
    margin-right:20px;
    
  }
`;