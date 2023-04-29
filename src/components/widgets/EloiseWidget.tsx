import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { EloiseIntel, useEloise } from '../../App';
import {v4 as uuidv4} from "uuid"



export const EloiseWidget: React.FC<{ children: ReactElement<any>; eloiseIntel: EloiseIntel }> = ({
  children,
  eloiseIntel,
}) => {
  const { eloiseContent, setEloiseContent, logic } = useEloise();
  const [id, setId] = useState<string>(uuidv4());

  const [text, setText] = useState<string>()

  useEffect(()=>{

    let test = logic.generic.extractTextFromComponent(children)

    if(test !== text){
        setText(test)
    }

  },[children])

  useEffect(() => {
    const ots = {
      ...eloiseIntel,
      text: logic.generic.extractTextFromComponent(children),
      id,
    };

    // Add ots to eloiseContent when the component mounts
    setEloiseContent([...eloiseContent, ots]);

    // Remove ots from eloiseContent when the component unmounts
    return () => {
      setEloiseContent(eloiseContent.filter((intel:any) => intel.id !== ots.id));
    };
  }, []);

  // Update text in eloiseContent when children prop changes
  useEffect(() => {
    const newText = logic.generic.extractTextFromComponent(children);
    
    setEloiseContent((prevEloiseContent: EloiseIntel[]) => // Add the EloiseIntel[] type here
    prevEloiseContent.map((intel: EloiseIntel) =>
      intel.id === id ? { ...intel, text: newText } : intel
    )
  
  );
  }, [text]);

  return children;
};
