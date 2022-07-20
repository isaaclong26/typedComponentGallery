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
    <div className="app container-fluid">
      <div className=" row">
        <div className="col-lg-3">
        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              console.log(test);
            }}
          >
            Click Me
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            secondary
            onClick={() => {
              console.log("PrimaryButton");
            }}
          >
            Right now
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input label="Username" onChange={inputHandler}></Input>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input secondary label="Username"></Input>
        </div>
        
        </div>
        <div className="col-lg-3">
        <div style={{ marginTop: "20px" }}>
          <Heading  size={5}>Sup</Heading>
          <Heading size={4}>Sup</Heading>
          <Heading size={3}>Sup</Heading>

          <Heading size={2}>Sup</Heading>

          <Heading size={1}>Sup</Heading>
        </div>
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
            <Input secondary label="password" />
          </div>    
          </div>



      </div>

        

    </div>
  );
}

export default App;
