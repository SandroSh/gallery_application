import { keyframes } from "styled-components";

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const lineAnimation =  keyframes`
0% {
  transform:translateX(-50%) rotate(0deg) ;
 
}
20% {
  transform: translateX(-50%) rotate(5deg) ;
 
}
40% {
  transform:translateX(-50%) rotate(-3deg) ;
}
60% {
  transform:translateX(-50%) rotate(2deg) ;
}
80% {
  transform:translateX(-50%) rotate(-1deg) ;
}
100% {
  transform:translateX(-50%) rotate(0deg) ;
}
`;