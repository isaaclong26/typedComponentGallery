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
    getUserStorageFolder(path: string): Promise<{
      name: string;
      fullPath: string;
      downloadURL: string;
    }[]>;
  
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
    uploadFile(path: string, file: File): Promise<{
      name: string;
      fullPath: string;
      downloadURL: string;
    }> | boolean;
  
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
    uploadOtherUserFile(path: string, userId: string, file: File): Promise<{
      name: string;
      fullPath: string;
      downloadURL: string;
    }> | boolean;
  }
  export interface ContactsMethods {
    /**
     * Gets the user's contacts.
     *
     * @returns {Promise<{
     *   id: string;
     *   first: string;
     *   last: string;
     *   email: string;
     * }[]>} A promise that resolves with an array of contact objects for the user.
     * @throws {Error} If the user is not authenticated.
     */
    getUserContacts(): Promise<{
      id: string;
      first: string;
      last: string;
      email: string;
    }[]>;
  
    /**
     * Adds a user to the user's contacts.
     *
     * @param {string} userIdToAdd The ID of the user to add to the user's contacts.
     * @returns {Promise<void>} A promise that resolves when the user is added to the user's contacts.
     * @throws {Error} If the user is not authenticated, or if the user ID is invalid.
     */
    addUserToContacts(userIdToAdd: string): Promise<void>;
  
    /**
     * Removes a user from the user's contacts.
     *
     * @param {string} userIdToRemove The ID of the user to remove from the user's contacts.
     * @returns {Promise<void>} A promise that resolves when the user is removed from the user's contacts.
     * @throws {Error} If the user is not authenticated, or if the user ID is invalid.
     */
    removeUserFromContacts(userIdToRemove: string): Promise<void>;
    /**
     * Searches for all users with the given email address.
     *
     * @param {string} email The email address to search for.
     * @returns {Promise<{ id: string; data: { email: string; } } | "no user found">} A promise that resolves with a user object if a user with the given email address is found, or "no user found" if no user with the given email address is found.
     */
    searchAllUsers(email: string): Promise<{ id: string; data: { email: string; } } | "no user found">;
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
  
    /**
     * Gets the upload link for the given document ID and doc ID.
     *
     * @param {string} id The ID of the document.
     * @param {string} docId The ID of the doc within the document.
     * @returns {Promise<{ data: { url: string; } }>} A promise that resolves with a object containing the URL of the upload link, or null if the upload link could not be found.
     */
    getUploadLink(id: string, docId: string): Promise<{ data: { url: string; } }>;
  
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
    getUserCollection(path: string): Promise<{ docs: { id: string; data: any; }[] }>;
  
    // Make sure to define getAuthenticatedUserUid() and this.siteConfig.id properties in the class
  
    /**
     * Uploads a file without authentication.
     *
     * @param {string} path The path to the file to upload.
     * @param {File} file The file to upload.
     * @returns {Promise<string>} A promise that resolves with the URL of the uploaded file, or null if the file could not be uploaded.
     */
    uploadFileNoAuth(path: string, file: File): Promise<any>;
  
    /**
     * Deletes a file.
     *
     * @param {string} path The path to the file to delete.
     * @returns {Promise<void>} A promise that resolves when the file is deleted.
     */
    deleteFile(path: string): Promise<void>;
  
    /**
     * Gets the user's document.
     *
     * @param {string} path The path to the user's document.
     * @returns {Promise<{ data: any; id: string; }>} A promise that resolves with an object containing the data and ID for the user's document, or null if the document could not be found.
     */
    getUserDoc(path: string): Promise<any>;
  }
  export interface HooksMethods {
    /**
     * Gets the user's data and updates it in Firestore every `ms` milliseconds.
     *
     * @param {string} path The path to the user's document.
     * @param {number} ms The number of milliseconds between updates.
     * @returns {Array<any>} An array containing the user's data and a function to set the data.
     */
    useThrottleChange(path: string, ms: number ): Array<any>;
  
    /**
     * Gets the user's data for the given field and updates it in Firestore every `ms` milliseconds.
     *
     * @param {string} path The path to the user's document.
     * @param {string} field The name of the field to get and update.
     * @param {number} ms The number of milliseconds between updates.
     * @returns {Array<any>} An array containing the user's data for the given field and a function to set the data.
     */
    useThrottleField(path: string, field: string, ms: number ): Array<any>;
  }