import { collection, getDocs } from "firebase/firestore";
import { DependencyList, useEffect, useRef, useState } from "react";
import { Logic } from ".";

/**
 * A class that contains various utility functions for making API calls, handling input events,
 * and more.
 * @class
 */

export const Hooks: { [key: string]: any } = {
  useFocus: () => {
    const domRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      domRef.current?.focus();
    }, [domRef]);

    return {
      domRef,
    };
  },

  async useUserCollection(logic: Logic, path: string) {
    const userUid = logic.fb.getAuthenticatedUserUid();
    const userPath = userUid ? `users/${userUid}/${path}` : null;

    const ots: any = await getDocs(
      collection(
        logic.fb.db,
        "users/" + userUid + "/" + logic.fb.siteConfig.id + "/Main/" + path
      )
    );
    return ots.docs.map((doc: any) => {
      const temp = doc.data();
      const ots = {
        id: doc.id,
        data: temp.data,
      };
      return ots;
    });
  },
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
  useLocalStorage(key: string): string | null {
    const [value, setValue] = useState<string | null>(() => {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
        return null;
      }
    });

    useEffect(() => {
      const onStorageChange = (e: StorageEvent) => {
        if (e.key === key) {
          setValue(e.newValue);
        }
      };

      window.addEventListener("storage", onStorageChange);
      return () => {
        window.removeEventListener("storage", onStorageChange);
      };
    }, [key]);

    return value;
  },

  /**
   * A custom hook that handles asynchronous operations inside a useEffect loop.
   * It ensures that the async function is only called when the specified dependencies change,
   * and it properly handles cleanup when the component is unmounted.
   *
   * @param {Function} asyncFunction - The asynchronous function to be called inside useEffect.
   * @param {Array} dependencies - An array of dependencies for the useEffect hook.
   */

  useAsyncEffect: (
    asyncFunction: () => any,
    dependencies: DependencyList | undefined
  ) => {
    useEffect(() => {
      let isMounted = true;

      const wrappedAsyncFunction = async () => {
        try {
          await asyncFunction();
        } catch (error) {
          if (isMounted) {
            console.error("An error occurred in useAsyncEffect:", error);
          }
        }
      };

      wrappedAsyncFunction();

      return () => {
        isMounted = false;
      };
    }, dependencies);
  },
};
