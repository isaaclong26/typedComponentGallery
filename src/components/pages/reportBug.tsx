import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiBugOutline } from "@mdi/js";

import dog from "../../assets/dog.png";
import { Row, Col } from "react-bootstrap";
import {
  Heading,
  View,
  Button,
  useEloise,
  EloisePage,
  DropDown,
  LargeTextInput,
} from "typed-component-gallery";
import { useNavigate } from "react-router";

export const ReportBug: React.FC = () => {
  const { siteConfig, theme } = useEloise();

  const [desc, setDesc] = useState<string>("Description");
  const [message, setMessage] = useState<string>("Message");
  const [page, setPage] = useState<string>();

  const pageOptions = siteConfig.pages.map((page: EloisePage) => {
    if (page.name === "/") return "Home";

    return page.name;
  });

  const bugReporting: boolean = true; //todo replace with siteConfig field
  const navigate = useNavigate();

  return (
    <div>
      <Row>
        <Col
          className="mx-auto"
          lg={7}
          style={{ border: `3px solid ${theme.primary}`, borderRadius: "5px" }}
        >
          <Row>
            <Heading size={4} color="black">
              Report a Bug
            </Heading>
            <Heading
              size={1}
              style={{
                borderBottom: `2px solid ${theme.primary}`,
                borderRadius: 0,
              }}
              color="black"
            >
              Answer a few questions about the bug you experienced. We really
              appreciate it!
            </Heading>
          </Row>
          <Row className="mt-3">
            <Col lg={8}>
              <Row className="my-3">
                <Col lg={8}>
                  <Heading size={1} align="left" color="black">
                    Where did this bug occur?
                  </Heading>
                </Col>

                <Col lg={4}>
                  <DropDown
                    color="black"
                    state={page}
                    setState={setPage}
                    options={pageOptions}
                    label="Page"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Heading size={1} align="left" color="black">
                    What happened exactly?
                  </Heading>
                </Col>
              </Row>
              <Row>
                <LargeTextInput state={desc} setState={setDesc} />
              </Row>
            </Col>
            <Col lg={4} className="text-center">
              <View>
                <Icon color={theme.primary} path={mdiBugOutline} size={6} />
              </View>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Heading size={1} align="left" color="black">
                Anything else you want to tell the Dev team?
              </Heading>
            </Col>
          </Row>
          <Row>
            <LargeTextInput state={message} setState={setMessage} />
          </Row>
          <Row>
            <Col lg={4} className="mx-auto mb-3">
                <Button >Submit</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
