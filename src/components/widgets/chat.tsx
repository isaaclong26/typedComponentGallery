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

type Message = {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date; // Change this line
  };
  
export interface Convo{
    id:string,
    connectedTo: string;

}

const Chat: React.FC<{convo: Convo}> = ({convo}) => {
  
  const {logic, siteConfig} = useEloise()
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const test = logic.fb.getAuthenticatedUserUid();

    const unsubscribe = logic.fb.db
      .collection("users/" + test + "/"+ siteConfig.id + "/Main/convos/"+convo.id + "/messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot:any) => {
        const newMessages: Message[] = snapshot.docs.map((doc:any) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, []);

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
    const senderId = "currentUserId";
    const test = logic.fb.getAuthenticatedUserUid();

    logic.fb.db.collection("users/" + test + "/"+ siteConfig.id + "/Main/convos/"+convo.id + "/messages").add({
      content: input,
      senderId,
      timestamp: logic.fb.db.FieldValue.serverTimestamp(), // Change this line
    });

    logic.fb.db.collection("users/" + convo.connectedTo + "/"+ siteConfig.id + "/Main/convos/"+convo.id + "/messages").add({
        content: input,
        senderId,
        timestamp: logic.fb.db.FieldValue.serverTimestamp(), // Change this line
      });
  
    setInput("");
  };
  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageWrapper key={message.id}>
            <MessageSender>{message.senderId}: </MessageSender>
            <MessageContent>{message.content}</MessageContent>
          </MessageWrapper>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
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
