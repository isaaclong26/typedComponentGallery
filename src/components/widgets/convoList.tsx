import React,{useState, useEffect} from "react";
import { DBList } from "./dbList";
import { Heading, useEloise } from "../..";

import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiCircle } from "@mdi/js";

const ConvoDiv = styled.div`

border-bottom: 2px solid grey;

`
const ShortedHead = styled.h5`
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
`

const Convo: React.FC<{select?:Function, path:string}> = ({select, path})=>{

    const {logic, theme} =  useEloise()
    const [first, setFirst] = useState<string>()
    const [value, setValue] = useState<any>()

    logic.hooks.useAsyncEffect(async()=>{

        let test = await logic.fb.docs.getUserDoc(path)
        setValue(test)
        let test2 = await logic.fb.docs.getUserCollection(path+"/messages")
        setFirst(test2[0].data.content)
    },[])

    const testClick = ()=>{
        if(select){

            select(value)
        }
    }

    return (
        <ConvoDiv onClick={testClick}>
        {value &&
        <>
        <Row>
            <Col lg={9}>
            <Heading size={3} align="left" color="black">{value.data.connectedToName}</Heading>
            </Col>
            <Col lg={3}>
            {value.data.unread && <Icon path={mdiCircle} color={theme.accent} size={1} />}
            </Col>
            
        </Row>
                <ShortedHead style={{textAlign: "left", color: "grey"}}>{first?? " "}</ShortedHead>
                </>

            }

        </ConvoDiv>
    )
}
export const ConvoList:React.FC<{select:Function}> = ({select})=>{

    const [docs, setDocs] = useState<any>()


    const {logic} = useEloise()



  logic.hooks.useAsyncEffect(async()=>{


        let test = await logic.fb.docs.getUserCollection("convos")
        setDocs(test)


    },[])

    return (
        <>

    {docs && docs.map((value:any)=><Convo select={select} path={`convos/${value.id}`} />)}

        </>
    )
}