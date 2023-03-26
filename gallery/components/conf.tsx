import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import {Heading, Button } from ".."
import { Row } from 'react-bootstrap';
import { ThemeContext } from '../../App';

interface Props {
    open: boolean;
  question: string;
  onConfirm: Function;
  onCancel:Function;
}

const ConfirmationModal: React.FC<Props> = ({ open,question, onConfirm, onCancel }) => {

  const themeC = useContext(ThemeContext).theme

  return (
    <>
      {open && (
        <ModalOverlay onClick={()=>{}}>
          <ModalContent  style={{backgroundColor: themeC.mode==="chalk"?  "white": "black", color: themeC.mode==="chalk"? "black" : "white"}}onClick={e => e.stopPropagation()}>
            <Heading  posClassName="p-3"   style={{ color: themeC.mode==="chalk"? "black" : "white"}} size={2}>{question}</Heading>
            <Row>
            <Button posClassName='col-lg-5 mx-auto' onClick={onConfirm}>Confirm</Button>
            <Button posClassName='col-lg-5 mx-auto' onClick={onCancel}>Cancel</Button>
            </Row>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};


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
`;

export default ConfirmationModal;
