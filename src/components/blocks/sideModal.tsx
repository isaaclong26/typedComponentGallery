import React, { useEffect, useState, useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useEloise } from '../../App';
import { CSSTransition } from 'react-transition-group';
import { useLocation,  useNavigate,  useNavigation,  useParams } from 'react-router';
import { Eloise, EloisePage, Login, SiteConfig } from '../../';
import SignUp from '../pages/signup';
import EloiseChat from '../widgets/eloise';
import { StyledHole } from '../styles/chatStyles';
/**
 * Renders content for the SideModal based on the current `sideWidget` prop.
 * @param {string} sideWidget - The name of the current side widget.
 * @returns {React.ReactNode} The component to render.
 */
 const renderModalContent = (sideWidget: string, holeCoords: HoleCoords, setHoleCoords: (coords: HoleCoords) => void): React.ReactNode => {
      
        const { siteConfig } = useEloise();
        // Look up the page object in `siteConfig` with a name matching the `sideWidget` prop.
        const page = siteConfig.sideWidget.find((p:any) => p.name === sideWidget);
      
        // If no page is found with the matching name, return null.
        if(sideWidget !== "Eloise" && !checkNone(holeCoords)){
          setHoleCoords({top:0, right:0, left:0, bottom: 0})

        }
        if (!page) {
            if(sideWidget === 'Login'){
                return <Login/>
            }
            else if(sideWidget === 'SignUp'){
                return <SignUp/>
            }
            else if(sideWidget === "Eloise"){
              return <EloiseChat holeCoords={holeCoords} setHoleCoords={setHoleCoords} />
            }
        else{
                  return null;

        }
        }
        

            return <page.component />;

      };
  
  /**
   * A side modal that slides in from the side of the screen and displays content.
   */

   interface HoleCoords {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  const checkNone = (holeCoords: HoleCoords): boolean => {
    const { top, right, bottom, left } = holeCoords;
    return (top + right + bottom + left) === 0
  };
  const SideModal: React.FC = ({ }) => {

    const navigate = useNavigate()

    const { theme, logic, siteConfig } = useEloise();
    const themeC = theme;
    const [holeCoords, setHoleCoords] = useState<HoleCoords>({top:0, right:0 , bottom:0, left:0});


    // Get the `sideWidget` prop from the current location state.
   // Get the `sideWidget` prop from the current location state.
    const sideWidget = useLocation().state?.sideWidget;
    const pathName = useLocation().pathname
  
    // If `sideWidget` is not present in the location state, don't render the modal.
    if (!sideWidget) {
    return null;
    }
  
    return (
      <>
          <ModalOverlay onClick={() => navigate(pathName, {state:{}})}>    

           {!checkNone(holeCoords) && <StyledHole targetTop={holeCoords.top} targetBottom={window.innerHeight - holeCoords.bottom} />}

              <Row>

                <ModalContent
                
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '10px',
                    padding: '20px',
                    height: '70vh'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Render the appropriate content based on the `sideWidget` prop. */}
                  {renderModalContent(sideWidget, holeCoords, setHoleCoords)}
                </ModalContent>
              </Row>
          </ModalOverlay>
        
      </>
    );
  };
  

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Center the modal vertically and horizontally on mobile screens */
  @media (max-width: 767px) {
    align-items: flex-start;
    justify-content: center;
  }
`;


const Row = styled.div`
  width: 100vw;
  display: flex;

  &.modal-transition-enter {
    animation: ${slideIn} 500ms forwards;
  }

  &.modal-transition-exit {
    animation: ${slideOut} 500ms forwards;
  }
`;

const ModalContent = styled.div`
  border-radius: 10px;
  width: 35%;
  margin-left: 60%;

  @media (max-width: 1000px) and (min-width: 750px) {
    margin: auto;
    width: 50%;
    margin-top: 10vh;
  }
  @media (max-width: 767px) {
    margin: auto;
    width: 90%;
    margin-top: 10vh;
  }
`;

export default SideModal;
