import React, { useState, useEffect, useRef } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import firebase from "firebase/firestore";
import {
  ChatContainer,
  MessagesContainer,
  MessageWrapper,
  MessageSender,
  MessageContent,
  InputContainer,
} from "../styles/chatStyles"
import { useEloise } from "../..";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

type Message = {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date; // Change this line
  };
  
export interface Convo{
    id:string,
    connectedTo: string;
    connectedName: string;

}

const Chat: React.FC<{convo: Convo, back:Function}> = ({convo, back}) => {
  
  const {logic, siteConfig, theme, eloiseContent} = useEloise()
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
 

  logic.hooks.useAsyncEffect(async()=>{
    let test2 = await logic.fb.getUserCollection("convos/"+ convo.id+"/messages")
    let ots = test2.map((message:any)=> message.data)
    setMessages(ots)

  },[])
  

     useEffect(()=>{
          console.log(eloiseContent)
              
      },[eloiseContent])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
  
    // Replace with the current user's ID
    const test = logic.fb.getAuthenticatedUserUid();

    logic.fb.setUserDoc("convos/"+convo.id + "/messages", {
      content: input,
      senderId:test,
      timestamp: logic.fb.db.FieldValue.serverTimestamp(), // Change this line
    });

    logic.fb.setOtherUserDoc("convos/"+convo.id + "/messages", {
        content: input,
        senderId:test,
        timestamp: logic.fb.db.FieldValue.serverTimestamp(), // Change this line
      }, convo.connectedTo);
  
    setInput("");
  };
  return (
    <ChatContainer>
      <div style={{
        position: "absolute",
        top: '10px',
        left: '10px',
      }}
      onClick={()=>back()}
      >
      <Icon path={mdiArrowLeft} size={1} color={theme.primary} />
      </div>
      {messages &&
      <MessagesContainer>
        {messages.map((message) => (
          <MessageWrapper key={message.id}>
            <MessageContent>{message.content}</MessageContent>
          </MessageWrapper>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
    }
      <InputContainer>
        <Form onSubmit={handleSendMessage}>
          <Form.Group className="d-flex">
            <FormControl
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button type="submit" className="ml-2">
              Send
            </Button>
          </Form.Group>
        </Form>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;
