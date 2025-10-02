import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useTab from "../../hooks/useTab";
import api from "../../services/api";

const AuthProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup,
    error,
    getIdTokenClaims,
  } = useAuth0();



  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userExternalId, setUserExternalId] = useState(null);
  const [needProfileCompletion, setNeedProfileCompletion] = useState(false);
  const [needPayment, setNeedPayment] = useState(false);
  const [profileEmail, setProfileEmail] = useState(null);
  const [authFlow, setAuthFlow] = useState(null);
  const [token, setToken] = useState(null);

  const { setActiveTab } = useTab();

  const login = () => loginWithRedirect();
  const loginPopup = (options) => loginWithPopup(options);


  console.log("Token:", token);


  useEffect(() => {
    const savedState = localStorage.getItem("RKU"); // RKU => Rook User
    const savedToken = localStorage.getItem("RKT"); // RKT => Rook Token

    if (savedState) {
      setIsLoggedIn(true);
      setActiveTab("matches");
    }

    if (savedToken) {
      setToken(savedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = async () => {
    const claim = await getIdTokenClaims();
    const authToken = claim.__raw;
    if (authToken) {
      setToken(authToken);
      localStorage.setItem("RKT", authToken); // RKT => Rook Token
    }
  };

  const getUserExternalId = async () => {
    try {
      const response = await api.get(`v2/user/${user?.email}`);
      setUserExternalId(response.data.externalId);
    } catch (error) {
      console.error('Error fetching user external ID:', error);
    }
  };


  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("RKU", true); // RKU => Rook User
      getUserExternalId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (isAuthenticated) {
      getToken();
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  

  return (
    <AuthContext.Provider
      value={{
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
        authFlow,
        setAuthFlow,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
