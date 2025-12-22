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

  // Log auth token updates
  useEffect(() => {
    if (token) console.log("✔ Auth Token Updated:", token);
  }, [token]);

  // Log auth state changes
  useEffect(() => {
    console.log("✔ Auth State Changed: isAuthenticated =", isAuthenticated, ", user =", user);
  }, [isAuthenticated, user]);

  // Function to get Auth0 token
  const getToken = async () => {
    try {
      const claim = await getIdTokenClaims();
      if (!claim) {
        console.error("getIdTokenClaims returned undefined.");
        return;
      }
      const authToken = claim.__raw;
      if (authToken) {
        setToken(authToken);
        localStorage.setItem("RKT", authToken);
        console.log("Auth Token generated:", authToken);
      } else {
        console.error("No auth token found in claims.");
      }
    } catch (err) {
      console.error("Error getting auth token:", err);
    }
  };

  // Function to fetch external user ID from backend
  const getUserExternalId = async () => {
    if (!user?.email) return;
    try {
      const response = await fetch(
        `/api/fetch-data?endpoint=user/${encodeURIComponent(user.email)}`
      );
      const data = await response.json();
      setUserExternalId(data.externalId);
    } catch (err) {
      console.error("Error fetching user external ID:", err);
    }
  };

  // Unified effect: handle authentication and persistence
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setIsLoggedIn(true);
      localStorage.setItem("RKU", true);
      setActiveTab("matches");
      getToken();
      getUserExternalId();
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("RKU");
      setUserExternalId(null);
      setToken(null);
    }
  }, [isAuthenticated, user]);

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
