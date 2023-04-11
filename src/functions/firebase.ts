import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { StorageReference, getStorage, ref  } from "firebase/storage";
import {  getDatabase } from 'firebase/database';
import { collection, getDocs, getDoc } from "firebase/firestore"
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

class FB {
    app: any;
    db: any;
    auth: any;
    storage: any;
    database: any;

    constructor (config: any) {
        this.app = initializeApp(config.config);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        this.storage = getStorage(this.app);
        this.database = getDatabase(this.app);
    }

    getAuthenticatedUserUid(): string | null {
        const user = this.auth.currentUser;
        if (user) {
            return user.uid;
        } else {
            return null;
        }
    }

    async getUserCollection(path: string) {
        const test = this.getAuthenticatedUserUid();
        if (!test) {
            return false;
        } else {
            const ots: any = await getDocs(collection(this.db, "users/" + test + "/" + path));
            return ots.docs.map((doc: any) => {
                const temp = doc.data();
                const ots = {
                    id: doc.id,
                    data: temp.data
                };
                return ots;
            });
        }
    }

    async getUserDoc(path: string) {
        const test = this.getAuthenticatedUserUid();
        if (!test) {
            return false;
        } else {
            const ots: any = await getDoc(doc(this.db, "users/" + test + "/" + path));
            return {
                data: ots.data(),
                id: ots.id
            };
        }
    }

    async setUserDoc(path: string, data:any) {
        const test = this.getAuthenticatedUserUid();
        if (!test) {
            return false;
        } else {
            const ots: any = await setDoc(doc(this.db, "users/" + test + "/" + path), data);
            if(ots){
                return true
            }
            return false;
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

 useThrottleChange(path: string, ms: number = 150): Array<any> {
    
    const [data, setData] = useState("");
    const [initialDataFetched, setInitialDataFetched] = useState(false);
  
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const doc = await this.getUserDoc(path);
          if(doc)setData(doc.data);

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
          const result = await this.setUserDoc(path, { value: newValue });
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
  }

}

export { FB };
