import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Icon } from "@mdi/react";
import { mdiCogOutline, mdiChat } from "@mdi/js";
import { useLocation, useNavigate } from "react-router";
import { useEloise } from "../../App";
import { useAuthState } from "react-firebase-hooks/auth";


const Footer: React.FC = () => {
    
  const {logic} = useEloise()
  const [user, loading, error] = useAuthState(logic.fb.auth)
    const pathName = useLocation().pathname

    const navigate = useNavigate()

    const {theme} = useEloise()
    
  const handleCogClick = () => {
    navigate(pathName, {state:{sideWidget:"Login"}})    
    // Your settings cog onClick logic here
  };

  const handleChatClick = () => {
    if(user){
    navigate(pathName, {state:{sideWidget:"Eloise"}}) 
    }
    else{
      navigate(pathName, {state:{sideWidget:"Login"}})    
    }

    
    // Your chat onClick logic here
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent", // Semi-transparent black background
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px"
        }}
      >
        <Container fluid>
          <div onClick={handleCogClick} style={{ cursor: "pointer" }}>
            <Icon path={mdiCogOutline} size={1.5} color={theme.primary}/>
          </div>
          <div onClick={handleChatClick} style={{ cursor: "pointer" }}>
            <Icon path={mdiChat} size={1.5} color={theme.primary} />
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
