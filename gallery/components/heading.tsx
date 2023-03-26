import React, { useState, useEffect, useContext } from "react";
import theme from "../../theme";
import styled from "styled-components";
import { ThemeContext } from "../../App";

export interface HeadingProps {
  children: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  primary?: boolean;
  secondary?: boolean;
  color?: string;
  className?: string;
  white?: boolean;
  margin?: string;
  inverse?: boolean;
  posClassName?: string;
  align?: "center" | "left" | "right";
  style?: any;
  parentStyle?: any;
  border?: boolean;
  key?: string;
  handWritten?: boolean;
}

interface headProps {
  size: string;
  color: string;
  $border:boolean;
  $mode?:string;
  $handWritten? :boolean;
  $inverse?: boolean;
}

const Head =
  styled.h1 <
  headProps >
  `
  display:inline-block;
  border: ${(props)=> !props.$border? "none" : props.$mode=== "chalk"? "4px solid rgba(255,255,255,.8)" : "4px solid black" };
  // border-image: ${(props)=> !props.$border? "none" : props.$mode=== "chalk"? theme.borderImage: "none"};
  border-radius: 10px;
  font-size: ${(props) => props.size};
  color: ${(props) => props.$inverse? props.$mode == "chalk"?  "black" : "white" : props.$mode == "chalk"?  "white" : "black" };
  font-weight: 700;
  ${(props)=> props.$handWritten?" font-family: 'Caveat', cursive  ;" : ""}
  )
`;

const Heading = (props: HeadingProps) => {

  
  const themeC = useContext(ThemeContext).theme



  var backgroundColorF = () => {
    if (props.white) {
      return theme.white;
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
      fontSize = "1.3rem";
      break;
    case 3:
      fontSize = "1.6rem";
      break;
    case 4:
      fontSize = "2rem";
      break;
    case 5:
      fontSize = "2.5rem";
      break;
      case 6:
        fontSize = "4.5rem";
        break;
    default:
      fontSize = "1rem";

      break;
  }

  return (
    <div  

      style={{...props.parentStyle,
        padding: props.margin ? props.margin : " 0",
        textAlign: props.align ? props.align : "center",
      }}
      className={props.posClassName}
    >
      <Head
      $border={props.border ? props.border : false}
        style={props.style}
        className={props.className}
        color={BC}
        size={fontSize}
        $mode={themeC.mode}
        $handWritten={props.handWritten ? props.handWritten : false}
        $inverse={props.inverse}
      >
        {props.children}
      </Head>
    </div>
  );
};

export { Heading };
