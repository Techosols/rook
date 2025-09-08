import AuthContext from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useTab from "../../hooks/useTab";

const AuthProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup,
    error,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userExternalId, setUserExternalId] = useState(null);
  const [needProfileCompletion, setNeedProfileCompletion] = useState(false);
  const [needPayment, setNeedPayment] = useState(false);
  const [profileEmail, setProfileEmail] = useState(null);
  const [authFlow, setAuthFlow] = useState(null);
  const [token, setToken] = useState(null);

  console.log("Auth0 Token :", token);

  const { setActiveTab } = useTab();

  const login = () => loginWithRedirect();
  const loginPopup = (options) => loginWithPopup(options);

  useEffect(() => {
    const savedState = localStorage.getItem("RKU"); // RKU => Rook User
    const savedToken = localStorage.getItem("RKT"); // RKT => Rook Token

    if (savedState) {
      setIsLoggedIn(true);
      setActiveTab("matches");
    }

    if (savedToken) {
      setToken(savedToken);
    } else {
      getToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = async () => {
    const claim = await getIdTokenClaims();
    const authToken = claim?.__raw;
    setToken(authToken);
    localStorage.setItem("RKT", authToken); // RKT => Rook Token
  };

  const getAccessToken = async () => {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: "https://user-info-service.rook.love", // API Identifier
        scope: "read:settings", // or whatever scopes backend expects
      },
    });
    setToken(accessToken);
    localStorage.setItem("RKT", accessToken); // RKT => Rook Token
  };

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("RKU", true); // RKU => Rook User
      getToken()
      //getAccessToken();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isAuthenticated) {
      getToken()
      //getAccessToken();
    }
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
