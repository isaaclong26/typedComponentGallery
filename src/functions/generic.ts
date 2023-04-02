import axios from "axios";
import { useEffect, useRef } from "react";

import { fb } from "./firebase";


class Generic {

  

  perms:Function
  auth:Function
  other:Function
  api:string

  constructor(perms:Function, auth:Function, other:Function, api:string){
    this.api = api
    this.perms = perms;
    this.auth = auth;
    this.other = other;

  }

  apiCall:Function = async (route: string, body?: any) => {

    let user = await fb.auth.currentUser?.getIdToken();
   
    axios.defaults.headers.common = { Authorization: `Bearer ${user}` };
    
      return new Promise(async (resolve, reject) => {
    
        if(body){
        await axios
          .post(`${this.api}/${route}`, body)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            if (error.status === 403) {
              reject("auth");
            } else if (error.status === 402) {
              reject("perms");
            } else {
              reject(error.message);
            }
          });
        }
        else{
          await axios
          .get(`${this.api}/${route}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            if (error.status === 403) {
              reject("auth");
            } else if (error.status === 402) {
              reject("perms");
            } else {
              reject(error.message);
            }
          });
        }
      });
    }
    
    
    capitalize:Function = (word: string) =>{
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  camelize:Function = (str: string) =>{
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
 }
  inputHandler:Function =(
    event: React.ChangeEvent<HTMLInputElement>,
    setter: Function
  ) => {
    const enteredName = event.target.value;
    setter(enteredName);
 }

  getRandom:Function =(x: any[]) => {
    let ots = x[Math.floor(Math.random() * x.length)];
    return ots;
  }

  getPerms: Function = async () => {

    return  await this.apiCall("perms")
 }
  resetPassword: Function = async () => {
   
   return await this.apiCall("resetPassword")
 }
  updateUser: Function = async(update:{[key:string]:any})=>{

     

      return await this.apiCall("user", update)


 }
  getHistory: Function = async () => {
    let x:any = await this.apiCall("history")
   
    return x
 }
  getUser: Function = async () => {
    
    return await this.apiCall("user")
 }

  useFocus:Function =() => {
    const domRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      domRef.current?.focus();
   },[domRef]);

    return {
      domRef,
    };
 }



 
};



export { Generic };