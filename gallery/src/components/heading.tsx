import React, { useState, useEffect } from "react";
import theme from "../theme";
import styled from "styled-components";

export interface HeadingProps {
  children: string;
  size?: 1 | 2 | 3 | 4 | 5;
  primary?: boolean;
  secondary?: boolean;
  color?: string;
  className?: string,
  white?: boolean,
  margin?: string
  inverse?: boolean,


}

interface headProps {
  size: string,
  color: string,
}

const Head = styled.h1<headProps>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

const Heading = (props: HeadingProps) => {
    
    var backgroundColorF = () => {
        if(props.white){
          return(theme.white)
        }
        if (props.primary) {
          return theme.primary;
        } else if (props.secondary) {
          return theme.secondary;
        } else if (props.color !== undefined) {
          return props.color;
        } else {
          if (theme.primary !== undefined) {
            return theme.primary;
          } else {
            return "#000";
          }
        }
      };
      var BC = backgroundColorF();


  var fontSize: string;

  switch (props.size) {
    case 2:
      fontSize = "1.7rem";
      break;
    case 3:
      fontSize = "2.3rem";
      break;
    case 4:
      fontSize = "2.8rem";
      break;
    case 5:
      fontSize = "3rem";
      break;
    default:
      fontSize = "1.2rem";

      break;
  }

  return (
  <div style={{padding: props.margin? props.margin :" 0"}}>

  <Head
             className={props.className}
             color={BC}
             size={fontSize}
             >
            {props.children}
            </Head>
            </div>
)};

export default Heading;