import React,{} from "react";

import { InputProps, LargeTextInput, Input, LTProps, FileUpload, FileUploadProps,Checkbox, CheckboxProps } from "../..";



interface FieldDefinition {
    key: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'file' | 'largeText' | "dropdown" | "checkbox" | "date"; // Add more input types as needed
    col?: 3 | 4| 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  }


export interface FormPropsBase{


}
export interface FormPropsFirebase extends FormPropsBase{
path:string;
sucess: Function;

}
export interface FormPropsManual extends FormPropsBase{

}

export type FormProps = FormPropsManual | FormPropsFirebase


export const Form: React.FC<FormProps> = ({})=>{



    return (<>
    
    </>)
}