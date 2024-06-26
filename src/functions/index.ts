import { BaseEloiseUser, FirebaseConfig, HistoryItem, SiteConfig } from "../";

import { ColorMethods, HSLAColor, color } from "./color";
import { FB, FBInterface } from "./firebase";
import { Generic } from "./generic";
import { GptText, gptText } from "./gptText";
import { Hooks } from "./hooks";

class Logic {
  /**
   * The prefix for all API calls made by the application.
   * This URL can be replaced with a local address for development purposes.
   * @type {string}
   */
  api: string;
  /**
   * Firebase Parent Object
   * Imported from firebase.ts
   * @type {FB}
   */
  fb: FBInterface;
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

  apiCall: Function = async (
    route: string,
    body?: any,
    raw?: boolean,

    url?: string
  ): Promise<any> => {
    let user = await this.fb.auth.currentUser?.getIdToken();

    const headers = {
      Authorization: `Bearer ${user}`,
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method: body ? "POST" : "GET",
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const apiUrl = url ?? this.api;

    try {
      const response = await fetch(`${apiUrl}/${route}`, options);
      if (response.ok) {
        if (raw) return response;
        const data = await response.json();
        return data;
      } else if (response.status === 403) {
        this.auth();
      } else if (response.status === 402) {
        this.perms();
      } else {
        // this.other()
        console.log(response);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  zillowParse = async (text: string) => {
    let ots = await this.apiCall("zillowParse", { text });
    return ots;
  };

  /**
   * Chat Gpt Text Functions
   */
  gptText: GptText = gptText;
  /**
   * Redirects User to Perms Error Screen
   */
  perms() {
    window.location.href = "/perms";
  }
  /**
   * Redirects User to Auth Error Screen
   */
  auth() {
    window.location.href = "/auth";
  }
  /**
   * Redirects User to Misc Error Screen
   */
  other() {
    window.location.href = "/other";
  }

  hooks = Hooks;

  siteConfig: SiteConfig;

  color: ColorMethods = color;

  generic = Generic;

  user = {
    /**
     * Returns the history items for the current user or false if an error occurs.
     * @function
     * @memberof EloiseUserObject
     * @returns {Promise<HistoryItem[]|boolean>} The history items for the current user or false if an error occurs.
     */
    getHistory: async (): Promise<HistoryItem[] | boolean> => {
      let req = await this.fb.docs.getUserDoc(`/${this.siteConfig.id}/history`);
      if (req) {
        return req.data as HistoryItem[];
      } else {
        return false;
      }
    },

    /**
     * Returns the user data for the current user or false if an error occurs.
     * @function
     * @memberof EloiseUserObject
     * @returns {Promise<BaseEloiseUser|boolean>} The user data for the current user or false if an error occurs.
     */
    getUser: async (): Promise<BaseEloiseUser | boolean> => {
      let req = await this.fb.docs.getUserDoc("");
      if (req) {
        return req.data as BaseEloiseUser;
      } else {
        return false;
      }
    },
  };

  constructor(config: FirebaseConfig, siteConfig: SiteConfig) {
    this.fb = new FB(config, siteConfig);
    this.siteConfig = siteConfig;
    this.api = siteConfig.api;
  }
}

export { ColorMethods, HSLAColor, Logic };
