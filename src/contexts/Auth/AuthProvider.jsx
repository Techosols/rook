import { Children } from "react";
import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Basic login function
  const login = () => loginWithRedirect();

  // Basic logout function
  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout: handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
