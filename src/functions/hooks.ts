import axios from "axios";
import { DependencyList, useEffect, useRef, useState } from "react";
import { FB } from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Logic } from ".";


/**
 * A class that contains various utility functions for making API calls, handling input events,
 * and more.
 * @class
 */

export const Hooks: {[key: string]:any} = {


  useFocus :() => {
    const domRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      domRef.current?.focus();
   },[domRef]);

    return {
      domRef,
    };
 },
 async useUserCollection (logic:Logic, path:string) {


  const userUid = logic.fb.getAuthenticatedUserUid();
  const userPath = userUid ? `users/${userUid}/${path}` : null;

  const ots: any = await getDocs(  collection(logic.fb.db, "users/" + userUid+ "/" + logic.fb.siteConfig.id +"/Main/"+ path))
  return ots.docs.map((doc: any) => {
    const temp = doc.data();
    const ots = {
        id: doc.id,
        data: temp.data
    };
    return ots;
});
 
},

/**
 * A custom hook that handles asynchronous operations inside a useEffect loop.
 * It ensures that the async function is only called when the specified dependencies change,
 * and it properly handles cleanup when the component is unmounted.
 *
 * @param {Function} asyncFunction - The asynchronous function to be called inside useEffect.
 * @param {Array} dependencies - An array of dependencies for the useEffect hook.
 */
 useAsyncEffect:  (asyncFunction: () => any, dependencies: DependencyList | undefined)=> {
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
},



}
