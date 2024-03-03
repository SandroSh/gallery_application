import styled from "styled-components";
import { lightPurple } from "./Colors.style";

export const MainDiv = styled.div`
  max-width: 1800px;
  margin: 120px auto 0 auto;
`;
export const LogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  h1 {
    color: ${lightPurple};
  }
  @media (max-width: 768px) {
    img {
      display: none;
    }
  }
`;
