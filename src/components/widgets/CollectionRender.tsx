import React, { useState } from "react";
import { CardListProps, DBCards } from "./DBCards";
import {DBTable, DBTableProps} from "./DBTable";
import { Col, Row } from "react-bootstrap";
import { Heading, useEloise, Button } from "../..";
import Icon from "@mdi/react";
import { mdiCards, mdiTable } from "@mdi/js";



export const CollectionRender:React.FC<{
    path:string,
    tableProps?: DBTableProps
    cardProps?: CardListProps
}> = ({path, tableProps, cardProps})=>{
    const {theme} = useEloise()
    const [mode, setMode] = useState<"table"|"cards">("table")
    const {logic} = useEloise()

    const cts = ()=>{
    if(mode === "table"){
        return <DBTable path={path} { ...tableProps}/>
    }
    else{
        return <DBCards path={path} {...cardProps} />
    }
    }

    return(
        <>
         <Row className="my-3">
        <Col lg={2}>
            <Heading  align="left" size={3}>{logic.generic.capitalize(path)}</Heading>

         </Col>
         <Col lg={2}>
            <div  onClick={()=>setMode(mode==="table"? "cards": "table")}>
                <Icon path={mode==="table"? mdiCards : mdiTable} color={theme.primary} size={1.5}/>
                </div>
         </Col>
         <Col lg={6}>
         </Col>
         <Col lg={2}>
           <Button>New</Button>
         </Col>
       
            
        </Row>
        
        {cts()}

        </>
    )
}