import { InputProps } from "./input";
import styled from "styled-components";
import theme from "../theme";

const Wrapper = styled.div<InpProps>`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: ${(props) => props.width};
`;

const Inp = styled.input<InpProps>`
  outline: 2px solid ${(props) => props.background};

  font-family: inherit;
  width: 100%;
  border: 0;
  font-size: 1.3rem;
  color: ${(props) => props.background};
  padding: 3px 5px;
  background: #fff;
  border-radius: ${theme.borderRadius ? "3px" : 0};
  &::placeholder {
    color: transparent;
  }

  &:focus {
    font-weight: 700;
    outline-width: 3px;
  }
  &:hover {
    font-weight: 700;
    outline-width: 3px;
  }
`;

const Lbl = styled.label<InpProps>`
  position: absolute;
  color: ${(props) => props.background};
  top: 20px;
  left: 5px;
  pointer-events:none;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  ${Inp}:focus ~ & {
    position: absolute;
    top: -15px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) =>
      props.whiteLabel ? theme.white : props.background} !important;
  }
  ${Inp}:valid ~ & {
    position: absolute;
    top: -15px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) =>
      props.whiteLabel ? theme.white : props.background} !important;
  }
  ${Inp}:hover ~& {
    font-weight: bold;
  }
`;

interface InpProps {
  background?: string | any;
  width?: string | number;
  className?: any;
  htmlfor?: any;
  whiteLabel?: boolean;
}
const Input2 = (props: InputProps) => {
  const BC =  () => {
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
  const bc = BC();
  return (
    <Wrapper>
      <Inp
        required
        value={props.value}
        id="x"
        className={props.className}
        width={props.width ? props.width : "100%"}
        background={bc}
        placeholder={props.label}
        onChange={props.onChange}
      />
      <Lbl
        htmlfor="x"
        background={bc}
        whiteLabel={props.whiteLabel ? props.whiteLabel : false}
      >
        {props.label}
      </Lbl>
    </Wrapper>
  );
};

export default Input2;
