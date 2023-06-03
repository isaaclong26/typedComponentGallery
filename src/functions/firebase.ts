import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  DocumentData,
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  StorageReference,
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getDatabase } from "firebase/database";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { throttle } from "lodash";
import { useEffect, useState } from "react";
import { FirebaseConfig, SiteConfig } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { HooksMethods, DocsMethods, StorageMethods, ContactsMethods , Contact, User} from "./firebasetypes";

/**
 * The FB class provides methods for interacting with Firebase services.
 */
export interface FBInterface {
  /**
   * The Firestore app instance.
   *
   * @type {any}
   */
  app: any;

  /**
   * The Firestore database instance.
   *
   * @type {any}
   */
  db: any;

  /**
   * The Firebase Auth instance.
   *
   * @type {any}
   */
  auth: any;

  /**
   * The Firebase Storage instance.
   *
   * @type {any}
   */
  storage: any;

  /**
   * The Firebase Database instance.
   *
   * @type {any}
   */
  database: any;

  /**
   * The site configuration.
   *
   * @type {SiteConfig}
   */
  siteConfig: SiteConfig;

  /**
   * Constructs a new FB instance.
   *
   * @param {any} config The configuration object.
   * @param {SiteConfig} siteConfig The site configuration.
   */
  contacts: ContactsMethods,
  docs: DocsMethods,
  hooks: HooksMethods,
  storageMethods: StorageMethods
  getAuthenticatedUserUid(): string  ;
}

class FB implements FBInterface {
  app: any = '';
  db: any = '';
  auth: any = '';
  storage: any = '';
  database: any = '';
  siteConfig: SiteConfig;

  constructor(config: any, siteConfig: SiteConfig) {
    if(config.config){
    this.app = initializeApp(config.config);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
    this.storage = getStorage(this.app);
    this.database = getDatabase(this.app);
    }
    this.siteConfig = siteConfig;
  }

