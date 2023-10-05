import { mdiAccountCircleOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Button, Heading, Input, useEloise } from "../../";

const SignUp = () => {
  const { theme, logic, siteConfig } = useEloise();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [signupError, setSignupError] = useState<string | null>(null); // State to store signup error message

  const navigate = useNavigate();

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(logic.fb.auth, email, password);
      setSignupError(null); // Clear signup error message on successful registration
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      setSignupError(error.message); // Set signup error message on failed registration
    }
  };

  // Configure the Google sign-in provider
  const provider = new GoogleAuthProvider();

  // Handle Google sign-in
  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(logic.fb.auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      setSignupError(null); // Clear signup error message on successful registration
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      setSignupError(error.message); // Set signup error message on failed registration
    }
  };

  return (
    <Container
      className="fluid"
      style={{ position: "relative", paddingTop: "90px" }}>
      <Heading
        color={theme.colors[0]}
        size={4}
        style={{
          fontStyle: "italic",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}>
        Sign Up
      </Heading>
      <img
        src={siteConfig.logo}
        width="50px"
        style={{ position: "absolute", top: "20px", right: "20px" }}
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <Row className="mt-5">
        <Col
          lg={7}
          className="mx-auto text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Icon
            color="#6f73d2"
            size="10vw"
            path={mdiAccountCircleOutline}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col
          lg={9}
          className="mx-auto text-center">
          <Input
            extLabel
            state={email}
            setState={setEmail}
            label="Email"></Input>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col
          lg={9}
          className="mx-auto text-center">
          <Input
            extLabel
            state={password}
            type="password"
            setState={setPassword}
            label="Password"></Input>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col
          lg={9}
          className="mx-auto text-center">
          {email && password && (
            <Button
              rounded
              onClick={() => signUp(email!, password!)}>
              Sign Up
            </Button>
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col
          lg={9}
          className="mx-auto text-center">
          <Button
            rounded
            onClick={signUpWithGoogle}>
            Sign up with Google
          </Button>
        </Col>
      </Row>
      {/* Display signup error message */}
      {signupError && (
        <Row className="mt-2">
          <Col
            lg={9}
            className="mx-auto text-center">
            <div style={{ color: "red" }}>{signupError}</div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default SignUp;
