import axios from "axios";
import { DependencyList, useEffect, useRef } from "react";
import { FB } from "./firebase";


/**
 * A class that contains various utility functions for making API calls, handling input events,
 * and more.
 * @class
 */

const Generic: {[key: string]:any} = {


  

 
 
  
    
   /**
 * Capitalizes the first letter of a word and lowercases the rest.
 * @param {string} word - The word to capitalize.
 * @returns {string} The capitalized word.
 * @example
 * const result = capitalize("hello world");
 * console.log(result); // "Hello world"
 */
  capitalize(word: string ): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  },

/**
 * Converts a string from snake_case to camelCase.
 * @param {string} str - The string to convert.
 * @returns {string} The camelCase string.
 * @example
 * const result = camelize("hello_world");
 * console.log(result); // "helloWorld"
 */
camelize(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match: string, index: number) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
},
extractTextFromComponent(component: any): string {
  if (typeof component === 'string' || typeof component === 'number') {
    return component.toString();
  }

  if (!component || !component.props) {
    return '';
  }

  // Check if the component is an EloiseWidget and skip if it is
  if (component.type && component.type.name === 'EloiseWidget') {
    return '';
  }

  if (component.props.children) {
    if (Array.isArray(component.props.children)) {
      return component.props.children
        .map((child: any) => this.extractTextFromComponent(child))
        .join(' ');
    }

    return this.extractTextFromComponent(component.props.children);
  }

  return '';
},




/**
 * Updates a state variable with the value of an input event.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The input event.
 * @param {Function} setter - The state setter function.
 * @example
 * const [name, setName] = useState("");
 * const handleInputChange = (e) => {
 *   inputHandler(e, setName);
 * };
 */
inputHandler(event: { target: { value: any; }; }, setter: (arg0: any) => void) {
  const enteredName = event.target.value;
  setter(enteredName);
},

/**
 * Returns a random element from an array.
 * @param {any[]} arr - The array to select from.
 * @returns {any} The randomly selected element.
 * @example
 * const options = ["option1", "option2", "option3"];
 * const result = getRandom(options);
 * console.log(result); // "option2" (or another random option)
 */
getRandom(arr: string | any[]): any {
  let ots = arr[Math.floor(Math.random() * arr.length)];
  return ots;
},
 shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
},

/**
 * Retrieves a list of permissions from the server.
 * @returns {Promise<string[]>} A promise that resolves to an array of permission names.
 * @example
 * const permissions = await getPerms();
 * console.log(permissions); // ["read", "write", "admin"]
 */
async getPerms(): Promise<string[]> {
  return await this.apiCall("perms");
},

/**
 * Sends a password reset request to the server.
 * @returns {Promise<boolean>} A promise that resolves to true if the request was successful.
 * @example
 * const success = await resetPassword();
 * console.log(success); // true if the request was successful
 */
async resetPassword(): Promise<boolean> {
  return await this.apiCall("resetPassword");
},

/**
 * Updates the current user's profile with the given data.
 * @param {Object} update - An object containing the updated user data.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful.
 * @example
 * const update = { firstName: "John", lastName: "Doe" };
 * const success = await updateUser(update);
 * console.log(success); // true if the update was successful
 */
async updateUser(update: any): Promise<boolean> {
  return await this.apiCall("user", update);
},

/**
 * Takes a lower camel case string and returns a formatted string with spaces between words.
 * 
 * @param {string} str - The string to format.
 * @returns {string} A formatted string with spaces between words.
 * 
 * @example
 * 
 * const formattedString = formatCamelCaseString("firstName");
 * console.log(formattedString); // "First Name"
 */
formatCamelCaseString(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
            .replace(/^./, function(s) { return s.toUpperCase(); });
},




 
};



export { Generic };