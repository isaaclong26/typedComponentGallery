import React from "react";

import dog from "../../assets/dog.png";

import { Row, Col } from "react-bootstrap";
import { Heading, View, Button, useEloise } from "../..";
import { useNavigate } from "react-router";

export const Other: React.FC = () => {
  const { siteConfig } = useEloise();

  const bugReporting: boolean = true; //todo replace with siteConfig field
  const navigate = useNavigate();

  return (
    <div>
      <Row>
        <Col lg={6} className="mx-auto mt-4">
          <View style={{ flexDirection: "column" }}>
            <Heading color="black" size={4}>
              Something went wrong...
            </Heading>
            <Heading color="black" size={4}>
              You weren't supposed to see this.
            </Heading>
          </View>
          <div className="mt-3 row">
            <Col lg={5} className="mx-auto">
              <Button onClick={() => navigate("/")}>Return Home</Button>
            </Col>
            {bugReporting && (
              <Col lg={5} className="mx-auto">
                <Button onClick={() => navigate("/report-bug")}>Report Bug</Button>
              </Col>
            )}
          </div>
        </Col>
      </Row>
      <Row
        className="mx-auto"
        style={{ position: "fixed", bottom: "0", width: "100%" }}
      >
        <Col lg={6} className="mx-auto text-center">
          <img src={String(dog)} height="200" />
        </Col>
      </Row>
    </div>
  );
};
