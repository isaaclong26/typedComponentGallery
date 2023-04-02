import React, { useContext } from "react";
import styled from "styled-components";

import Icon from "@mdi/react";
import { useTheme } from "../../App";

const IconContainer = styled.div`
  &:hover {
    transform: translateY(-3px);
    z-index: 10;
  }
`;

const AppIcon = (props: {
  icon: any,
  className?: string,
  onClick: Function,
  title:string,
  size?: number,
  color?: string
  inverse?: boolean
}) => {

  const themeC = useTheme()
  

  return (
    <IconContainer
      className={props.className ? props.className : ""}
      onClick={() => {
        props.onClick();
      }}
    >
      <Icon
        path={props.icon}
        style={{
          borderRadius: "3px",
          margin: "auto",
        }}
        title={props.title}
        size={props.size? props.size: 1.6}
        color={props.color? props.color: themeC.mode =="chalk"? props.inverse? "black": "white" : props.inverse? "white": "black"}
  
      />
    </IconContainer>
  );
};

export { AppIcon };
