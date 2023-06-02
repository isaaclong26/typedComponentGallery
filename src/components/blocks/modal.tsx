import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: any;
}

export const ChildrenModal: React.FC<Props> = ({ open, onClose, children, style }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    }
  }, [open]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <>
      {open && (
        <ModalOverlay onClick={handleClose}>
            <ModalContent
              style={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '10px',
                maxWidth: '75%',
                padding: '20px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '75%',
                overflowY: 'scroll',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 50px;
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
  border-radius: 10px;
`;

