import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { StorageReference, getStorage, ref  } from "firebase/storage";
import {  getDatabase } from 'firebase/database';
import { collection, getDocs, getDoc } from "firebase/firestore"
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import {useCollection} from "react-firebase-hooks/firestore"
import { SiteConfig } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
/**
 * The FB class provides methods for interacting with Firebase services.
 */
class FB {
    app: any;
    db: any;
    auth: any;
    storage: any;
    database: any;
    siteConfig:SiteConfig;

   
   constructor (config: any, siteConfig:SiteConfig) {
        this.app = initializeApp(config.config);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        this.storage = getStorage(this.app);
        this.database = getDatabase(this.app);
        this.siteConfig = siteConfig
        
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
          const ots: any = await getDocs(collection(this.db, "users/" + test + "/"+ this.siteConfig.id + "/Main/"  + path));
          return ots.docs.map((doc: any) => {
              const temp = doc.data();
              const ots = {
                  id: doc.id,
                  data: doc.data()
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
            const ots: any = await getDoc(doc(this.db, "users/" + test + "/"+ this.siteConfig.id + "/Main/"  + path));
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
            const ots: any = await setDoc(doc(this.db, "users/" + test + "/" + this.siteConfig.id + "/Main/"  +path), data);
            if(ots){
                return true
            }
            return false;
        }
      
    }
    async setOtherUserDoc(path: string, data:any, otherUser: string) {
      if (!test) {
          return false;
      } else {
          const ots: any = await setDoc(doc(this.db, "users/" + otherUser + "/" + this.siteConfig.id + "/Main/"  +path), data);
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

  useThrottleField(path: string, field:string, ms: number = 150): Array<any> {

    const [user, loading, error] = useAuthState(this.auth)
    
    const [data, setData] = useState("");
    const [initialDataFetched, setInitialDataFetched] = useState(false);
  
    useEffect(() => {
      if(user){
      const fetchInitialData = async () => {
        try {
          const doc = await this.getUserDoc(path);
          if(doc){
            if(doc.data){
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
      if(user){
      const updateFirestore = throttle(async (newValue) => {
        try {

          let prev:any = await this.getUserDoc(path)
          if(prev.data){
            prev = prev.data
          }
          else{
              prev = {}
          }
          let ots: {[key:string]:any} = {...prev}
          ots[field] = newValue
          const result = await this.setUserDoc(path, ots);
        
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

export { FB };
