import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Heading, useEloise, Input, MessageType, Loading } from "../../";
import { v4 as uuidv4 } from "uuid";
import Chat, { Convo } from "./chat";
import { ConvoList } from "./convoList";

const EloiseChat: React.FC<{}> = ({}) => {
  const { logic, theme, siteConfig } = useEloise();

  const [selectedConvo, setSelectedConvo]= useState<Convo>()
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<MessageType>>([
    {
      text: siteConfig.eloiseConfig.initMessage,
      sender: "ai",
      type: "Text",
    },
  ]);




 
 if(selectedConvo){
  return <Chat convo={selectedConvo} back={()=>setSelectedConvo(undefined)}/>
 }
 else{
  return <ConvoList select={setSelectedConvo}/>
 }
};

export default EloiseChat;

{/* <Container
className="position-relative container-fluid d-flex flex-column justify-content-between"
style={{ height: "100%" }}
>
<div className="overflow-auto mb-3">
  {messages.map((msg, index) => (
    <div key={index} className={`text-${msg.sender === "ai" ? "start" : "end"}`}>
      {msg.type === "Custom" && msg.component ? (
        <msg.component data={msg.data} />
      ) : (
        <p>{msg.text}</p>
      )}
    </div>
  ))}
  {isLoading && <Loading />}
</div>
<form onSubmit={handleSubmit}>
  <Row className="align-items-center w-100 mx-auto" style={{ marginBottom: "10px" }}>
    <div className="col-10 col-md-8 col-lg-12 mx-auto">
      <Input state={message} setState={setMessage} label="ask me anything" />
    </div>
  </Row>
</form>
</Container> */}