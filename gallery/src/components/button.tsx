import React, { useState, useEffect } from "react";
import theme from "../theme";
import styled from "styled-components";
export interface buttonProps {
  // Required properties
  children: string;
  onClick?: any;
  width?: string;
  color?: string;
  primary?: boolean;
  secondary?: boolean;
  backgroundColor?: string;
  border?: boolean;
  className?: string,
  inverse?: boolean,
}
interface BtnProps {
  background: any;
}
const Btn = styled.button<BtnProps>`
  white-space: nowrap;

  cursor: pointer;
  outline: none;

  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  user-select: none;
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    transform: translateY(-3px);
    background-color: ${(props) =>
      `hsla(${props.background[0]}, ${props.background[1]}%, ${
        parseInt(props.background[2]) + 10
      }%, 1)!important`};
  }
`;

const Button = (props: buttonProps) => {
  const [light, setLight] = useState(0);
  var backgroundColorF = () => {
    if(props.inverse){
      if(props.primary){
      
      }
    }

    if (props.primary) {
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
  console.log(BCList);
  const BC1 = BCList[0];
  const BC2 = BCList[1].slice(0, 3);
  const BC3 = BCList[2].slice(0, 3);
  BC = `hsla(${BC1}, ${BC2}%, ${BC3}%, 1)`;

  return (
    <Btn
      background={[BC1, BC2, BC3]}
      className={props.className}
      onClick={props.onClick}
      style={{
        width: props.width ? props.width : "auto",
        backgroundColor: BC,
        color: props.color ? props.color : theme.color,
        padding: ".6rem 1.5rem",
        fontSize: theme.relFontSize,
        borderRadius: theme.borderRadius ? ".5rem" : "0",
        textAlign: "center",
        margin: "auto",
        border: props.border ? "solid" : theme.border,
      }}
    >
      {props.children}
    </Btn>
  );
};

export default Button;
