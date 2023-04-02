import React, { useState, useEffect } from "react";
import theme from "../../theme";
import styled from "styled-components";
export interface buttonProps {
  // Required properties
  borderColor?: boolean,
  children: string;
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
}
const Btn =
  styled.button <
  BtnProps >
  `
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  font-size: 6rem;
  letter-spacing: 0.1rem;
  user-select: none;
  border: 1px solid white;
  transition: all 0.1s ease-in;
    color: white;
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
    background-color:white;;
    color: black;
    }

    `}
  
`;

const Bubble = (props: buttonProps) => {
  const [light, setLight] = useState(0);

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
        style={{
          ...props.style,
          width: props.width ? props.width : "100%",
          padding: props.padding ? props.padding : ".6rem 1.5rem",
          fontSize: props.fontSize ? props.fontSize : ".85rem",
          borderRadius: props.borderRadius ? ".3rem" : "0",
          textAlign: "center",
        }}
      >
        {props.children}
      </Btn>
    </div>
  );
};

export { Bubble };
