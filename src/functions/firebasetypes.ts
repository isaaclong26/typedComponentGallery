import { Contact, Theme, User } from "../.";

export interface StorageMethods {
  /**
   * Gets the user's storage folder.
   *
   * @param {string} path The path to the user's storage folder.
   * @returns {Promise<{
   *   name: string;
   *   fullPath: string;
   *   downloadURL: string;
   * }[]>} A promise that resolves with an array of file objects for the user's storage folder.
   * @throws {Error} If the user is not authenticated.
   */
  getUserStorageFolder(path: string): Promise<
    {
      name: string;
      fullPath: string;
      downloadURL: string;
    }[]
  >;
  getStorageFolder(path: string): Promise<
    {
      name: string;
      fullPath: string;
      downloadURL: string;
    }[]
  >;

  /**
   * Uploads a file.
   *
   * @param {string} path The path to the file to upload.
   * @param {File} file The file to upload.
   * @returns {Promise<{
   *   name: string;
   *   fullPath: string;
   *   downloadURL: string;
   * }> | boolean} A promise that resolves with a file object for the uploaded file, or false if the upload failed.
   * @throws {Error} If the user is not authenticated.
   */
  uploadFile(
    path: string,
    file: File,
    log?: boolean
  ):
    | Promise<{
        name: string;
        fullPath: string;
        downloadURL: string;
      }>
    | boolean;

  /**
   * Uploads a file to another user's storage folder.
   *
   * @param {string} path The path to the file to upload.
   * @param {string} userId The ID of the user to upload the file to.
   * @param {File} file The file to upload.
   * @returns {Promise<{
   *   name: string;
   *   fullPath: string;
   *   downloadURL: string;
   * }> | boolean} A promise that resolves with a file object for the uploaded file, or false if the upload failed.
   * @throws {Error} If the user is not authenticated, or if the user ID is invalid.
   */
  uploadOtherUserFile(
    path: string,
    userId: string,
    file: File
  ):
    | Promise<{
        name: string;
        fullPath: string;
        downloadURL: string;
      }>
    | boolean;

  // Make sure to define getAuthenticatedUserUid() and this.siteConfig.id properties in the class

  /**
   * Uploads a file without authentication.
   *
   * @param {string} path The path to the file to upload.
   * @param {File} file The file to upload.
   * @returns {Promise<string>} A promise that resolves with the URL of the uploaded file, or null if the file could not be uploaded.
   */
  uploadFileNoAuth(path: string, file: File, log?: boolean): Promise<any>;

  /**
   * Deletes a file.
   *
   * @param {string} path The path to the file to delete.
   * @returns {Promise<void>} A promise that resolves when the file is deleted.
   */
  deleteFile(path: string): Promise<void>;
}

export interface ContactsMethods {
  /**
   * Gets the user's contacts.
   *
   * @returns {Promise<Contact[]>} A promise that resolves with an array of contact objects for the user.
   * @throws {Error} If the user is not authenticated.
   */
  getUserContacts(): Promise<Contact[]>;

  /**
   * Adds an existing user to the user's contacts.
   *
   * @param {string} userId The ID of the existing user to add to the user's contacts.
   * @param {string} type The type of the contact.
   * @returns {Promise<void>} A promise that resolves when the existing user is added to the user's contacts.
   * @throws {Error} If the user is not authenticated, or if the userId is invalid.
   */
  addExistingUserToContacts(userId: string, type: string): Promise<void>;

  /**
   * Adds a new user to the user's contacts and creates a new user in the database.
   *
   * @param {User} user The new user to add to the user's contacts and to the database.
   * @param {string} type The type of the contact.
   * @returns {Promise<void>} A promise that resolves when the new user is added to the user's contacts and the database.
   * @throws {Error} If the user is not authenticated, or if the user data is invalid.
   */
  addNewUserToContacts(user: User, type: string): Promise<void>;

  /**
   * Removes a contact from the user's contacts.
   *
   * @param {string} contactIdToRemove The ID of the contact to remove from the user's contacts.
   * @returns {Promise<void>} A promise that resolves when the contact is removed from the user's contacts.
   * @throws {Error} If the user is not authenticated, or if the contact ID is invalid.
   */
  removeUserFromContacts(contactIdToRemove: string): Promise<void>;

  /**
   * Searches for all users with the given email address.
   *
   * @param {string} email The email address to search for.
   * @returns {Promise<{ id: string; data: Contact } | "no user found">} A promise that resolves with a user object if a user with the given email address is found, or "no user found" if no user with the given email address is found.
   */
  searchAllUsers(email: string): Promise<{ id: string; data: Contact } | null>;
}

export interface DocsMethods {
  /**
   * Sets the user's document.
   *
   * @param {string} path The path to the user's document.
   * @param {any} data The data to set for the user's document.
   * @returns {Promise<boolean>} A promise that resolves with true if the document was successfully set, or false if the document could not be set.
   */
  setUserDoc(path: string, data: any): Promise<boolean>;
  setDoc(path: string, data: any): Promise<boolean>;

