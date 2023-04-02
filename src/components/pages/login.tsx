import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';

import { Input, Button, Loading } from "../blocks";

import {  signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Logic } from '../../functions';
import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';

const errorHandler = async (e: any) => {

}; const logic = new Logic(errorHandler, errorHandler, errorHandler)


const Login = (props:{}) => {


  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>("Bad");

  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const [errors, setErrors] = useState<string[]>([]);
 
  const navigate = useNavigate()

  const [user, loading, error] = useAuthState(logic.fb.auth);

  const login = async (email: string, password: string) => {
    const test = await signInWithEmailAndPassword(logic.fb.auth, email, password);

    console.log(test)
  };


  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user])

  const submit = () => {
    // setLoading(true);


      if(email && password){

       login(email, password)
      }
   


      // const userData: { [key: string]: string } = {
      //   email: email ? email : "email",
      //   password: password ? password : "password",
      // };
    
      // axios
      //   .post(
      //     `${logic.api}/login`,
      //     //  "http://127.0.0.1:5001/eloiselife-c5cf6/us-central1/api/login",

      //     userData
      //   )
      //   .then((response: any) => {
      //     localStorage.setItem("AuthToken", `Bearer ${response.data.auth}`);
      //     localStorage.setItem("refreshToken", response.data.refresh);

      //     localStorage.setItem("email", userData.email);

      //     if(props.next){
      //       props.next(`Bearer ${response.data.token}`)
      //     }

      //   })
      //   .catch((error: any) => {
      //     setErrors([...errors, error]);
      //   });

  };






  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: Function
  ) => {
    const enteredName = event.target.value;
    setter(enteredName);
  };






  return (
    < Container className='fluid'>

      <Row >
        <Col lg={5}>
      {email && password ? (
        <>
            <Button
              borderRadius
              posClassName="col-lg-6 mx-auto"
              
              onClick={() => submit()}
            >
              Log in
            </Button>
          
        </>
      ) : (
        <>
          <Button
            noHover
            borderRadius
            posClassName="col-lg-6 mx-auto"
            fontSize="2.3rem"
            padding="0"
            transparent
            style={{
              marginBottom: ".5rem",
            }}
          >
            Log in
          </Button>
        </>
      )}

      {loading ? (
        <div >
          <Loading></Loading>
        </div>
      ) : (
        <>
          <Input
            backgroundColor="transparent"
            primary
            className="text-center"
            posClassName="col-lg-9 mx-auto my-3"
            label="Email"
            onChange={(e: any) => {
              inputHandler(e, setEmail);
            }}
          />
          <Input
            backgroundColor="transparent"
            primary
            type="password"
            className="text-center"
            posClassName="col-lg-9 mx-auto my-3 "
            label="Password"
            onChange={(e: any) => {
              inputHandler(e, setPassword);
            }}
          />
          <p className="text-center">
            Don't Have an Account?{" "}
            <a href="https:://eloise.life">
              <strong>Sign Up</strong>
            </a>
          </p>
        </>
      )}
      </Col>

      <Col lg={7}>


      </Col>
    </Row>
    </Container>
  );
}





export default Login;