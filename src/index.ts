import Eloise,{EloiseIntel, useEloise} from "./App"
import { Logic } from './functions';
import { ViewCol, View } from "./components/blocks/View";
import { DBItem, DBList, DBListProps } from "./components/widgets/dbList";
import {DBTable, DBTableProps } from "./components/widgets/DBTable";
import {DBCards, CardListProps } from "./components/widgets/DBCards";
import { FileUpload, FileUploadProps } from "./components/widgets/fileUpload";
import {CollectionRender} from "./components/widgets/CollectionRender";
import LargeTextInput from "./components/blocks/largeText";
import { EloiseWidget } from "./components/widgets/EloiseWidget";
import React, { ReactNode } from "react";
import CalendarComponent from "./components/widgets/calendar";

import {
    // pages
    Home,
    Login,
    Other,
    ReportBug,
    //todo Account

    // widgets
    Header,
    //todo Footer
    Checkbox,

    //blocks

    ChildrenModal,
    ConfirmationModal,
    Button,
    Loading,
    Canvas,
    Heading,
    Input,
    InputProps,
    AppIcon,
    DropDown,
    Life,

    DateSelector


}  from "./components"


export {
    //Setup 
    Eloise,
    useEloise,
    EloiseWidget,
    // Logic 
    DBTable, DBTableProps,
    DBCards, CardListProps,
    Logic,
    DBItem, DBList, DBListProps,
    FileUpload, FileUploadProps,
    CollectionRender,
    DateSelector,
    //components
        // pages
        Home,
        Login,
        Other,
        ReportBug,
        //todo Account
    
        CalendarComponent,

        // widgets
        Header,
        //todo Footer

        Checkbox,
        //blocks
        ChildrenModal,
        ConfirmationModal,
        Button,// Updated
        Loading,
        Canvas,
        Heading,
        Input,// Updated
        InputProps,
        AppIcon,
        DropDown,
        Life,
        View,
        ViewCol,
        LargeTextInput
    }

    export interface EloisePage {
      name: string;
      component?: ReactNode;
      pages?: EloisePage[];
      hidden?: boolean
      url?: string
      intel?: EloiseIntel
    }
    export interface SideWidget {
      name: string;
      component: React.FC;
    }

    export interface EloiseConfig {
        endPoint: string;
        chatLog: string;
        initMessage: string;

    }
    
    export interface SiteConfig {
      api:string;
      name: string;
      id: string;
      pages: EloisePage[];
      logo: string;
      inverseLogo:string;
      sideWidget: SideWidget[];
      eloiseConfig:EloiseConfig;
      headerTrans : boolean;
      bugReporting?: boolean;
      userConfig?: UserConfig;
    }

    export interface UserConfig {
      customFields: string[]
    }

      export interface FirebaseConfig {
        config:{apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId?: string;
        };
        storageDir: string
      }
      
     
      
      export interface CheckboxProps {
        label: string;
        state: boolean;
        setState: (value: boolean) => void;
      }
      /**
       * A styled checkbox component that can be used for various purposes.
       *
       * @component
       * @example
       * ```jsx
       * <Checkbox
       *   label="Agree to Terms and Conditions"
       *   state={agreeTerms}
       *   setState={setAgreeTerms}
       * />
       * ```
       * @param {Object} props - The props object for the component.
       * @param {string} props.label - The label to display next to the checkbox.
       * @param {boolean} props.state - The state value for the checkbox.
       * @param {function} props.setState - The function to set the state value for the checkbox.
       * @returns {JSX.Element} A styled checkbox component.
       **/
      // Style Types
      
      /**
       * Defines an HSLA color type, formatted as a string
       * @example
       * ```
       * hsla(23, 34%, 54% 100)
       * ```
       */
      
      export type HSLAColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;
      /**
       * Defines a font size type, with accepted values as strings. 
       * Valid values are:
       * - Predefined font sizes: 'xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'smaller', and 'larger'
       * - Sizes specified in pixels: e.g. '14px', '20px'
       * - Sizes specified in ems: e.g. '1.2em', '2em'
       * - Sizes specified in percentage: e.g. '50%', '100%'
       */
      export type FontSize =
        | "xx-small"
        | "x-small"
        | "small"
        | "medium"
        | "large"
        | "x-large"
        | "xx-large"
        | "smaller"
        | "larger"
        | `${number}px`
        | `${number}em`
        | `${number}%`;
      
      /**
       * Defines a border radius type, with accepted values as strings.
       * Valid values are:
       * - Sizes specified in pixels: e.g. '4px', '10px'
       * - Sizes specified in percentage: e.g. '50%', '100%'
       * - 'none' to remove border radius
       * - 'initial' to set the border radius to its initial value
       * - 'inherit' to inherit the border radius from the parent element
       */
      export type BorderRadius =
        | `${number}px`
        | `${number}%`
        | "none"
        | "initial"
        | "inherit";
      
      /**
       * An interface for color methods that includes functions to lighten, darken, and get text color from a background color.
       */
      export interface ColorMethods {
        /**
         * A function that lightens an HSLA color value by a specified amount.
         * 
         * @param hslaColor - The HSLA color value to be lightened.
         * @returns The new HSLA color value that has been lightened.
         */
        lighten: (hslaColor: HSLAColor) => HSLAColor;
        
        /**
         * A function that darkens an HSLA color value by a specified amount.
         * 
         * @param hslaColor - The HSLA color value to be darkened.
         * @returns The new HSLA color value that has been darkened.
         */
        darken: (hslaColor: HSLAColor) => HSLAColor;
        
        /**
         * A function that returns the text color that provides the best contrast against a given HSLA background color.
         * 
         * @param backgroundColor - The HSLA color value of the background color.
         * @returns The HSLA color value of the text color that has the best contrast against the given background color.
         */
        getTextColorFromBackground: (backgroundColor: HSLAColor) => HSLAColor;
      }
      
      
      // Defines an interface for theme colors
      export interface Theme {
        primary: HSLAColor;
        secondary: HSLAColor;
        white: HSLAColor;
        font: string;
        fontSize: FontSize;
        borderRadius: BorderRadius;
        border: string;
        accent: HSLAColor;
        grey: HSLAColor;
        mode: 'light' | 'dark' | 'auto';
      }
      
      
      
      //component props 

      

      
      type CSSHeight =
  | `${number}px`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | `${number}vmin`
  | `${number}vmax`
  | 'auto';