  /** Fetches the Theme for the Site from the Database */
  getTheme(): Promise<Theme>;
  setTheme(local: Theme): Promise<Theme>;

  /**
   * Sets the user's document.
   *
   * @param {any} data The data to set for the user's document.
   * @returns {Promise<boolean>} A promise that resolves with true if the document was successfully set, or false if the document could not be set.
   */
  setUser(data: any): Promise<boolean>;

  /**
   * Gets the upload link for the given document ID and doc ID.
   *
   * @param {string} id The ID of the document.
   * @param {string} docId The ID of the doc within the document.
   * @returns {Promise<{ data: { url: string; } }>} A promise that resolves with a object containing the URL of the upload link, or null if the upload link could not be found.
   */
  getUploadLink(id: string, docId: string): Promise<{ data: { url: string } }>;

  /**
   * Generates an upload link for the given document ID.
   *
   * @param {string} id The ID of the document.
   * @param {any} data The data to set for the upload link.
   * @returns {Promise<boolean>} A promise that resolves with true if the upload link was successfully generated, or false if the upload link could not be generated.
   */
  generateUploadLink(id: string, data: any): Promise<boolean>;

  /**
   * Sets the other user's document.
   *
   * @param {string} path The path to the other user's document.
   * @param {any} data The data to set for the other user's document.
   * @param {string} otherUser The ID of the other user.
   * @returns {Promise<boolean>} A promise that resolves with true if the document was successfully set, or false if the document could not be set.
   */
  setOtherUserDoc(path: string, data: any, otherUser: string): Promise<boolean>;

  /**
   * Gets the user's collection.
   *
   * @param {string} path The path to the user's collection.
   * @returns {Promise<{ docs: { id: string; data: any; }[] }>} A promise that resolves with an array of objects containing the ID and data for each document in the user's collection, or null if the collection could not be found.
   */
  getUserCollection(path: string): Promise<{ id: string; data: any }[]>;
  getCollection(path: string): Promise<{ id: string; data: any }[]>;

  /**
   * Gets the user's document.
   *
   * @param {string} path The path to the user's document.
   * @returns {Promise<{ data: any; id: string; }>} A promise that resolves with an object containing the data and ID for the user's document, or null if the document could not be found.
   */
  getUserDoc(path: string): Promise<any>;
  getDoc(path: string): Promise<any>;

  getUser(): Promise<any>;
  /**
   * Deletes the user's document at the specified path.
   *
   * @param {string} path The path to the user's document.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating the success of the operation.
   */
  deleteUserDoc(path: string): Promise<boolean>;
}
export interface HooksMethods {
  /**
   * Gets the user's data and updates it in Firestore every `ms` milliseconds.
   *
   * @param {string} path The path to the user's document.
   * @param {number} ms The number of milliseconds between updates.
   * @returns {Array<any>} An array containing the user's data and a function to set the data.
   */
  useThrottleChange(path: string, ms?: number): Array<any>;

  /**
   * Gets the user's data for the given field and updates it in Firestore every `ms` milliseconds.
   *
   * @template T The expected type of the user's data. Defaults to string if not provided.
   * @param {string} path The path to the user's document.
   * @param {string} field The name of the field to get and update.
   * @param {number} ms The number of milliseconds between updates.
   * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} An array containing the user's data for the given field and a function to set the data.
   */
  useThrottleField<T = string>(
    path: string,
    field: string,
    ms?: number,
    log?: boolean
  ): [T, React.Dispatch<React.SetStateAction<T>>];
  useThrottleFieldNoAuth<T = string>(
    path: string,
    field: string,
    ms?: number,
    log?: boolean
  ): [T, React.Dispatch<React.SetStateAction<T>>];

  /**
   * Gets the user's data for the given field and updates it in Firestore every `ms` milliseconds.
   *
   * @param {string} path The path to the user's document.
   * @param {string} field The name of the field to get and update.
   * @param {number} ms The number of milliseconds between updates.
   * @returns {Array<any>} An array containing the user's data for the given field and a function to set the data.
   */
  useThrottleUserField(field: string, ms?: number): Array<any>;
  /**
   * A custom React Hook that provides a way to interact with the local storage of the browser.
   * It allows you to store and retrieve a value for a given key.
   * It also keeps the value in sync between multiple tabs/windows of the same origin.
   *
   * @param {string} key - The key for the local storage entry.
   *
   * @returns {string | null} The current value of the specified key in local storage.
   * If the key does not exist, or an error occurs while reading the key, null is returned.
   *
   * @example
   *
   * const storedValue = useLocalStorage('myKey');
   * // If 'myKey' is present in localStorage, its value will be stored in `storedValue`
   * // Otherwise, `storedValue` will be null
   */
  useLocalStorage(key: string): string | null;
  useUserCollection(path: string): {
    docs: { id: string; data: any }[];
    loading: boolean;
    error: Error | null | undefined;
  };
  useCollection(path: string): {
    docs: { id: string; data: any }[];
    loading: boolean;
    error: Error | null | undefined;
  };
}
