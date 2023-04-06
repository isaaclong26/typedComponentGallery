import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEloise } from "../../App";


export interface dropdownProps{
    options: string[],
    label?: string;
    primary?: boolean;
    secondary?: boolean;
    backgroundColor?: string;
    onChange?: any;
    width?: string | number;
    className?: string,
    margin?: string,
    inverse?: boolean,
    extLabel?: boolean,
    color?: string,
    externalLabel?: boolean,
    whiteLabel?: boolean,
    posClassName?: string,
    onParent?: any
    state?: any,
    value?:any

}







const DropDown = (props: dropdownProps)=>{
    const [selected, setSelected] = useState<string>()

    const {theme, logic} = useEloise()

    const handleSelect= (option:string)=>{
        setSelected(option)
        props.state(option)
    }

    const getC = () =>{
        if(props.inverse){
          if(props.primary){
            return theme.primary
          }
          else if(props.secondary){
            return theme.secondary
          }
          else if(props.color){
            return props.color
          }
          else{
            return theme.primary
          }
        }
        else{
          return theme.white
        }
      }
      let c = getC()
    
    
      var backgroundColorF = () => {
        if(props.inverse){
          return theme.white
        }
        if (props.primary) {
          return theme.primary;
        } else if (props.secondary) {
          return theme.secondary;
        } else if (props.backgroundColor !== undefined) {
          return props.backgroundColor;
        } else {
          if (theme.primary !== undefined) {
            return "#fff";
          } else {
            return "#666";
          }
        }
      };
      let BC = backgroundColorF()
        return(
            <Dropdown 
            className={props.posClassName} 
            style={{padding: props.margin? props.margin :" 0"}}
            onChange={props.onChange}
            >
            <Dropdown.Toggle 
            style={{
                margin: "auto",
                width: props.width ? props.width : "100%",
                backgroundColor: BC,
                color: c
            }} variant="success" id="dropdown-basic">
             {selected? selected : props.value? props.value : "Select One"}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
                {props.options.map(option=>
                        <Dropdown.Item  active={props.value == option? true : false}key={option} onClick={()=> {handleSelect(option)}}>{option}</Dropdown.Item>

                )}
           
            </Dropdown.Menu>
          </Dropdown>
        )
}


export{ DropDown};