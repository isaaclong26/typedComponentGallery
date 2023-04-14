import React, { useState, useEffect } from "react"
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { useEloise } from "../../App"
import { EloisePage } from "../.."
import { useLocation } from "react-router"

const color = "103, 90, 128"

const Header: React.FC = () => {
  const { siteConfig, theme } = useEloise()

  const location = useLocation()

  // const sideWidget = useLocation().state?.sideWidget;
  // if (sideWidget) {
  //   return null;
  //   }

  const renderNavItems = (pages: EloisePage[]) => {
    return pages.map(page => {
      if (page.pages) {
        // If the page has nested pages, render a NavDropdown component
        return (
          <NavDropdown title={page.name} id={page.name}>
            {renderNavItems(page.pages)}
          </NavDropdown>
        )
      } else {
        // Otherwise, render a Nav.Link component
        return (
          <Nav.Link href={page.name} style={{
            borderBottom: `3px solid ${location.pathname === `/${page.name}` ? `#fff` : theme.primary}`
          }}>
            {page.name}
          </Nav.Link>
        )
      }
    })
  }

  return (
    <>
      <Navbar sticky="top"  expand="lg" >
        <Container className="mx-1">
          <Navbar.Brand href="#home">
            <img
              src={siteConfig.logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/">{siteConfig.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="Account" style={{
                borderBottom: `3px solid ${location.pathname === `/Account` ? `#fff` : theme.primary}`
              }}>Account</Nav.Link>
              {renderNavItems(siteConfig.pages.slice(1))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
