import styled from "styled-components";

export const ModalDiv = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.84);
`;
export const ImgDiv = styled.div`
   
`;
export const ContentDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-evenly;
    align-items:center;
    
`;
export const Close = styled.img`
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
`;
export const ModalContent = styled.img`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
`;

export const ImageCircle = styled.div`
  width: 60px;
  height: 60px;

  img {
    border-radius: 30px;
    width: 100%;
    height: 100%;
  }
`;

export const InfoDiv = styled.div`
  width: 35vw;
  background-color: #131212;
  border-radius: 10px;
  padding:20px;
`;
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  h3 {
    color: white;
    margin-top:10px;
    letter-spacing:2px;
  }
`;
export const StatsDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-around;
    align-items:center;
    margin-top:30px;
    min-height:200px;
`;
export const IconsDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:10px;
    h3{
        color:white;
        margin-left:20px;
    }
`;
export const DownloadButton = styled.a`
  position: absolute;
  bottom: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
`;
