import React, { useContext, useEffect, CSSProperties } from "react";
import styled from "styled-components";
import { theme } from "../";
import { getTextColorFromBackground } from "./colorCheck";
import { v4 as uuidv4 } from "uuid";

interface TextProps {
  children: string;
  color?: string | "auto";
  className?: string;
  align?: "center" | "left" | "right";
  style?: CSSProperties;
  key?: string | "auto";
  ref?: React.RefObject<HTMLHeadingElement>;
  onClick?: () => void;
  size?: "body" | "large" | "small" | number;
  ariaLabel?: string;
  ariaHidden?: boolean;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  visible?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  color = theme.primary,
  className,
  align,
  style = {},
  key = "",
  ref,
  onClick,
  size = "body",
  ariaLabel,
  ariaHidden = false,
  backgroundColor,
  bold,
  italic,
  visible = true,
}) => {
  const fontSize = () => {
    switch (size) {
      case "body":
        return "1rem";
      case "large":
        return "2.25rem";
      case "small":
        return "1.75rem";
      default:
        return `${size}rem`;
    }
  };

  useEffect(() => {
    // Add any necessary side effects here
  }, []);

  const textContent = children.trim();
  const uniqueKey = key === "auto" ? uuidv4() : key;

  const textColor =
    color === "auto" && backgroundColor
      ? getTextColorFromBackground(backgroundColor)
      : color;

  const fontStyle = {
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
  };

  if (!visible) {
    return null;
  }

  return (
    <h1
      className={`text-${align || "left"} ${className}`}
      style={{
        color: textColor,
        ...style,
        fontSize: fontSize(),
        backgroundColor,
        ...fontStyle,
      }}
      key={uniqueKey}
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel || textContent}
      aria-hidden={ariaHidden}
    >
      {children}
    </h1>
  );
};

export default Text;
