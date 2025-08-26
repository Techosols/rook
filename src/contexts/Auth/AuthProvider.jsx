import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {

  const { user, isAuthenticated, loginWithRedirect, loginWithPopup, logout } = useAuth0();

  // Login with redirect
  const login = () => loginWithRedirect();
  // Login with popup
  const loginPopup = (options) => loginWithPopup(options);
  // Logout
  const handleLogout = () => logout({ returnTo: window.location.origin });



  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginWithPopup: loginPopup,
      logout: handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;