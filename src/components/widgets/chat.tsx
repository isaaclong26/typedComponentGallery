import React, { useState, useEffect, useRef } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import firebase from "firebase/firestore";
import {v4 as uuidv4} from "uuid"
import {
  ChatContainer,
  MessagesContainer,
  MessageWrapper,
  MessageSender,
  MessageContent,
  InputContainer,
  StyledHole,
} from "../styles/chatStyles"
import { useEloise } from "../..";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { EloiseIntel } from "../../App";

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

const Chat: React.FC<{convo: Convo, back:Function ; holeCoords: { top: number; right: number; bottom: number; left: number }; setHoleCoords: (coords: { top: number; right: number; bottom: number; left: number }) => void } > = ({convo, back, holeCoords, setHoleCoords}) => {
  
  const {logic, siteConfig, theme, eloiseContent} = useEloise()
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
 
  const squareSize = 100;

  const targetCoords = {
    top: (window.innerHeight - squareSize) / 2,
    right: (window.innerWidth + squareSize) / 2,
    bottom: (window.innerHeight + squareSize) / 2,
    left: (window.innerWidth - squareSize) / 2,
  };

 

  logic.hooks.useAsyncEffect(async()=>{
    let test2 = await logic.fb.getUserCollection("convos/"+ convo.id+"/messages")
    let ots = test2.map((message:any)=> message.data)
    setMessages(ots)

  },[])
  
  function formatEloiseIntelData(data: EloiseIntel[], message:string): string {
    const formattedData = data.map((item) => {
      const { id, position, ...rest } = item;
      const lines = ` \n\n ${Object.entries(rest)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}`;
      return lines;
    });
    let semi = formattedData.join('\n\n');

    return `Content on Page: ${semi} \n\n message: ${message}`;
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async(e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;


    if(convo.id === "eloise"){
      let prompt = formatEloiseIntelData(eloiseContent, input)
      console.log(prompt)

      let test = await logic.apiCall(siteConfig.eloiseConfig.endPoint, [{role:"user", content: prompt}])

      console.log(test)
    }
  
    // Replace with the current user's ID
    const test = logic.fb.getAuthenticatedUserUid();
    let newId = uuidv4()

    logic.fb.setUserDoc("convos/"+convo.id + "/messages/"+ newId, {
      content: input,
      senderId:test,
    });

    if(convo.id !== "eloise"){

    logic.fb.setOtherUserDoc("convos/"+convo.id + "/messages/"+ newId,  {
        content: input,
        senderId:test,
      }, convo.connectedTo);
    }
  
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
