import axios from "axios";
import { DependencyList, useEffect, useRef } from "react";
import { FB } from "./firebase";


/**
 * A class that contains various utility functions for making API calls, handling input events,
 * and more.
 * @class
 */

class Generic {
  fb:FB;
  perms:Function
  auth:Function
  other:Function
  api:string

  /**
   * Creates an instance of the `Generic` class.
   * @constructor
   * @param {Function} perms - A function that returns an array of user permissions.
   * @param {FB} fb - An instance of the `FB` class for interacting with Firebase.
   * @param {Function} auth - A function that returns the current user's authentication status.
   * @param {Function} other - A function that provides access to additional functionality.
   * @param {string} api - The base URL for the API.
   */

  constructor(perms:Function, fb:FB,auth:Function, other:Function, api:string){
    this.api = api
    this.perms = perms;
    this.auth = auth;
    this.other = other;
    this.fb = fb

  }
  /**
 * Makes an API call to the specified route with optional body data.
 * 
 * @param {string} route - The API endpoint route.
 * @param {*} [body] - Optional body data to send with the API call.
 * 
 * @returns {Promise} - A Promise that resolves with the API response data, or rejects with an error message.
 * 
 * @example
 * 
 * const apiResponse = await apiCall("users", { name: "John", age: 30 });
 * console.log(apiResponse); // { status: "success", data: { userId: 123, name: "John", age: 30 } }
 */

   apiCall: Function = async (route: string, body?: any, url?: string): Promise<any> => {
    let user = await this.fb.auth.currentUser?.getIdToken();

    const headers = {
      Authorization: `Bearer ${user}`,
    };

    const options: RequestInit = {
      method: body ? 'POST' : 'GET',
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    };

    const apiUrl = url ?? this.api;

    try {
      const response = await fetch(`${apiUrl}/${route}`, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 403) {
        throw new Error("auth");
      } else if (response.status === 402) {
        throw new Error("perms");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error:any) {
      throw new Error(error.message);
    }
};

  
    
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
  }

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
}

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
}

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
}
 shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Retrieves a list of permissions from the server.
 * @returns {Promise<string[]>} A promise that resolves to an array of permission names.
 * @example
 * const permissions = await getPerms();
 * console.log(permissions); // ["read", "write", "admin"]
 */
async getPerms(): Promise<string[]> {
  return await this.apiCall("perms");
}

/**
 * Sends a password reset request to the server.
 * @returns {Promise<boolean>} A promise that resolves to true if the request was successful.
 * @example
 * const success = await resetPassword();
 * console.log(success); // true if the request was successful
 */
async resetPassword(): Promise<boolean> {
  return await this.apiCall("resetPassword");
}

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

/**
 * A custom hook that handles asynchronous operations inside a useEffect loop.
 * It ensures that the async function is only called when the specified dependencies change,
 * and it properly handles cleanup when the component is unmounted.
 *
 * @param {Function} asyncFunction - The asynchronous function to be called inside useEffect.
 * @param {Array} dependencies - An array of dependencies for the useEffect hook.
 */
 useAsyncEffect:Function = (asyncFunction: () => any, dependencies: DependencyList | undefined)=> {
  useEffect(() => {
    let isMounted = true;

    const wrappedAsyncFunction = async () => {
      try {
        await asyncFunction();
      } catch (error) {
        if (isMounted) {
          console.error('An error occurred in useAsyncEffect:', error);
        }
      }
    };

    wrappedAsyncFunction();

    return () => {
      isMounted = false;
    };
  }, dependencies);
}
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
}




 
};



export { Generic };