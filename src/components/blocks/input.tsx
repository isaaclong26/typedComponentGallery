import React, { useState, useEffect, useContext, FocusEventHandler } from "react";
import styled from "styled-components";
import { Input2 } from "./input2";
import { useTheme } from "../../App";

export interface InputProps {
  label: string;
  primary?: boolean;
  secondary?: boolean;
  backgroundColor?: string;
  onChange?: any;
  width?: string | number;
  className?: string;
  margin?: string;
  inverse?: boolean;
  extLabel?: boolean;
  color?: string;
  externalLabel?: boolean;
  whiteLabel?: boolean;
  posClassName?: string;
  value?: string;
  type?: string;
  onEnter?: Function;
  onEmpty?: Function;
  borderless?: boolean;
  style?: any;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
interface InpProps {
  borderless?: boolean;
  background: string;
  width: string | number;
  value?: string;
  ref?: any;
  $mode?: string;
}
const Inp =
  styled.input <
  InpProps >
  `
  font-size: 1rem;
  background-color: transparent;
  border: ${(props) => props.borderless ? "none" : props.$mode == "chalk"? " 1px solid rgba(255,255,255,.8)": "1px solid black"};
  width: ${(props) => props.width};
  font-weight: 700;
  color: ${(props) => props.$mode == "chalk"? "white" : "black" };
  padding: 5px 3px;
  &:hover {
    transition: border-width 0.1s ease, padding 0.1s ease, text-shadow 0.1s ease;
    border-color:${(props) => (props.borderless ? "none" : "white")};

  }

  &:focus {
    outline: none !important;

    border-color:${(props) => (props.borderless ? "none" : "white")};
  }
  &::placeholder {
    color: ${(props) => props.$mode == "chalk"? "white" : "black" };
  }
  
`;

const Input = React.forwardRef((props: InputProps, ref) => {

  const theme = useTheme()

  const getC = () => {
    if (props.inverse) {
      if (props.primary) {
        return theme.primary;
      } else if (props.secondary) {
        return theme.secondary;
      } else if (props.color) {
        return props.color;
      } else {
        return theme.primary;
      }
    } else {
      return theme.white;
    }
  };
  let c = getC();

  var backgroundColorF = () => {
    if (props.inverse) {
      return theme.white;
    }
    if (props.primary) {
      return theme.primary;
    } else if (props.secondary) {
      return theme.secondary;
    } else if (props.backgroundColor !== undefined) {
      return props.backgroundColor;
    } else {
      if (theme.primary !== undefined) {
        return "#fff";
      } else {
        return "#666";
      }
    }
  };
  const blur = (e:any)=>{}
  const handleKeyDown = (event: any) => {

    if (event.key === "Enter") {
      if(props.onEnter)
         props.onEnter(event.target.value)
    }
    if (event.key === "Backspace") {
      if(event.target.value === ""){

        if(props.onEmpty){
            event.stopPropagation()
            event.preventDefault()

             props.onEmpty(event.target.value)
        }
      }
    }
  };
  var BC = backgroundColorF();
  if (props.externalLabel) {
    return (
      <div
        style={{ padding: props.margin ? props.margin : " 0" }}
        className={props.posClassName}
      >
        <Input2 {...props} />
      </div>
    );
  } else {
    return (
      <div
        style={{ padding: props.margin ? props.margin : " 0" }}
        className={props.posClassName}
      >
        <Inp
          ref={ref}
          type={props.type ? props.type : "text"}
          value={props.value}
          onBlur={props.onBlur ?? blur}
          className={props.className}
          width={props.width ? props.width : "100%"}
          background={BC}
          placeholder={props.label}
          onChange={props.onChange}
          style={{...props.style}}
          onKeyDown={handleKeyDown}
          borderless={props.borderless}
        ></Inp>
      </div>
    );
  }
});

export { Input };
