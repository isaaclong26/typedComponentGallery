import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FontSize } from "../..";
import { useEloise } from "../../App";
import { Color } from "../../functions/color";

export interface HeadingProps {
  children: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | FontSize;

  color?: Color | number;
  className?: string;
  margin?: string;
  posClassName?: string;
  align?: "center" | "left" | "right";
  style?: any;
  parentStyle?: any;
  border?: boolean;
  key?: string;
  handWritten?: boolean;
  link?: string;
}

interface headProps {
  size: string;
  color: string;
  $border: boolean;
  $mode?: string;
  $handWritten?: boolean;
  $inverse?: boolean;
}
export interface DefaultHeadingProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  primary?: boolean;
  secondary?: boolean;
  color?: Color | number;
  className?: string;
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

const Head = styled.h1<headProps>`
  display: inline-block;
  border: ${(props) =>
    !props.$border
      ? "none"
      : props.$mode === "chalk"
      ? "4px solid rgba(255,255,255,.8)"
      : "4px solid black"};
  border-radius: 10px;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: 400;
  ${(props) => (props.$handWritten ? " font-family: 'Caveat', cursive  ;" : "")}
  )
`;

const Heading = (props: HeadingProps) => {
  const { theme, logic } = useEloise();
  const navigate = useNavigate();

  // Use the heading properties from the theme if they are not provided in props
  const { color, size, border, handWritten, inverse } = {
    ...theme.heading,
    ...props,
  };

  const handleClick = () => {
    if (props.link) {
      navigate(props.link);
    }
  };
  var fontSize: string;

  if (size && typeof size !== "number") {
    fontSize = size;
  } else {
    switch (size) {
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
  }

  return (
    <div
      style={{
        ...props.parentStyle,
        padding: props.margin ? props.margin : " 0",
        textAlign: props.align ? props.align : "center",
        cursor: props.link ? "pointer" : "default",
      }}
      className={props.posClassName}
      onClick={props.link ? handleClick : () => {}}>
      <Head
        $border={border ? border : false}
        style={props.style}
        className={props.className}
        color={
          color
            ? typeof color === "number"
              ? logic.color.convertToHSLA(theme.colors[color])
              : color
            : "black"
        }
        size={fontSize}
        $handWritten={handWritten ? handWritten : false}
        $inverse={inverse}>
        {props.children}
      </Head>
    </div>
  );
};

export { Heading };
