import React, {useState, useRef, useEffect, useContext} from "react"
import { interaction } from "../../functions/eloise"
import { ChatDiv, ChatMessage } from "../../styled"
import {v4 as uuidv4} from "uuid"
import { Loading } from ".."



const Chat = (props:{convo:interaction[], loading:boolean})=>{


const bottomRef = useRef<HTMLInputElement>(null);

const [loading, setLoading] = useState<boolean>(props.loading)
useEffect(()=>{

  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

},[loading])


  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

return (
    <ChatDiv>
    {props.convo.map((x: interaction) => (
      <ChatMessage key={uuidv4()} message={x} />
    ))}

    {props.loading && <Loading />}

    <div ref={bottomRef} style={{ marginTop: "10vh" }}>
      {" "}
    </div>
  </ChatDiv>
)
}

export {Chat}