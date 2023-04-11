import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Heading, useEloise, Input, MessageType, Loading } from "../../";
import { v4 as uuidv4 } from "uuid";

const EloiseChat: React.FC<{}> = ({}) => {
  const { logic, theme, siteConfig } = useEloise();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<MessageType>>([
    {
      text: siteConfig.eloiseConfig.initMessage,
      sender: "ai",
      type: "Text",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const chat = async (messages: Array<MessageType>) => {
    setIsLoading(true);
    let test = await logic.generic.apiCall(
      "chat",
      messages,
      siteConfig.eloiseConfig.endPoint
    );
    setMessages(test);
    setIsLoading(false);
  };

  const postChatLog = async () => {
    const uid = uuidv4();
    const test = await logic.fb.setUserDoc(
      siteConfig.eloiseConfig.chatLog + "/" + uid,
      messages
    );
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      chat(messages);
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      postChatLog();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() !== "") {
      setMessages([
        ...messages,
        {
          text: message,
          sender: "user",
          type: "Text",
        },
      ]);
      setMessage("");
    }
  };

  return (
    <Container
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
    </Container>
  );
};

export default EloiseChat;
