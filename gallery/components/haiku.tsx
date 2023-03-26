import React, {useEffect, useState} from "react";
import { Heading } from "..";


const Haiku = (props:{text:string})=>{

    let [data, setData] = useState<string[]>()
    useEffect(()=>{
        setData(props.text.split("\n"));
    },[])

    return(
        <>
            <div>
                {data &&
                <>
                <Heading  handWritten size={3}>{data[0]}</Heading>
                <Heading  handWritten size={3}>{data[1]}</Heading>
                <Heading  handWritten size={3}>{data[2]}</Heading>
                </>
                }

            </div>
        </>
    )
}


export {Haiku}