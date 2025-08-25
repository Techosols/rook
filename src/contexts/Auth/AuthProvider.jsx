import{ useEffect } from "react";
import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../services/api";

const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Basic login function
  const login = () => loginWithRedirect();

  // Basic logout function
  const handleLogout = () => logout({ returnTo: window.location.origin });

  const verifyUserExistenceByEmail = async (email) => {
      await api.get(`user/${email}`)
      .then(response => {
          if (response) {
              console.log('User exists:', response);
          } else {
              console.log('User does not exist');
          }
      })
      .catch(error => {
          console.error('Error verifying user:', error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      // User is authenticated, you can perform actions here
      console.log('User is authenticated:', user);
      verifyUserExistenceByEmail(user.email);
    }
  }, [isAuthenticated, user])

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
