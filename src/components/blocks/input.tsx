import React from "react";
import styled from "styled-components";
import { InputWrapper, StyledInput, StyledLabel } from "../styles/styledInput";
import { InputProps } from "../../";


/**
 * A styled input component that can be used for various purposes.
 * 
 * @component
 * @example
 * ```jsx
 * <Input
 *   label="Username"
 *   state={username}
 *   setState={setUsername}
 *   placeholder="Enter your username"
 * />
 * ```
 * @param {Object} props - The props object for the component.
 * @param {string} props.label - The label to display above the input field.
 * @param {boolean} [props.extLabel=false] - Whether the label is outside of the input field or not.
 * @param {boolean} [props.border=true] - Whether the input field has a border or not.
 * @param {string} props.state - The state value for the input field.
 * @param {function} props.setState - The function to set the state value for the input field.
 * @param {string} [props.placeholder=""] - The placeholder text for the input field.
 * @returns {JSX.Element} A styled input component.
 * ```
**/

const Input: React.FC<InputProps> = ({
  label,
  extLabel = false,
  border = true,
  state,
  setState,
  placeholder = "",
  type,
  onEnter
}) => {
  const hasValue = Boolean(state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <InputWrapper extLabel={extLabel}>
      {extLabel && <StyledLabel hasValue={hasValue}>{label}</StyledLabel>}
      <StyledInput
        border={border}
        value={state}
        onChange={handleInputChange}
        placeholder={!extLabel ? placeholder : undefined}
        type={type}
      />
    </InputWrapper>
  );
};

export default Input;


