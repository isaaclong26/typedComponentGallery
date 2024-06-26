import React, { ReactNode } from "react";
import Eloise, { EloiseIntel, useEloise } from "./App";
import {
  AppIcon,
  Button,
  CalendarComponent,
  Canvas,
  CardListProps,
  Checkbox,
  ChildrenModal,
  CollectionRender,
  ConfirmationModal,
  DBCards,
  DBItem,
  DBList,
  DBListProps,
  DBTable,
  DBTableProps,
  //blocks
  DateSelector,
  DropDown,
  EloiseWidget,
  FileTable,
  FileUpload,
  FileUploadProps,
  FlatList,
  // widgets
  Header,
  Heading,
  // pages
  Home,
  Input,
  InputProps,
  LargeTextInput,
  Life,
  Loading,
  Login,
  Map,
  MapProps,
  //todo Account
  Other,
  ReportBug,
  View,
  ViewCol,
} from "./components";
import { DefaultHeadingProps } from "./components/blocks/heading";
import { DefaultInputProps } from "./components/blocks/input";
import { UserDependentWidget } from "./components/widgets";
import { File } from "./components/widgets/fileTable";
import { HSLAColor, Logic } from "./functions";
import { Color } from "./functions/color";

export {
  AppIcon,
  Button,
  //todo Account
  CalendarComponent,
  Canvas,
  CardListProps,
  //todo Footer
  Checkbox,
  //blocks
  ChildrenModal,
  CollectionRender,
  ConfirmationModal,
  DBCards,
  DBItem,
  DBList,
  DBListProps,
  // Logic
  DBTable,
  DBTableProps,
  DateSelector,
  DropDown,
  Eloise,
  EloiseWidget,
  File,
  FileTable,
  FileUpload,
  FileUploadProps,
  FlatList,
  HSLAColor,
  // widgets
  Header,
  Heading,
  //components
  // pages
  Home,
  Input,
  InputProps,
  LargeTextInput,
  Life,
  Loading,
  Logic,
  Login,
  //Setup
  Map,
  MapProps,
  Other,
  ReportBug,
  UserDependentWidget,
  View,
  ViewCol,
  useEloise,
};

export interface SideWidget {
  name: string;
  component: React.FC;
}

export interface EloiseConfig {
  endPoint: string;
  chatLog: string;
  initMessage: string;
}

export interface User {
  first: string;
  last: string;
  email: string;
  account: boolean;
  phone?: number;
  apps: Array<string>;
  usage?: {
    gpt?: number;
    api?: number;
  };
  username?: string;
}

export interface Contact {
  user: string;
  type: string;
  initials: string;
  email: string;
  first: string;
  last: string;
}
export interface EloisePage {
  name: string;
  component?: ReactNode;
  pages?: EloisePage[];
  hidden?: boolean;
  url?: string;
  intel?: EloiseIntel;
  noAuth?: boolean;
}
export type PagesType = EloisePage[] | ((key: string) => EloisePage[]);

export interface SiteConfig {
  api: string;
  name: string;
  id: string;
  pages: PagesType;
  logo: string;
  defaultMode: string;
  inverseLogo: string;
  sideWidget: SideWidget[];
  eloiseConfig: EloiseConfig;
  headerTrans: boolean;
  bugReporting?: boolean;
  userConfig?: UserConfig;
  peopleConfig: Array<PeopleType>;
  noAuth?: boolean;
  hostingSite: string;
  noHeader?: boolean;
  logoWidth?: number;
}

export type Event = {
  id: string;
  data: {
    title: string;
    start: Date;
    end: Date;
    readable?: string;
    notes?: string;
    type: string;
  };
};

export type PeopleType = {
  title: string;
  icon: string;
};

export interface UserConfig {
  customFields: string[];
}

export interface FirebaseConfig {
  config: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
  storageDir: string;
}

export interface Addy {
  street: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
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

// Defines an interface for theme colors
export interface Theme {
  colors: Array<Color>;
  white: HSLAColor;
  font: string;
  fontSize: FontSize;
  borderRadius: BorderRadius;
  border: string;
  mode: "light" | "dark" | "auto";
  heading?: DefaultHeadingProps;
  input?: DefaultInputProps;
  headerStyle?: any;
  noHeaderLogo?: boolean;
  noHeaderText?: boolean;
}

//component props

type CSSHeight =
  | `${number}px`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | `${number}vmin`
  | `${number}vmax`
  | "auto";

// Usage examples

//large Text

export interface BaseLTProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  height?: CSSHeight;
}

export interface RegularLTProps extends BaseLTProps {
  firebase?: false; // Indicates that this is not a Firebase button
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>> | ((x: any) => void);
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
  data: any;
};
/**
 * MessageType is a union type representing either a TextMessage or CustomMessage.
 * @typedef {TextMessage | CustomMessage} MessageType
 */
export type MessageType = TextMessage | CustomMessage;

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
  lastAccess?: string;
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
