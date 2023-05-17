import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputWrapper, StyledInput, StyledLabel } from "../styles/styledInput";
import Modal from "react-bootstrap/Modal";
/**
 * @typedef InputProps
 * @type {Object}
 * @property {string} label - The label to display above the input field.
 * @property {function} [onEnter] - Callback function to execute when the "Enter" key is pressed.
 * @property {boolean} [extLabel=false] - Whether the label is outside of the input field or not.
 * @property {boolean} [border=true] - Whether the input field has a border or not.
 * @property {any | undefined} state - The state value for the input field.
 * @property {React.Dispatch<React.SetStateAction<any>>} setState - The function to set the state value for the input field.
 * @property {string} [placeholder] - The placeholder text for the input field.
 * @property {string} [type] - The type of input field (e.g., "text", "password", "email", etc.).
 * @property {boolean} [locked=false] - Whether the input field is read-only or not.
 * @property {boolean} [warning=false] - Whether to display a warning modal when the user attempts to change the input field value.
 * @property {string} [warningMessage] - The warning message to display in the modal.
 */
export interface InputProps {
  label: string;
  onEnter?: () => void;
  extLabel?: boolean;
  border?: boolean;
  state: any | undefined;
  setState: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  type?: string;
  locked?: boolean;
  warning?: boolean;
  warningMessage?: string;
  style?: React.CSSProperties;
  rounded?:boolean
}

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
 *   locked={true}
 *   warning={true}
 *   warningMessage="Changing the value is not recommended at this stage."
 * />
 * ```
 *
 * @param {InputProps} props - The props object for the component.
 * @returns {JSX.Element} A styled input component.
 */

const Input: React.FC<InputProps> = ({
  label,
  extLabel = false,
  border = true,
  state,
  setState,
  placeholder = "",
  type,
  onEnter,
  locked = false,
  warning = false,
  warningMessage = "",
  style,
  rounded = false,
}) => {
  const [hasValue, setHasValue] = useState<boolean>(false)

  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleCloseModal = () => setShowWarningModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (locked || warning) {
      setShowWarningModal(true);
    } else {
      setState(e.target.value);
    }
  };
  useEffect(() => {
    if(state !== "")
    setHasValue(true);
  }, [state]);


  return (
    <>
      <InputWrapper extLabel={extLabel}>
        {extLabel && <StyledLabel hasValue={hasValue}>{label}</StyledLabel>}
        <StyledInput
          border={border}
          value={state}
          onChange={handleInputChange}
          placeholder={!extLabel ? placeholder : undefined}
          type={type}
          readOnly={locked}
          style={{...style, borderRadius: rounded? "3px": 0}}
        />
      </InputWrapper>

      {/* Warning Modal */}
      <Modal show={showWarningModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>{warningMessage}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Input;
