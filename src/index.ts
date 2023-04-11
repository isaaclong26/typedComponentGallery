import Eloise,{useEloise} from "./App"
import { Logic } from './functions';

import {
    // pages
    Home,
    Login,
    //todo Account

    // widgets
    Header,
    //todo Footer


    //blocks

    ChildrenModal,
    ConfirmationModal,
    Button,
  
    Loading,
    Canvas,
    Heading,
    Input,
    AppIcon,
    DropDown,
    Life,


}  from "./components"


export {
    //Setup 
    Eloise,
    useEloise,
    // Logic 
    Logic,
    //components
        // pages
        Home,
        Login,
        //todo Account
    
        // widgets
        Header,
        //todo Footer

    
        //blocks
        ChildrenModal,
        ConfirmationModal,
        Button,// Updated
        Loading,
        Canvas,
        Heading,
        Input,// Updated
        AppIcon,
        DropDown,
        Life,
    }

    export interface EloisePage {
      name: string;
      component?: React.FC;
      pages?: EloisePage[];
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
      name: string;
      pages: EloisePage[];
      logo: string;
      inverseLogo:string;
      sideWidget: SideWidget[];
      eloiseConfig:EloiseConfig 
    }
      
      export interface FirebaseConfig {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId?: string;
      }
      
     
      
      
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
      
      //button 
      import React from "react";
      /**
       * BaseButtonProps is an interface that extends React.ButtonHTMLAttributes<HTMLButtonElement>.
       * It contains additional properties to customize the button component.
       */
      export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        color?: "primary" | "secondary" | "accent" | HSLAColor; // Defines the color of the button
        rounded?: boolean; // Determines if the button should have rounded corners
        className?: string; // Allows for custom styling via class names
        children?: React.ReactNode; // The content of the button
        role?: string; // Sets the role attribute of the button
        ariaLabel?: string; // Sets the aria-label attribute of the button
        ariaPressed?: boolean; // Sets the aria-pressed attribute of the button
        ariaExpanded?: boolean; // Sets the aria-expanded attribute of the button
        ariaControls?: string; // Sets the aria-controls attribute of the button
        ariaDescribedBy?: string; // Sets the aria-describedby attribute of the button
        tabIndex?: number; // Sets the tab index of the button
      }
      
      /**
       * RegularButtonProps is an interface that extends BaseButtonProps and adds the onClick event handler.
       * It is used for regular buttons that do not interact with Firebase.
       */
      export interface RegularButtonProps extends BaseButtonProps {
        firebase?: false; // Indicates that this is not a Firebase button
        onClick?: () => void; // The onClick event handler for the button
      }
      
      /**
       * FirebaseButtonProps is an interface that extends BaseButtonProps and adds additional properties required for Firebase buttons.
       * It is used for buttons that interact with Firebase.
       */
      export interface FirebaseButtonProps extends BaseButtonProps {
        firebase: true; // Indicates that this is a Firebase button
        data: any; // The data to be stored in Firebase
        path: string; // The path in Firebase where the data should be stored
        next: Function; // A function to be called after the data has been successfully stored in Firebase
      }
      
      /**
       * ButtonProps is a union type that can either be RegularButtonProps or FirebaseButtonProps.
       * It is used to define the props of the Button component.
       */
      export type ButtonProps = RegularButtonProps | FirebaseButtonProps;
      
      
      //Input 
      
      export interface InputProps {
        label: string;
        onEnter?: () => void;
        extLabel?: boolean;
        border?: boolean;
        state: string | undefined;
        setState: React.Dispatch<React.SetStateAction<any>>;
        placeholder?: string;
        type?: string
      }
      
      
      //large Text
      
      export interface BaseLTProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
        placeholder?: string;
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

    
    
   
    
