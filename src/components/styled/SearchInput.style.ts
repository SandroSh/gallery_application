import styled from "styled-components";
import {lightPurple} from "./Colors.style";

export const MainContainer = styled.div`
    margin-top:120px;
    display:flex;
    justify-content:center;
    align-items:center
`;
export const Input = styled.input`

  background-color: white;
  max-width: 250px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    color: ${lightPurple};
    outline-color: ${lightPurple};
    box-shadow: -3px -3px 15px ${lightPurple};
    transition: 0.1s;
    transition-property: box-shadow;
  }
`;
