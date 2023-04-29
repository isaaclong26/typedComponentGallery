import React, { ReactElement, ReactNode, useEffect, useState, useRef } from 'react';
import { EloiseIntel, useEloise } from '../../App';
import {v4 as uuidv4} from "uuid";

export const EloiseWidget: React.FC<{ children: ReactElement<any> | ReactNode; eloiseIntel: EloiseIntel }> = ({
  children,
  eloiseIntel,
}) => {
  const { eloiseContent, setEloiseContent, logic } = useEloise();
  const [id, setId] = useState<string>(uuidv4());

  const [text, setText] = useState<string>();
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let test = logic.generic.extractTextFromComponent(children);

    if (test !== text) {
      setText(test);
    }
  }, [children]);

  useEffect(() => {
    const ots = {
      ...eloiseIntel,
      text: logic.generic.extractTextFromComponent(children),
      id,
    };

    // Add ots to eloiseContent when the component mounts
    setEloiseContent((prevContent:any) => [...prevContent, ots]);

    // Remove ots from eloiseContent when the component unmounts
    return () => {
      setEloiseContent((prevContent:any) =>
        prevContent.filter((intel: any) => intel.id !== ots.id)
      );
    };
  }, []);

  // Update text in eloiseContent when children prop changes
  useEffect(() => {
    if (!childRef.current) return;

    const newText = logic.generic.extractTextFromComponent(children);
    const position = childRef.current.getBoundingClientRect();

    setEloiseContent((prevEloiseContent: EloiseIntel[]) =>
      prevEloiseContent.map((intel: EloiseIntel) =>
        intel.id === id
          ? {
              ...intel,
              text: newText,
              position: {
                top: position.top,
                right: position.right,
                bottom: position.bottom,
                left: position.left,
              },
            }
          : intel
      )
    );
  }, [text, childRef]);

  return <div ref={childRef}>{children}</div>;
};
