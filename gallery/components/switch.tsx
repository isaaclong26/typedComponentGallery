import React from 'react';
import './switch.css';
import { Heading } from '..';



const Switch = (props: { isOn:boolean, handleToggle:any }) => {
  return (
    <div className='row '>

      <div className='col-lg-3 mx-auto '> 
      <Heading size={3} handWritten >{props.isOn? "Light":"Dark"}</Heading>
      </div>

      <div className='col-lg-3 mx-auto pt-2 '>

      <input
         checked={props.isOn}
         onChange={props.handleToggle}
        className="react-switch-checkbox vertical-center"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
      
      </div>
    </div>
  );
};

export default Switch;