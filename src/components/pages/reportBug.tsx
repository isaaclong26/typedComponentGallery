import { mdiBugOutline } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import {
  Button,
  DropDown,
  EloisePage,
  Heading,
  LargeTextInput,
  View,
  useEloise,
} from "../..";

export const ReportBug: React.FC = () => {
  const { siteConfig, theme, logic } = useEloise();

  const [desc, setDesc] = useState<string>("Description");
  const [message, setMessage] = useState<string>("Message");
  const [page, setPage] = useState<string>();
  const [siteMode, setSiteMode] = useState<string>(siteConfig.defaultMode);

  logic.hooks.useAsyncEffect(async () => {
    let locTest = logic.hooks.useLocalStorage("siteMode");
    if (locTest) {
      setSiteMode(locTest);
    }

    if (!locTest) {
      let test = await logic.fb.docs.getUserDoc("");
      if (test && test.siteMode) {
        setSiteMode(test.siteMode);
        localStorage.setItem("siteMode", test.siteMode);
      }
    }
  });
  const pages =
    typeof siteConfig.pages === "function"
      ? siteConfig.pages(siteMode)
      : siteConfig.pages;

  const pageOptions = pages.map((page: EloisePage) => {
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
          style={{
            border: `3px solid ${theme.colors[0]}`,
            borderRadius: "5px",
          }}>
          <Row>
            <Heading size={4}>Report a Bug</Heading>
            <Heading
              size={1}
              style={{
                borderBottom: `2px solid ${theme.colors[0]}`,
                borderRadius: 0,
              }}>
              Answer a few questions about the bug you experienced. We really
              appreciate it!
            </Heading>
          </Row>
          <Row className="mt-3">
            <Col lg={8}>
              <Row className="my-3">
                <Col lg={8}>
                  <Heading
                    size={1}
                    align="left">
                    Where did this bug occur?
                  </Heading>
                </Col>

                <Col lg={4}>
                  <DropDown
                    state={page}
                    setState={setPage}
                    options={pageOptions}
                    label="Page"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Heading
                    size={1}
                    align="left">
                    What happened exactly?
                  </Heading>
                </Col>
              </Row>
              <Row>
                <LargeTextInput
                  state={desc}
                  setState={setDesc}
                />
              </Row>
            </Col>
            <Col
              lg={4}
              className="text-center">
              <View>
                <Icon
                  color={theme.colors[0]}
                  path={mdiBugOutline}
                  size={6}
                />
              </View>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Heading
                size={1}
                align="left">
                Anything else you want to tell the Dev team?
              </Heading>
            </Col>
          </Row>
          <Row>
            <LargeTextInput
              state={message}
              setState={setMessage}
            />
          </Row>
          <Row>
            <Col
              lg={4}
              className="mx-auto mb-3">
              <Button>Submit</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
