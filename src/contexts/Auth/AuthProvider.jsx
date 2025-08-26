import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const AuthProvider = ({ children }) => {

  const { user, isAuthenticated, loginWithRedirect, loginWithPopup, logout } = useAuth0();

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userExternalId, setUserExternalId ] = useState(null);
  const [ needProfileCompletion, setNeedProfileCompletion ] = useState(false);
  const [ needPayment, setNeedPayment ] = useState(false);


  console.log("🔵 AuthProvider - is LoggedIn: ", isLoggedIn);

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
      logout: handleLogout,
      needPayment,
      setNeedPayment,
      needProfileCompletion,
      setNeedProfileCompletion,
      userExternalId,
      setUserExternalId,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;