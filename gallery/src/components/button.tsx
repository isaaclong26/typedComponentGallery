import React,{useState, useEffect} from "react";



export interface buttonProps{
    // Required properties
    children: string,
    onClick: any,
    fullWidth?: boolean,

    color?: string,
}


const PrimaryButton = (props:buttonProps)=>{
    

    return(

       
            <button
                style={{
                    backgroundColor : props.color,
                    border: "none",
                    textAlign: "center",
                    width: ` ${props.fullWidth ? "90%" : "auto" }`,
                    margin: `${props.fullWidth ? "0 5%": "auto" }`,
                    padding: "5px 20px"


                    }}
                onClick={props.onClick}
            
            >
                {props.children}

            </button>
      
    )
}



export default PrimaryButton;
