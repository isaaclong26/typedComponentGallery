import React, { useState, useEffect } from "react"

import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap'

const color= "103, 90, 128"
const Header: React.FC<
    {

    }
> = (props) => {



    return (
        <>
            <Navbar sticky="top"  bg="white"  expand="lg">
                <Container className="mx-1">
                    <Navbar.Brand href="#home">
                        <img
                        src="./conquester.png"
                        width="75"
                        height="75"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>  
                  <Navbar.Brand href="/">Vibez</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="Account">Account</Nav.Link>
                            {/* <Nav.Link href="Gallery">Protocols</Nav.Link>
                            <Nav.Link href="Gallery">Inititives</Nav.Link> */}
                            {/* <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Custom Applications</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Digital Marketing</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">E-Commerce Development</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Social Media Managment and Automation </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Software" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">Array Methods</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Eloise.Life</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">TaskMaster</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header