  getAuthenticatedUserUid= ()=> {
    const user = this.auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return 'not logged in';
    }
  }


  storageMethods: StorageMethods = {
    getUserStorageFolder: async (path: string): Promise<any> => {
      const uid = this.getAuthenticatedUserUid();

      if (!uid) {
        return false;
      } else {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          "users/" + uid + "/" + this.siteConfig.id + "/Main/" + path
        );

        try {
          const res = await listAll(storageRef);
          const files = await Promise.all(
            res.items.map(async (item) => {
              const downloadURL = await getDownloadURL(item);
              return {
                name: item.name,
                fullPath: item.fullPath,
                downloadURL,
              };
            })
          );
          return files;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    },

    uploadFile: async (path: string, file: File): Promise<any | boolean> => {
      const uid = this.getAuthenticatedUserUid();

      if (!uid) {
        return false;
      } else {
        const storageRef = ref(
          this.storage,
          "users/" +
            uid +
            "/" +
            this.siteConfig.id +
            "/Main/" +
            path +
            "/" +
            file.name
        );

        try {
          const uploadTask = uploadBytesResumable(storageRef, file);

          // We return a new promise that resolves with the file object when the upload completes
          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                console.error(error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );

                resolve({
                  name: file.name,
                  fullPath:
                    "users/" +
                    uid +
                    "/" +
                    this.siteConfig.id +
                    "/Main/" +
                    path +
                    "/" +
                    file.name,
                  downloadURL,
                });
              }
            );
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          return false;
        }
      }
    },
    uploadOtherUserFile: async (
      path: string,
      userId: string,
      file: File
    ): Promise<any | boolean> => {
      if (!userId) {
        return false;
      } else {
        const storageRef = ref(
          this.storage,
          "users/" +
            userId +
            "/" +
            this.siteConfig.id +
            "/Main/" +
            path +
            "/" +
            file.name
        );

        try {
          const uploadTask = uploadBytesResumable(storageRef, file);

          // We return a new promise that resolves with the file object when the upload completes
          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                console.error(error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );

                resolve({
                  name: file.name,
                  fullPath:
                    "users/" +
                    userId +
                    "/" +
                    this.siteConfig.id +
                    "/Main/" +
                    path +
                    "/" +
                    file.name,
                  downloadURL,
                });
              }
            );
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          return false;
        }
      }
    },
    uploadFileNoAuth:async(path: string, file: File)=> {
      const storageRef = ref(this.storage, path + "/" + file.name);
  
      try {
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can use this function to observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              return downloadURL; // you can return the URL of the uploaded file here
            });
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
   deleteFile:async(path: string)=> {
      const storageRef = ref(this.storage, path);
  
      try {
        await deleteObject(storageRef);
        console.log("File deleted successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    },
  };

  contacts: ContactsMethods = {
    getUserContacts: async () => {
      const uid = this.getAuthenticatedUserUid();
    
      const userContactsCollectionRef = collection(
        this.db,
        "users/" + uid + "/" + this.siteConfig.id + "/Main/contacts"
      );
      const contactsQuerySnapshot = await getDocs(userContactsCollectionRef);
    
      let contactObjects: Array<Contact> = [];
      contactsQuerySnapshot.forEach((contactDoc) => {
        const contactData = contactDoc.data();
    
        contactObjects.push({
          user: contactData.user,
          type: contactData.type,
          initials: contactData.initials,
          email: contactData.email,
        });
      });
    
      return contactObjects;
    },
    
    addExistingUserToContacts: async (userId: string, type: string) => {
      const uid = this.getAuthenticatedUserUid();
    
      const contactUserDocRef = doc(this.db, "users/" + userId);
      const contactUserDoc = await getDoc(contactUserDocRef);
    
      if (!contactUserDoc.exists()) {
        console.warn("User document not found");
        return;
      }
    
      const contactUserData = contactUserDoc.data();
    
      const newContact: Contact = {
        user: userId,
        type: type,
        initials: contactUserData.first[0] + contactUserData.last[0],
        email: contactUserData.email,
      };
    
      const userContactsCollectionRef = collection(
        this.db,
        "users/" + uid + "/" + this.siteConfig.id + "/Contacts"
      );
    
      await addDoc(userContactsCollectionRef, newContact);
    },
    
    addNewUserToContacts: async (user: User, type: string) => {
      const uid = this.getAuthenticatedUserUid();
    
      // Create the new user document
      const newUserDocRef = doc(this.db, "users");
      const newUser = {
        ...user,
        account: false,
      };
    
      await setDoc(newUserDocRef, newUser);
    
      const newUserId = newUserDocRef.id;
    
      const newContact: Contact = {
        user: newUserId,
        type: type,
        initials: user.first[0] + user.last[0],
        email: user.email,
      };
    
      const userContactsCollectionRef = collection(
        this.db,
        "users/" + uid + "/" + this.siteConfig.id + "/Contacts"
      );
    
      await addDoc(userContactsCollectionRef, newContact);
    },
    
    
    removeUserFromContacts: async (contactIdToRemove: string) => {
      const uid = this.getAuthenticatedUserUid();
    
      const contactDocRef = doc(
        this.db,
        "users/" + uid + "/" + this.siteConfig.id + "/Main/contacts/" + contactIdToRemove
      );
    
      // Deleting the document in the contacts collection
      await deleteDoc(contactDocRef);
    },
    
    searchAllUsers: async(email: string) =>{
      let ots;
      try {
        const q = query(
          collection(this.db, "users"),
          where("apps", "array-contains", this.siteConfig.id),
          where("email", "==", email)
        );
  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          ots = { id: doc.id, data: doc.data() };
        });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
  
      return ots ? ots : null;
    },
    
  };

  docs: DocsMethods = {
  setUserDoc: async(path: string, data: any)=> {
    const test = this.getAuthenticatedUserUid();
    if (!test) {
      return false;
    } else {
      const ots: any = await setDoc(
        doc(
          this.db,
          "users/" + test + "/" + this.siteConfig.id + "/Main/" + path
        ),
        data
      );
      if (ots) {
        return true;
      }
      return false;
    }
  },
  getUploadLink: async (id: string, docId: string)=> {
    const ots: any = await getDoc(
      doc(this.db, "utils/uploadLinks/" + id + "/" + docId)
    );
    return {
      data: ots.data(),
      id: ots.id,
    };
  },

   generateUploadLink:async(id: string, data: any)=> {
    const ots: any = await setDoc(
      doc(this.db, "utils/uploadLinks/" + id),
      data
    );
    if (ots) {
      return true;
    }
    return false;
  },
  setOtherUserDoc: async(path: string, data: any, otherUser: string) =>{
    if (!test) {
      return false;
    } else {
      const ots: any = await setDoc(
        doc(
          this.db,
          "users/" + otherUser + "/" + this.siteConfig.id + "/Main/" + path
        ),
        data
      );
      if (ots) {
        return true;
      }
      return false;
    }
  },
   getUserCollection: async(path: string)=> {
    const test = this.getAuthenticatedUserUid();
    if (!test) {
      return false;
    } else {
      const ots: any = await getDocs(
        collection(
          this.db,
          "users/" + test + "/" + this.siteConfig.id + "/Main/" + path
        )
      );
      return ots.docs.map((doc: any) => {
        const temp = doc.data();
        const ots = {
          id: doc.id,
          data: doc.data(),
        };
        return ots;
      });
    }
  },

  // Make sure to define getAuthenticatedUserUid() and this.siteConfig.id properties in the class

 
 getUserDoc: async(path: string) =>{
    const test = this.getAuthenticatedUserUid();
    if (!test) {
      return false;
    } else {
      const ots: any = await getDoc(
        doc(
          this.db,
          "users/" + test + "/" + this.siteConfig.id + "/Main/" + path
        )
      );
      return {
        data: ots.data(),
        id: ots.id,
      };
    }
  }
  }
 
  /**
   * A custom hook for throttling state updates to Firebase.
   *
   * @function useThrottleChange
   * @param {string} path - The path in Firebase where the data should be stored.
   * @param {number} [ms=150] - The number of milliseconds to throttle the state update.
   * @returns {Array} - An array containing the current state value and a function to update it.
   *
   * @example
   * const [data, setData] = useThrottleChange('path/to/your/firebase/document');
   *
   * return (
   *   <input
   *     type="text"
   *     value={data}
   *     onChange={(e) => setData(e.target.value)}
   *   />
   * );
   */
  hooks: HooksMethods= {

  useThrottleChange:(path: string, ms: number = 150): Array<any>=> {
    const [data, setData] = useState("");
    const [initialDataFetched, setInitialDataFetched] = useState(false);

    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const doc = await this.docs.getUserDoc(path);
          if (doc) setData(doc.data);

          setInitialDataFetched(true);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        }
      };

      if (!initialDataFetched) {
        fetchInitialData();
      }
    }, [path, initialDataFetched]);

    useEffect(() => {
      const updateFirestore = throttle(async (newValue) => {
        try {
          const result = await this.docs.setUserDoc(path, { value: newValue });
          if (result) {
            console.log("Value updated successfully");
          } else {
            console.error("Error updating value: User not authenticated");
          }
        } catch (error) {
          console.error("Error updating value:", error);
        }
      }, ms);

      if (initialDataFetched && data) {
        updateFirestore(data);
      }
    }, [data, ms, path, initialDataFetched]);

    return [data, setData];
  },

  useThrottleField:(path: string, field: string, ms: number = 150): Array<any>=> {
    const [user, loading, error] = useAuthState(this.auth);

    const [data, setData] = useState("");
    const [initialDataFetched, setInitialDataFetched] = useState(false);

    useEffect(() => {
      if (user) {
        const fetchInitialData = async () => {
          try {
            const doc = await this.docs.getUserDoc(path);
            if (doc) {
              if (doc.data) {
                setData(doc.data[field]);
              }
            }

            setInitialDataFetched(true);
          } catch (error) {
            console.error("Error fetching initial data:", error);
          }
        };

        if (!initialDataFetched) {
          fetchInitialData();
        }
      }
    }, [path, initialDataFetched]);

    useEffect(() => {
      if (user) {
        const updateFirestore = throttle(async (newValue) => {
          try {
            let prev: any = await this.docs.getUserDoc(path);
            if (prev.data) {
              prev = prev.data;
            } else {
              prev = {};
            }
            let ots: { [key: string]: any } = { ...prev };
            ots[field] = newValue;
            const result = await this.docs.setUserDoc(path, ots);
          } catch (error) {
            console.error("Error updating value:", error);
          }
        }, ms);

        if (initialDataFetched && data) {
          updateFirestore(data);
        }
      }
    }, [data, ms, path, initialDataFetched]);

    return [data, setData];
  }
  }
}

export { FB };
