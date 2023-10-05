import React, { Col, Row } from "react-bootstrap";
import { Button, EloiseWidget, useEloise } from "../..";

export const Display = () => {
  const { theme, logic, siteConfig } = useEloise();

  logic.hooks.useAysncEffect(async () => {
    console.log(theme);
  }, []);
  return (
    <EloiseWidget
      eloiseIntel={{
        purpose: "User Dashboard Shows 'at a glance' data",
        title: "Dashboard",
        desc: "User Dashboard shows, listings, offers and transaction counts",
      }}>
      <Row>
        <Col
          lg={11}
          className="mx-auto">
          <Button>Display</Button>
        </Col>
      </Row>
    </EloiseWidget>
  );
};
