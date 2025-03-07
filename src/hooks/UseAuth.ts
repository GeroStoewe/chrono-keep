import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Custom hook to access the AuthContext.
 *
 * This hook provides an easy way to access the authentication context in any component.
 * It ensures that the hook is used within an AuthProvider, throwing an error otherwise.
 *
 * @throws {Error} If used outside of an AuthProvider.
 * @returns {object} The authentication context containing user data and auth functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
