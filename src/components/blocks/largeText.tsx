import React from "react";
import styled from "styled-components";
import { useEloise } from "../../App";
import { FirebaseLTProps, LTProps, RegularLTProps } from "../../";
import { LargeTextInputWrapper, StyledTextArea } from "../styles/LT";

/**
 * A large text input component that supports both regular and Firebase-backed state management.
 * 
 * When using with Firebase, the component will automatically handle throttled updates to the specified
 * it also automatically fetches the document.
 *@example
 *
 * <LargeTextInput
 *   firebase
 *   path="profile/bio"
 *   placeholder="Tell us about yourself..."
 *   throttle={500}
 * />
 *
 * @param {Object} props - The properties for the component.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {boolean} [props.firebase=false] - If true, the component will manage state through Firestore.
 * @param {string} [props.path] - The Firestore path to use when firebase is true. Required if firebase is true.
 * @param {string} [props.state] - The state value when firebase is false. Required if firebase is false.
 * @param {Function} [props.setState] - The state update function when firebase is false. Required if firebase is false.
 * @returns {ReactElement} The rendered LargeTextInput component.
 */
const LargeTextInput: React.FC<LTProps> = ({
  placeholder = "",
  firebase = false,
  ...props
}) => {
  const { theme, logic } = useEloise();

  if (firebase) {
    const { path, throttle } = props as FirebaseLTProps;
    const [value, setValue] = logic.fb.hooks.useThrottleChange(path);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };

    return (
      <LargeTextInputWrapper>
        <StyledTextArea
          {...props} // Spread the rest of the properties
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={props.height? {height: props.height} : {}}
        />
      </LargeTextInputWrapper>
    );
  } else {
    const { state, setState } = props as RegularLTProps;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setState(e.target.value);
    };

    return (
      <LargeTextInputWrapper>
        <StyledTextArea
          {...props} // Spread the rest of the properties
          value={state}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </LargeTextInputWrapper>
    );
  }
};

export default LargeTextInput;
