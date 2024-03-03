import { LogRow } from "./components/logRow";
import { LogsContainer, MainDiv, TextDiv } from "./components/styled/History.style";
import LongLineLightGreen from "./assets/LongLineLightGreen.svg";
import { logs } from "./MainPage";
import { logType } from "./types";

export let historyText:string ="";


export const History = () => {
  const updateText = (text:string) =>{
      historyText = text;
  }
  return (
    <div>
      <MainDiv >
        <TextDiv>
          <img src={LongLineLightGreen} alt="light green line" />
          <h1>Browse History</h1>
          <img src={LongLineLightGreen} alt="light green line" />
        </TextDiv>
        <LogsContainer>
          {logs?.map((item:logType, index) => <div onClick={() => updateText(item.text)} key={index}><LogRow text={item.text} currTime={item.currTime} /></div>)}
        </LogsContainer>
      </MainDiv>
    </div>
  )
}
