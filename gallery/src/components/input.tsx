import React, { useState, useEffect } from "react";
import theme from "../theme";
import styled from "styled-components";

export interface InputProps {
  label: string;
  primary?: boolean;
  secondary?: boolean;
  backgroundColor?: string;
  onChange?: any;
  width?: string | number;
}
interface InpProps {
  background: string;
  width: string | number;
}
const Inp = styled.input<InpProps>`
  font-size: ${theme.relFontSize};
  background-color: ${theme.white};
  border: 2px solid ${(props) => props.background};
  width: ${(props) => props.width};
  color: ${(props) => props.background};
  border-radius: ${theme.borderRadius ? ".35rem" : "0"};
  padding: 5px 3px;
  margin: 5px;

  &:hover {
    transition: border-width 0.1s ease, margin 0.1s ease;

    margin: 4px;
    border-width: 3px;
  }

  &:focus {
    outline: none !important;

    border-color: ${(props) => props.background};
    transition: border-width 0.1s ease, margin 0.1s ease;

    margin: 4px;
    border-width: 3px;
  }
  &::placeholder {
    color: ${(props) => props.background};
  }
`;

const Input = (props: InputProps) => {
  var backgroundColorF = () => {
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
  var BC = backgroundColorF();
  return (
    <Inp
      width={props.width ? props.width : "auto"}
      background={BC}
      placeholder={props.label}
      onChange={props.onChange}
      style={{}}
    ></Inp>
  );
};

export default Input;
