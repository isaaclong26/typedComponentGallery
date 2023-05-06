import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Heading, useEloise, Input, MessageType, Loading } from "../../";
import { v4 as uuidv4 } from "uuid";
import Chat, { Convo } from "./chat";
import { ConvoList } from "./convoList";

const EloiseChat: React.FC<{
  holeCoords: { top: number; right: number; bottom: number; left: number };
  setHoleCoords: (coords: { top: number; right: number; bottom: number; left: number }) => void;
}> = ({ holeCoords, setHoleCoords }) => {
  const { logic, theme, siteConfig } = useEloise();

  const [selectedConvo, setSelectedConvo] = useState<Convo>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<MessageType>>([
    {
      text: siteConfig.eloiseConfig.initMessage,
      sender: "ai",
      type: "Text",
    },
  ]);

  // Retrieve selectedConvo from localStorage on component mount
  useEffect(() => {
    const storedSelectedConvo = localStorage.getItem("selectedConvo");
    if (storedSelectedConvo) {
      setSelectedConvo(JSON.parse(storedSelectedConvo));
    }
  }, []);

  const handleConvoSelection = (convo: Convo) => {
    setSelectedConvo(convo);
    localStorage.setItem("selectedConvo", JSON.stringify(convo));
  };

  if (selectedConvo) {
    return (
      <Chat
        convo={selectedConvo}
        holeCoords={holeCoords}
        setHoleCoords={setHoleCoords}
        back={() => {
          setSelectedConvo(undefined);
          localStorage.removeItem("selectedConvo");
        }}
      />
    );
  } else {
    return <ConvoList select={handleConvoSelection} />;
  }
};

export default EloiseChat;
