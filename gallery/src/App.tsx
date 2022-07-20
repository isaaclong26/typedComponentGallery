import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/button";
import Input from "./components/input";
import Heading from "./components/heading";
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from "./theme";
function App() {
  const [test, setTest] = useState("");

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setTest(enteredName);
  };

  return (
    <div className="app container-fluid" style={{backgroundColor: theme.white, height: "100vh"}}>
      <div className=" row">
        <div className="col-lg-3">
        <Button primary margin="20px">Click Me</Button>
        <Button secondary margin="20px">Click Me</Button>
        <div style={{backgroundColor: theme.primary}}>
        <Button primary inverse margin="20px">Click Me</Button>
        <Button secondary inverse margin="20px">Click Me</Button>
        </div>
    
        </div>

        <div className="col-lg-3">
          <Input label="Username" margin="20px"></Input>
          <Input  secondary label="Username"  margin="20px"></Input>

        </div>

        {/*  Headers  */}
        <div className="col-lg-3">
          <Heading  size={5}>Sup</Heading>
          <Heading size={4}>Sup</Heading>
          <Heading size={3}>Sup</Heading>

          <Heading size={2}>Sup</Heading>

          <Heading size={1}>Sup</Heading>
        </div>
        <div className="col-lg-3" >
          <div
          className="container text-center"
          style={{
            // border: `solid 3px ${theme.primary}`,
            borderRadius: "8px",
            backgroundColor: theme.secondary

            }}>
          <Heading size={3} white>Login</Heading>
            <Input secondary label="Username" />
            <Input secondary label="Password" />
            <div className="row">
              <Button  inverse posClassName="col-lg-6" margin="20px ">Log in</Button>
              <Button posClassName="col-lg-6" margin="20px ">Sign up</Button>
            </div>
            

          </div>    
          </div>



      </div>

        

    </div>
  );
}

export default App;
