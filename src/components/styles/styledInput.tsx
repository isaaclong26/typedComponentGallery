import styled from "styled-components";


/**
 * A styled wrapper for an input component.
 * 
 * @component
 * @param {Object} props - The props object for the component.
 * @param {boolean} [props.extLabel=false] - Whether the label is outside of the input field or not.
 * @returns {JSX.Element} A styled wrapper for an input component.
 */
export const InputWrapper = styled.div<{ extLabel?: boolean }>`
  position: relative;
  margin-bottom: ${(props) => (props.extLabel ? "1rem" : "2rem")};
`;

/**
 * A styled input component.
 * 
 * @component
 * @param {Object} props - The props object for the component.
 * @param {boolean} [props.border=true] - Whether the input field has a border or not.
 * @returns {JSX.Element} A styled input component.
 */
export const StyledInput = styled.input<{ border?: boolean }>`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: ${(props) => props.theme.fontSize};
  font-family: inherit;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.white};
  border: ${(props) => (props.border ? props.theme.border : "none")};
  border-radius: ${(props) => props.theme.borderRadius};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border: ${(props) => (props.border ? props.theme.borderFocused : "none")};
  }

  &::placeholder {
    color: ${(props) => props.theme.grey};
  }
`;

/**
 * A styled label component.
 * 
 * @component
 * @param {Object} props - The props object for the component.
 * @param {boolean} props.hasValue - Whether the input field has a value or not.
 * @returns {JSX.Element} A styled label component.
 */
export const StyledLabel = styled.label<{ hasValue: boolean }>`
  position: absolute;
  left: 1rem;
  top: ${(props) => (props.hasValue ? "-1 .5rem" : "50%")};
  font-size: ${(props) => (props.hasValue ? "0.8rem" : "inherit")};
  color: ${(props) => props.theme.grey};
  transform: ${(props) =>
    props.hasValue ? "translateY(0)" : "translateY(-50%)"};
  transition: transform 0.2s, font-size 0.2s, top 0.2s;
  pointer-events: none;
`;
