import React, { useState, useEffect, useContext } from "react";
import theme from "../../theme";
import styled from "styled-components";
import { ThemeContext } from "../../App";




export interface buttonProps {
  // Required properties
  borderColor?: boolean,
  children: any;
  onClick?: any;
  width?: string;
  color?: string;
  primary?: boolean;
  secondary?: boolean;
  backgroundColor?: string;
  border?: boolean;
  className?: string;
  inverse?: boolean;
  margin?: string;
  posClassName?: string;
  borderRadius?: boolean;
  style?: { [key: string]: string };
  fontSize?: string;
  padding?: string;
  transparent?: boolean;
  noHover?: boolean;
}
interface BtnProps {
  borderColor?: boolean;
  background: any;
  transparent?: boolean;
  noHover?: boolean;
  border:boolean
  $mode?:string;
}
const Btn =
  styled.button <
  BtnProps >
  `
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  letter-spacing: 0.1rem;
  user-select: none;
  border: ${(props) => props.$mode == "chalk"? "4px solid rgba(255,255,255,.8)": "4px solid black"};
  transition: all 0.1s ease-in;
  color: ${(props) => props.$mode == "chalk"? "white" : "black" };
  background-color: transparent;
    
  ::-moz-focus-inner {
    border: 0;
  }

  @media only screen and (max-width: 768px) {
	
	}
  cursor-events: ${(props) => (props.noHover ? "none" : "default")};

  ${(props) => !props.noHover &&
    
    `&:hover {
    transform: translateY(-3px);
    background-color: ${props.$mode == "chalk"? "white" : "black"};
    color: ${props.$mode == "chalk"? "black" : "white"}
    }

    `}
  
`;

const ClearButton = (props: buttonProps) => {
  const [light, setLight] = useState(0);
const themeC = useContext(ThemeContext).theme

  const getC = () => {
    if (props.inverse) {
      if (props.primary) {
        return theme.primary;
      } else if (props.secondary) {
        return theme.secondary;
      } else if (props.color !== undefined) {
        return props.color;
      } else {
        return theme.primary;
      }
    } else if (props.color) {
      return props.color;
    } else {
      return theme.white;
    }
  };
  let c = getC();

  var backgroundColorF = () => {
    if (props.inverse) {
      return theme.white;
    } else if (props.primary) {
      return theme.primary;
    } else if (props.secondary) {
      return theme.secondary;
    } else if (props.backgroundColor !== undefined) {
      return props.backgroundColor;
    } else {
      if (theme.primary !== undefined) {
        return theme.primary;
      } else {
        return "#666";
      }
    }
  };

  var BC: string = backgroundColorF();
  let BCList = BC.slice(5, BC.length - 1).split(",");
  const BC1 = BCList[0];
  const BC2 = BCList[1].replace(/[^\w\s]/gi, "");
  const BC3 = BCList[2].replace(/[^\w\s]/gi, "");
  BC = `hsla(${BC1}, ${BC2}%, ${BC3}%, 1)`;

  return (
    <div
      style={{ padding: props.margin ? props.margin : " 0", maxWidth: "100%" }}
      className={props.posClassName}
    >
      <Btn
        borderColor={props.borderColor}
        noHover={props.noHover}
        background={[BC1, BC2, BC3]}
        className={props.className}
        onClick={props.onClick}
        transparent={props.transparent}
        border={props.border? true :false}
        $mode={themeC.mode}
        style={{
          ...props.style,
          width: props.width ? props.width : "100%",
          padding: props.padding ? props.padding : ".5rem 1.3rem",
          fontSize: props.fontSize ? props.fontSize : "1rem",
          borderRadius: props.borderRadius ? ".3rem" : "0",
          textAlign: "center",
        }}
      >
        {props.children}
      </Btn>
    </div>
  );
};

export { ClearButton };
