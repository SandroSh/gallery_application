import { MainDiv,LeftContainer,RightContainer,ConnectorLineImg } from "./styled/LogRow.style"
import LogLine from '../assets/LogLine.svg'
import { logType } from "../types"

export const LogRow = ({text, currTime}:logType) => {
  return (

    <MainDiv>
      <LeftContainer>
          <h1><span>'</span>{text}<span>'</span></h1>
      </LeftContainer>
        <ConnectorLineImg src={LogLine} alt="Line with rectangle heads" />
      <RightContainer>
        <h4><span>{currTime}</span></h4>
      </RightContainer>
    </MainDiv>
  )
}