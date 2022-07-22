import { InputProps } from "./input";
import styled from "styled-components"
import theme from "../theme";


const Wrapper = styled.div<InpProps>`
position: relative;
padding: 15px 0 0;
margin-top: 10px;
width: ${(props) => props.width};
`


const Inp = styled.input<InpProps>`
outline: 2px solid  ${(props) => props.background};


font-family: inherit;
width: 100%;
border: 0;
font-size: 1.3rem;
color:  ${(props) => props.background};
padding: 3px 5px;
background:${theme.white};
border-radius: ${theme.borderRadius? "3px" : 0};
&::placeholder {
  color: transparent;
}



&:focus {
   
    font-weight: 700;
    outline-width: 4px;
 
  }
  &:hover{
   
    font-weight: 700;
    outline-width: 4px;
 
  }
`;

const Lbl = styled.label<InpProps>`
position: absolute;
color: ${(props)=>props.background} ;
top: 20px;
display: block;
transition: 0.2s;
font-size: 1rem;
${Inp}:focus ~ & {
      position: absolute;
      top: -15px;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      font-weight:700;  
      color: ${props=>props.whiteLabel ? theme.white : props.background} !important;    
  
    }
    ${Inp}:valid ~ & {
        position: absolute;
        top: -15px;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        font-weight:700;
        color: ${props=>props.whiteLabel ? theme.white : props.background} !important;    
    }
      ${Inp}:hover ~& {
        font-weight: bold;
      }
`


interface InpProps {
    background?: string | any;
    width?: string | number;
    className?: any,
    for?: any,
    whiteLabel?: boolean,
  }
const Input2 = (props:InputProps)=>{

    const BC = ()=>{
        if(props.primary){return theme.primary}
        else if(props.secondary){return theme.secondary}
        else{ return theme.primary}
    }
    const bc = BC();
    return(
        <Wrapper>
        <Inp 
        required
        id="x"
        className={props.className}
      width={props.width ? props.width : "100%"}
      background={bc}
      placeholder={props.label}
      onChange={props.onChange}
      />
      <Lbl for="x" background={bc} whiteLabel={props.whiteLabel? props.whiteLabel : false}>{props.label}</Lbl>
       </Wrapper>
    )
}


export default Input2