// Usage examples

      //large Text
      
      export interface BaseLTProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
        placeholder?: string;
        height?: CSSHeight
      }
      
      export interface RegularLTProps extends BaseLTProps {
        firebase?: false; // Indicates that this is not a Firebase button
        state: string;
        setState: React.Dispatch<React.SetStateAction<string>>;
      }
      
      export interface FirebaseLTProps extends BaseLTProps {
        firebase: true; // Indicates that this is a Firebase button
        path: string; // The path in Firebase where the data should be stored
        throttle?: number | false; // The number of milliseconds
      }
      
      export type LTProps = RegularLTProps | FirebaseLTProps;



      /**
 * CustomChatType is a React component type that accepts a single prop called 'data' of any type.
 * @typedef {React.ComponentType<{ data: any }>} CustomChatType
 */
   type CustomChatType = React.ComponentType<{ data: any }>;
/**
 * TextMessage is an object representing a text message in the chat.
 * @typedef {Object} TextMessage
 * @property {string} text - The text content of the message.
 * @property {"user"|"ai"} sender - The sender of the message: 'user' or 'ai'.
 * @property {"Text"} type - The type of the message, in this case, 'Text'.
 */
export type TextMessage = {
        text: string;
        sender: "user" | "ai";
        type: "Text";
    };
/**
 * CustomMessage is an object representing a custom message in the chat with a custom React component.
 * @typedef {Object} CustomMessage
 * @property {string} text - The text content of the message.
 * @property {"user"|"ai"} sender - The sender of the message: 'user' or 'ai'.
 * @property {"Custom"} type - The type of the message, in this case, 'Custom'.
 * @property {CustomChatType} component - A React component to render for the custom message.
 * @property {any} data - The data to be passed to the custom React component as a prop.
 */
 export type CustomMessage = {
        text: string;
        sender: "user" | "ai";
        type: "Custom";
        component: CustomChatType;
        data:any;
    };
/**
 * MessageType is a union type representing either a TextMessage or CustomMessage.
 * @typedef {TextMessage | CustomMessage} MessageType
 */
    export  type MessageType = TextMessage | CustomMessage;


   export interface BaseEloiseUser {
      preName?: string;
      eduLevel?: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      phoneNumber?: string;
      country?: string;
      email: string;
      perms?: string;
      createdAt?: string;
      curieUsage?: number;
      davinciUsage?: number;
      userId?: string;
      year?: string;
      school?: string;
    }

    export interface HistoryItem {
      createdAt?: string;
      lastAccess?:string;
      data: any;
    }
    
    
    
 /**
 * An object representing the Eloise user.
 * @typedef {Object} EloiseUserObject
 * @property {function(): Promise<HistoryItem[]|boolean>} getHistory - Returns the history items for the current user or false if an error occurs.
 * @property {function(): Promise<BaseEloiseUser|boolean>} getUser - Returns the user data for the current user or false if an error occurs.
 */

/**
 * Represents a history item.
 * @typedef {Object} HistoryItem
 * @property {string} id - The ID of the history item.
 * @property {string} timestamp - The timestamp of the history item.
 * @property {string} action - The action associated with the history item.
 */

/**
 * Represents a base Eloise user.
 * @typedef {Object} BaseEloiseUser
 * @property {string} preName - The prename of the Eloise user.
 * @property {string} eduLevel - The educational level of the Eloise user.
 * @property {string} firstName - The first name of the Eloise user.
 * @property {string} lastName - The last name of the Eloise user.
 * @property {string} username - The username of the Eloise user.
 * @property {string} phoneNumber - The phone number of the Eloise user.
 * @property {string} country - The country of the Eloise user.
 * @property {string} email - The email of the Eloise user.
 * @property {string} perms - The permissions of the Eloise user.
 * @property {string} createdAt - The creation date of the Eloise user.
 * @property {number} curieUsage - The Curie usage of the Eloise user.
 * @property {number} davinciUsage - The Davinci usage of the Eloise user.
 * @property {string} userId - The user ID of the Eloise user.
 * @property {string} year - The year of the Eloise user.
 * @property {string} school - The school of the Eloise user.
 */

/**
 * An object representing the Eloise user.
 * @type {EloiseUserObject}
 */

   
    
