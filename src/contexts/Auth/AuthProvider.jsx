import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useTab from "../../hooks/useTab";

const AuthProvider = ({ children }) => {

  const { user, isAuthenticated, loginWithRedirect, loginWithPopup, error } = useAuth0();

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userExternalId, setUserExternalId ] = useState(null);
  const [ needProfileCompletion, setNeedProfileCompletion ] = useState(false);
  const [ needPayment, setNeedPayment ] = useState(false);
  const [ profileEmail, setProfileEmail ] = useState(null);
  const [ authFlow, setAuthFlow ] = useState(null)

  const { setActiveTab }= useTab()

  const login = () => loginWithRedirect();
  const loginPopup = (options) => loginWithPopup(options);
  
  useEffect(() => {
   const savedState = localStorage.getItem('RKU'); // RKU => Rook User

   if(savedState) {
    setIsLoggedIn(true)
    setActiveTab('matches')
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if(isLoggedIn) {
      localStorage.setItem('RKU', true) // RKU => Rook User
    }
  }, [isLoggedIn])



  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginWithPopup: loginPopup,
      needPayment,
      setNeedPayment,
      needProfileCompletion,
      setNeedProfileCompletion,
      userExternalId,
      setUserExternalId,
      isLoggedIn,
      setIsLoggedIn,
      profileEmail,
      setProfileEmail,
      error,
      authFlow, setAuthFlow
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;