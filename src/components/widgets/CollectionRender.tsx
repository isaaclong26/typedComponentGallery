import React, { useEffect, useState } from "react";
import { CardListProps, DBCards } from "./DBCards";
import {DBTable, DBTableProps} from "./DBTable";
import { Col, Row } from "react-bootstrap";
import { Heading, useEloise, Button, EloiseWidget } from "../..";
import Icon from "@mdi/react";
import { mdiCards, mdiTable, mdiCalendar } from "@mdi/js";
import { EloiseIntel } from "../../App";
import CalendarComponent from "./calendar";



export const CollectionRender:React.FC<{
    path:string,
    tableProps?: DBTableProps
    cardProps?: CardListProps,
    intel?: EloiseIntel,
    views: Array<"table"|"cards"| "calendar"> | "auto",
    Empty?: React.ComponentType // added this line
}> = ({path, tableProps, cardProps, intel, views, Empty})=>{
    const {theme} = useEloise()
    const [mode, setMode] = useState<"table"|"cards"| "calendar">("table")
    const {logic} = useEloise()

    const [vtu, setVtu] = useState<Array<"table"|"cards"| "calendar">>([])
    const [docs, setDocs] = useState<any>() // added this line

    logic.hooks.useAsyncEffect(async()=>{
        if(views !== "auto"){
            setVtu(views)
        } else {
            let test = await logic.fb.docs.getUserCollection(path)
            setDocs(test) // added this line
            if(test){
                let dtu = test[0]
                setVtu(determineDisplayType(dtu))
            }
        }
    },[])

    const cts = ()=>{
        if(docs && docs.length === 0 && Empty) { // added this line
            return <Empty />;
        } else if(mode === "table"){
            return <DBTable path={path} { ...tableProps}/>
        } else if(mode === "calendar"){
            return <CalendarComponent path={path} onNew={()=>{}} />
        } else {
            return <DBCards path={path} {...cardProps} />
        }
    }

    return(
        <EloiseWidget eloiseIntel={{...intel}}>
            <>
         <Row className="my-3">
        <Col lg={2}>
            <Heading  align="left" size={3}>{logic.generic.capitalize(path)}</Heading>

         </Col>
         <Col lg={2} className="row">
             {mode !== "table" && views.includes("table") &&  
                <div  onClick={()=>setMode("table")} className="col">
                     <Icon path={mdiTable} color={theme.primary} size={1.5}/>
                </div>
                }
             {mode !== "cards"  && views.includes("cards")&&   
                <div  onClick={()=>setMode("cards")} className="col">
                     <Icon path={mdiCards} color={theme.primary} size={1.5}/>
                </div>
                }
                {mode !== "calendar"  && views.includes("calendar")&&   
                <div  onClick={()=>setMode("calendar")} className="col">
                     <Icon path={mdiCalendar} color={theme.primary} size={1.5}/>
                </div>
                }

         </Col>
         <Col lg={6}>
         </Col>
        
        </Row>
        
        {cts()}
            </>
        </EloiseWidget>
    )
}

type DisplayType = "cards" | "table" | "calendar";

interface DisplayOptions {
  cards: string[];
  table: string[];
  calendar: string[];
}

function determineDisplayType(obj: unknown): DisplayType[] {
  const displayOptions: DisplayOptions = {
    cards: ["title", "image", "description"],
    table: ["header", "rows"],
    calendar: ["events", "date"],
  };

  if (typeof obj !== "object" || obj === null) {
    return [];
  }

  const objectKeys = Object.keys(obj);

  return Object.keys(displayOptions).reduce((acc: DisplayType[], displayType: string) => {
    const requiredKeys = displayOptions[displayType as DisplayType];

    if (requiredKeys.every((key) => objectKeys.includes(key))) {
      acc.push(displayType as DisplayType);
    }

    return acc;
  }, []);
}

