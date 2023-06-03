import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {Addy, useEloise } from "../../";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Modal from "react-bootstrap/Modal";



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

export interface DefaultInputProps {
  onEnter?: () => void;
  extLabel?: boolean;
  border?: boolean;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
  rounded?: boolean;
  
}
export interface InputProps extends DefaultInputProps {
  label: string;
  state: any | undefined;
  setState: React.Dispatch<React.SetStateAction<any>>;
  cacheKey?: string;
  locked?: boolean;
  warning?: boolean;
  warningMessage?: string;  
  addy?: boolean;

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

const Input: React.FC<InputProps> = (props:InputProps) => {

  const {theme} = useEloise()

  const {
    label,
    extLabel,
    border,
    state,
    setState,
    placeholder,
    type,
    onEnter,
    locked,
    warning,
    warningMessage,
    style,
    rounded,
    addy,
    cacheKey,
  } = { ...theme.input, ...props };

    const [hasValue, setHasValue] = useState<boolean>(false)
  
    const [showWarningModal, setShowWarningModal] = useState(false);
    const inputRef = useRef<any>();

    const [inputState, setInputState] = useState(addy && typeof state === 'object' && state.street ? state.street : state);

  useEffect(()=>{
    if(state){
      if(state.street){
        setInputState(state.street)
      }
      else{
        setInputState(state)
      }
    }
  },[state])

    useEffect(() => {
        if (addy && window.google) {
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              handleAddySelect(place.formatted_address);
            }
          });
        }
      }, [addy]);

   

    const handleAddySelect = async (address: string) => {

      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
    
      // Extract address components
      const addressComponents = results[0].address_components;
    
      let street = "";
      let city = "";
      let state = "";
    
      for (let i = 0; i < addressComponents.length; i++) {
        const types = addressComponents[i].types;
    
        if (types.includes("street_number")) {
          street += addressComponents[i].long_name;
        }
    
        if (types.includes("route")) {
          street += " " + addressComponents[i].long_name;
        }
    
        if (types.includes("locality")) {
          city = addressComponents[i].long_name;
        }
    
        if (types.includes("administrative_area_level_1")) {
          state = addressComponents[i].short_name;
        }
      }
    
      const addy: Addy = {
        street,
        city,
        state,
        lat: latLng.lat,
        lng: latLng.lng,
      };
    
    
      setState(addy);
    };
    
  
    const handleCloseModal = () => setShowWarningModal(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (locked || warning) {
        setShowWarningModal(true);
      } else {
        setState(e.target.value);
      }
    };
  
    const handleInputBlur = async () => {
      if (addy && state) {
        await handleAddySelect(state);
      }
    };
  
    useEffect(() => {
      if(state !== "")
      setHasValue(true);
    }, [state]);
  
    useEffect(() => {
      if (cacheKey !== undefined) {
        const cachedValue = localStorage.getItem(cacheKey);
        if (cachedValue !== null) {
          setState(cachedValue);
        }
      }
    }, [ cacheKey]);
  
    useEffect(() => {
      if (cacheKey !== undefined) {
        localStorage.setItem(cacheKey, state);
      }
  
      return () => {
        if (cacheKey !== undefined) {
          localStorage.removeItem(cacheKey);
        }
      };
    }, [ cacheKey, state]);

    return (
      <>
        <InputWrapper extLabel={extLabel}>
          {extLabel && <StyledLabel hasValue={hasValue}>{label}</StyledLabel>}
          <StyledInput
            ref={inputRef}
            border={border}
            value={ inputState}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
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