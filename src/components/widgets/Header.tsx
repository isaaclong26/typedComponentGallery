import React, { useState, useEffect } from "react"
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { useEloise } from "../../App"
import { EloisePage, EloiseWidget } from "../.."
import { useLocation } from "react-router"
import {v4 as uuidv4} from "uuid"

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
          <EloiseWidget   key={`headerlink${page.name}`} eloiseIntel={{title: "Header Dropdown", desc: "DropDown of Nav Options"}}>
          <NavDropdown  title={page.name} id={page.name}>
            {renderNavItems(page.pages)}
          </NavDropdown>
          </EloiseWidget>
        )
      } else {
        // Otherwise, render a Nav.Link component
        return (
          <EloiseWidget  key={`headerlink${page.name}`} eloiseIntel={{title: "Nav Link", desc: "Navigation Option", purpose: "navigate to "+ "/"+page.name }}>
          <Nav.Link  href={"/"+page.name} style={{
            borderBottom: `3px solid ${location.pathname === `/${page.name}` ? `#fff` : theme.primary}`
          }}>
            {page.name}
          </Nav.Link>
          </EloiseWidget>
        )
      }
    })
  }

  return (
    <EloiseWidget eloiseIntel={{title: "Header", desc: "Navigation for Application"}}>
      <Navbar sticky="top"  expand="lg" bg={siteConfig.headerTrans? "" : "white"}>
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
           
              {renderNavItems(siteConfig.pages.slice(1).filter((page:EloisePage)=> !page.hidden))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </EloiseWidget>
  )
}

export default Header
