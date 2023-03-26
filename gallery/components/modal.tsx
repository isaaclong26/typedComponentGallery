import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { CSSTransition } from 'react-transition-group';

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style?:any
}
const ChildrenModal: React.FC<Props> = ({ open, onClose, children, style }) => {
  const themeC = useContext(ThemeContext).theme
  return (
    <>
      {open && (
        <ModalOverlay
        onClick={onClose}>
            <CSSTransition in={open} timeout={500} classNames="modal-transition">

          <ModalContent  style={style?
          {
            ...style,
            backgroundColor: themeC.mode==="chalk"?  "white": "black", color: themeC.mode==="chalk"? "black" : "white"
          }
          :
          {
            backgroundColor: themeC.mode==="chalk"?  "white": "black", color: themeC.mode==="chalk"? "black" : "white"

          }
        }
            
            onClick={e => e.stopPropagation()}>
            {children}
          </ModalContent>
          </CSSTransition>

        </ModalOverlay>
      )}
    </>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 2s ease;
`;

export default ChildrenModal;
