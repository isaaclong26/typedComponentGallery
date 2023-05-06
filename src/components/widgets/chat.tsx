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
  userMessageStyle,
  otherMessageStyle,
} from "../styles/chatStyles"
import { useEloise } from "../..";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { EloiseIntel } from "../../App";

type Message = {
    id: string;
    content: string;
    senderId: string;
  };
  
type GptMessage ={
  role:"user"| "system"| "assistant";
  content: string
}

export interface Convo{
    id:string,
    connectedTo: string;
    connectedName: string;

}

const Chat: React.FC<{convo: Convo, back:Function ; holeCoords: { top: number; right: number; bottom: number; left: number }; setHoleCoords: (coords: { top: number; right: number; bottom: number; left: number }) => void } > = ({convo, back, holeCoords, setHoleCoords}) => {
  
  const [eloiseTyping, setEloiseTyping] = useState(false);

  const {logic, siteConfig, theme, eloiseContent} = useEloise()
  const [messages, setMessages] = useState<Message[] | GptMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uid, setUID] = useState<string>(logic.fb.getAuthenticatedUserUid())
 
  const squareSize = 100;

  const targetCoords = {
    top: (window.innerHeight - squareSize) / 2,
    right: (window.innerWidth + squareSize) / 2,
    bottom: (window.innerHeight + squareSize) / 2,
    left: (window.innerWidth - squareSize) / 2,
  };

 

  logic.hooks.useAsyncEffect(async()=>{
    if(convo.id === "eloise"){
      setMessages([{role:"assistant", content: "Hi how can I help?"}])
    }
    else{
    let test2 = await logic.fb.getUserCollection("convos/"+ convo.id+"/messages")
    let ots = test2.map((message:any)=> message.data)
    setMessages(ots)
    }

  },[])
  
  function formatEloiseIntelData(data: EloiseIntel[]): string {
    const formattedData = data.map((item) => {
      const { id, position, ...rest } = item;
      const lines = ` \n\n ${Object.entries(rest)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}`;
      return lines;
    });
    let semi = formattedData.join('\n\n');

    return `Content on Page: ${semi}`;
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async(e: React.FormEvent) => {
    setInput("");

    e.preventDefault();
    if (input.trim() === "") return;

    let testUid
        if(!uid){
        testUid = logic.fb.getAuthenticatedUserUid()
          setUID(testUid)
        }
        else{
          testUid = uid
        }
    if(convo.id === "eloise"){
      setMessages([...messages  as Array<GptMessage>, {role:'user', content:input}])
      setEloiseTyping(true); // Eloise is typing

      let prompt = formatEloiseIntelData(eloiseContent)
    
      let test = await logic.apiCall("siteChat", {
      convo: [
        ...messages,
       { role: "user", content: prompt },
        { role: "user", content: input }
      ]  }
         ,siteConfig.eloiseConfig.endPoint)

      setMessages([...messages as Array<GptMessage>,  {role:'user', content:input}, test])
      setEloiseTyping(false)
    }
  
    // Replace with the current user's ID
    let newId = uuidv4()

    logic.fb.setUserDoc("convos/"+convo.id + "/messages/"+ newId, {
      content: input,
      senderId:testUid,
    });

    if(convo.id !== "eloise"){

      let newMessage: Message = {content: input, senderId:testUid, id:newId}
       setMessages([...messages as Message[], newMessage ]);

    logic.fb.setOtherUserDoc("convos/"+convo.id + "/messages/"+ newId,  {
        content: input,
        senderId:testUid,
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
       {messages &&
  <MessagesContainer>
    {messages.map((message: GptMessage | Message) => {
            const isUserMessage =
            "senderId" in message
              ? message.senderId === uid
              : message.role === "user";
     
      const messageStyle = isUserMessage ? userMessageStyle : otherMessageStyle;

      return (
        <MessageWrapper key={uuidv4()} style={messageStyle}>
          <MessageContent>{message.content}</MessageContent>
        </MessageWrapper>
      );
    })}
        {eloiseTyping && convo.id === "eloise" && <TypingIndicator />}

    <div ref={messagesEndRef} />
  </MessagesContainer>
}

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

const TypingIndicator: React.FC = () => {
  const typingDotStyle: React.CSSProperties = {
    backgroundColor: "#000",
    borderRadius: "50%",
    width: "6px",
    height: "6px",
    margin: "0 2px",
    animationName: "typing",
    animationDuration: "1.2s",
    animationIterationCount: "infinite",
    animationFillMode: "both",
  };

  const typingDot1Style: React.CSSProperties = {
    ...typingDotStyle,
    animationDelay: "0s",
  };

  const typingDot2Style: React.CSSProperties = {
    ...typingDotStyle,
    animationDelay: "0.2s",
  };

  const typingDot3Style: React.CSSProperties = {
    ...typingDotStyle,
    animationDelay: "0.4s",
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "8px" }}>
      <div style={typingDot1Style} />
      <div style={typingDot2Style} />
      <div style={typingDot3Style} />
    </div>
  );
};


