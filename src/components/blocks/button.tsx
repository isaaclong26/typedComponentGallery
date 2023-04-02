import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "../../App";
import styled from "styled-components";


import { Logic } from '../../functions';
import { Col, Container, Row } from 'react-bootstrap';

const errorHandler = async (e: any) => {

}; const logic = new Logic(errorHandler, errorHandler, errorHandler)



interface BtnProps {
  background: any;
  transparent?: boolean;
  noHover?: boolean;
}
const Btn = styled.button<BtnProps>`
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  user-select: none;
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  @media only screen and (max-width: 768px) {
  }
  cursor-events: ${(props) => (props.noHover ? "none" : "default")};

  ${(props) =>
    !props.noHover &&
    `&:hover {
    transform: translateY(-3px);
    background-color: 
      ${
        props.transparent
          ? "transparent"
          : `hsla(${props.background[0]}, ${props.background[1]}%, ${
              parseInt(props.background[2]) + 10
            }%, 1)!important`
      };
  }`}
`;


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
const Button: React.FC<buttonProps> = ({
  children, onClick, width, color, primary, secondary, backgroundColor, border, className, inverse, margin, posClassName, borderRadius, style, fontSize, padding, transparent, noHover
  }) => {
  const theme = useTheme();
  const [light, setLight] = useState(0);

  const getC = () => {
    if (inverse) {
      if (primary) {
        return theme.primary;
      } else if (secondary) {
        return theme.secondary;
      } else if (color !== undefined) {
        return color;
      } else {
        return theme.primary;
      }
    } else if (color) {
      return color;
    } else {
      return theme.white;
    }
  };

  var backgroundColorF = () => {
    if (inverse) {
      return theme.white;
    } else if (primary) {
      return theme.primary;
    } else if (secondary) {
      return theme.secondary;
    } else if (backgroundColor !== undefined) {
      return backgroundColor;
    } else {
      if (theme.primary !== undefined) {
        return theme.primary;
      } else {
        return "#666";
      }
    }
  };

  var BC: string = backgroundColorF();
  let c = logic.getTextColorFromBackground(BC)

  let BCList = BC.slice(5, BC.length - 1).split(",");
  const BC1 = BCList[0];
  const BC2 = BCList[1].replace(/[^\w\s]/gi, "");
  const BC3 = BCList[2].replace(/[^\w\s]/gi, "");
  BC = `hsla(${BC1}, ${BC2}%, ${BC3}%, 1)`;

  return (
    <div
      style={{ padding: margin ? margin : " 0", maxWidth: "100%" }}
      className={posClassName}
    >
      <Btn
        noHover={noHover}
        transparent={transparent}
        background={[BC1, BC2, BC3]}
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: width ? width : "100%",
          backgroundColor: transparent ? "transparent" : BC,
          color: c,
          padding: padding ? padding : ".6rem 1.5rem",
          fontSize: fontSize ? fontSize : "1rem",
          borderRadius: borderRadius ? ".3rem" : "0",
          textAlign: "center",
          border: border ? "solid" : theme.border,
        }}
      >
        {children}
      </Btn>
    </div>
  );
};

export { Button };
