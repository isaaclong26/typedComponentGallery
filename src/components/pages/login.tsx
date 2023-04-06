import React, { useState, useEffect, useContext, useRef } from 'react';
import { Input, Button, Loading, useEloise, Heading } from "../../";
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';
import { Icon } from "@mdi/react";
import { mdiAccountCircleOutline } from '@mdi/js';

const Login = (props: {}) => {
  const { theme, logic, siteConfig } = useEloise();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginError, setLoginError] = useState<string | null>(null); // State to store login error message

  const [user, loading, error] = useAuthState(logic.fb.auth);

  const login = async (email: string, password: string) => {
    try {
      const test = await signInWithEmailAndPassword(logic.fb.auth, email, password);
      console.log(test);
      setLoginError(null); // Clear login error message on successful login
    } catch (error: any) {
      setLoginError(error.message); // Set login error message on failed login
    }
  };

  // Configure the Google sign-in provider
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()

  // Handle Google sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(logic.fb.auth, provider);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      setLoginError(null); // Clear login error message on successful login
    } catch (error: any) {
      setLoginError(error.message); // Set login error message on failed login
    }
  };

  return (
    <Container className='fluid' style={{ position: "relative", paddingTop: '90px' }}>
      <Heading primary size={4} style={{ fontStyle: 'italic', position: 'absolute', top: '20px', left: '20px' }}>Login</Heading>
      <img
        src={siteConfig.logo}
        width="50px"
        style={{ position: 'absolute', top: '20px', right: '20px' }}
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <Row className='mt-5'>
        <Col lg={7} className="mx-auto text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Icon color="#6f73d2" size='10vw' path={mdiAccountCircleOutline} />
        </Col>
      </Row>

      {user ?
        <>
          <Row className="mt-2">

            <Col lg={9} className="mx-auto text-center">
              <Row className="mt-2">

                <Heading size={3}>{`Logged in as ${logic.fb.auth.currentUser.email}`}</Heading>
              </Row>
              <Row className="mt-2">

                <Button rounded onClick={() => navigate("/account")}>Manage Account</Button>
              </Row>

              <Row className="mt-2">

                <Button rounded onClick={() => signOut(logic.fb.auth)}>Log Out</Button>
              </Row>

            </Col>
          </Row>


        </>
        :
        <>
          {loading ? <Loading /> : <>
            <Row className="mt-5">
              <Col lg={9} className="mx-auto text-center">
                <Input extLabel state={email} setState={setEmail} label="Email"></Input>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={9} className="mx-auto text-center">
                <Input extLabel state={password} type="password" setState={setPassword} label="Password"></Input>
              </Col>
            </Row>
            <Row className="mt-2">

              <Col lg={9} className="mx-auto text-center">
                {email && password && <Button rounded onClick={() => login(email!, password!)}>Login</Button>}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={9} className="mx-auto text-center">
                <Button rounded onClick={signInWithGoogle}>Sign in with Google</Button>
              </Col>
            </Row>
            {/* Display login error message */}
            {loginError && (
              <Row className="mt-2">
                <Col lg={9} className="mx-auto text-center">
                  <div style={{ color: 'red' }}>{loginError}</div>
                </Col>
              </Row>
            )}
          </>}
        </>
      }


    </Container>
  );
};
export default Login;