import React, { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useLocation } from "react-router";
import { EloisePage, EloiseWidget } from "../..";
import { useEloise } from "../../App";

const color = "103, 90, 128";

const Header: React.FC = () => {
  const { siteConfig, theme, logic } = useEloise();

  const location = useLocation();
  const [siteMode, setSiteMode] = useState<string>(siteConfig.defaultMode);

  useEffect(() => {
    const fetchSiteMode = async () => {
      let locTest = localStorage.getItem("siteMode");
      if (locTest) {
        setSiteMode(locTest);
      } else {
        let test = await logic.fb.docs.getUserDoc("");
        if (test && test.siteMode) {
          setSiteMode(test.siteMode);
          localStorage.setItem("siteMode", test.siteMode);
        }
      }
    };

    fetchSiteMode();
  }, []);

  const pages =
    typeof siteConfig.pages === "function"
      ? siteConfig.pages(siteMode)
      : siteConfig.pages;

  const renderNavItems = (pages: EloisePage[]) => {
    return pages.map((page) => {
      let pageUrl = page.url ?? page.name;
      if (page.pages) {
        // If the page has nested pages, render a NavDropdown component
        return (
          <EloiseWidget
            key={`headerlink${page.name}`}
            eloiseIntel={{
              title: "Header Dropdown",
              desc: "DropDown of Nav Options",
            }}>
            <NavDropdown
              title={page.name}
              id={page.name}>
              {renderNavItems(page.pages)}
            </NavDropdown>
          </EloiseWidget>
        );
      } else {
        // Otherwise, render a Nav.Link component
        return (
          <EloiseWidget
            key={`headerlink${page.name}`}
            eloiseIntel={{
              title: "Nav Link",
              desc: "Navigation Option",
              purpose: "navigate to " + "/" + page.name,
            }}>
            <Nav.Link
              href={"/" + pageUrl}
              style={{
                borderBottom: `3px solid ${
                  location.pathname === `/${pageUrl}` ? `#fff` : theme.colors[0]
                }`,
              }}>
              {page.name}
            </Nav.Link>
          </EloiseWidget>
        );
      }
    });
  };

  return (
    <EloiseWidget
      eloiseIntel={{ title: "Header", desc: "Navigation for Application" }}>
      <Navbar
        sticky="top"
        expand="lg"
        bg={siteConfig.headerTrans ? "" : "white"}>
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
              {renderNavItems(
                pages.slice(1).filter((page: EloisePage) => !page.hidden)
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </EloiseWidget>
  );
};

export default Header;
