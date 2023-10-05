import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading, useEloise } from "../..";

/**
 * A React component that conditionally renders its children based on the user's authentication status.
 *
 * @param {Object} props - The component properties.
 * @param {React.ReactElement} props.children - The React elements to render when the user is authenticated.
 * @returns {React.ReactElement} Returns a Loading component if the user data is not yet available, otherwise returns the children.
 *
 * @example
 * // Example usage within another component
 * import UserDependentWidget from './path/to/UserDependentWidget';
 *
 * function ParentComponent() {
 *   return (
 *     <UserDependentWidget>
 *       <div>User is authenticated! Display this content.</div>
 *     </UserDependentWidget>
 *   );
 * }
 */
export const UserDependentWidget: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const { logic } = useEloise();
  const [user] = useAuthState(logic.fb.auth);

  return user ? children : <Loading />;
};
