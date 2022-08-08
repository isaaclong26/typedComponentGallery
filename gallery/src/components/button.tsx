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
  margin?: string,
  posClassName?: string,
}
interface BtnProps {
  background: any;
}
const Btn = styled.button<BtnProps>`
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;
  outline: none;

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


  const getC = () =>{
    if(props.inverse){
      if(props.primary){
        return theme.primary
      }
      else if(props.secondary){
        return theme.secondary
      }
      else if(props.color){
        return props.color
      }
      else{
        return theme.primary
      }
    }
    else{
      return theme.white
    }
  }
  let c = getC()
 
  var backgroundColorF = () => {
    if(props.inverse){
      return theme.white;
    }

    else if (props.primary) {
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
  const BC2 = BCList[1].replace(/[^\w\s]/gi, '');
  const BC3 = BCList[2].replace(/[^\w\s]/gi, '');;
  BC = `hsla(${BC1}, ${BC2}%, ${BC3}%, 1)`;

  return (

    <div style={{padding: props.margin? props.margin :" 0", maxWidth: '100%'}} className={props.posClassName}>
    <Btn
      background={[BC1, BC2, BC3]} 
      className={props.className}
      onClick={props.onClick}
      style={{
        width: props.width ? props.width : "100%",
        backgroundColor: BC,
        color: c,
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
    </div>
  );
};

export default Button;
