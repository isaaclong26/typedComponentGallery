import styled from "styled-components";
/**
 * A styled wrapper for the `StyledTextArea` component.
 * 
 * @example
 * ```tsx
 * <LargeTextInputWrapper>
 *   <StyledTextArea placeholder="Enter text here..." />
 * </LargeTextInputWrapper>
 * ```
 */
export const LargeTextInputWrapper = styled.div`
  margin-bottom: 1rem;
`;

/**
 * A styled textarea component.
 * 
 * @example
 * ```tsx
 * <StyledTextArea 
 *    placeholder="Enter text here..."
 *    value={inputValue}
 *    onChange={(e) => setInputValue(e.target.value)}
 *  />
 * ```
 */
export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 0.5rem;
  font-size: ${(props) => props.theme.fontSize};
  font-family: inherit;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.white};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius};
  resize: vertical;
  transition: border 0.2s;
  
  &:focus {
    outline: none;
    border: ${(props) => props.theme.borderFocused};
  }

  &::placeholder {
    color: ${(props) => props.theme.grey};
  }
`;
