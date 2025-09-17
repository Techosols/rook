


import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import useTab from "../../hooks/useTab";
import userService from "../../services/user";
import { ShieldAlert, RotateCcw, LogIn, Loader } from "lucide-react";


function InvalidToken() {
  const { loginWithPopup, user, isAuthenticated, error } = useAuth0();
  const { setIsLoggedIn, authFlow, setAuthFlow } = useAuth();
  const { setActiveTab } = useTab();
  const [allowLogin, setAllowLogin] = useState(null);
  const [allowLoginMessage, setAllowLoginMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch login permission on mount
    const fetchData = async () => {
      try {
        const response = await api.get('v2/settings');
        setAllowLogin(response.data.allowUserLogins);
        setAllowLoginMessage(response.data.disallowUserLoginsMessage);
      } catch (err) {
        setAllowLogin(false);
        setAllowLoginMessage("Unable to fetch login settings.");
      }
    };
    fetchData();
  }, []);

  async function loginUser() {
    setLoading(true);
    try {
      const response = await userService.verifyUserExistenceByEmail(user?.email, 'login');
      if (response.status === 204) {
        setActiveTab("join");
      } else if (response.status === 200) {
        setIsLoggedIn(true);
        setActiveTab('matches');
      }
    } catch (err) {
      toast.error("User verification failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault && e.preventDefault();
    setLoading(true);
    if (allowLogin) {
      try {
        await loginWithPopup({
          authorizationParams: {
            prompt: "login",
          },
        });
        setAuthFlow('login');
      } catch (err) {
        console.log('ERR_LOGIN_POPUP', err);
        toast.error("Login failed. Please try again.");
      }
    } else {
      toast.error(allowLoginMessage);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated && authFlow === 'login') {
      loginUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, authFlow]);

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="mb-4 text-red-500 dark:text-red-400">
        <ShieldAlert size={56} />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Invalid Token</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        Your authentication token is invalid or has expired.<br />
        Please log in again to continue.
      </p>
      <div className="flex items-center flex-col md:flex-row gap-2">
        <button
          className="mt-2 px-6 py-2 rounded-lg bg-secondary dark:bg-secondary-dark text-white font-semibold shadow hover:bg-secondary-dark hover:text-primary hover:border hover:border-secondary transition-colors flex items-center gap-2"
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={20} />
          Reload
        </button>
        <button
          className="mt-2 px-6 py-2 rounded-lg bg-primary dark:bg-primary-dark text-white font-semibold shadow hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading && <Loader className="animate-spin rounded-full me-2" />}
          {loading ? "Signing In..." : "Login"}
          <LogIn size={20} />
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-sm text-center">{error.toString()}</div>
      )}
      {allowLogin === false && allowLoginMessage && (
        <div className="mt-2 text-yellow-600 text-sm text-center">{allowLoginMessage}</div>
      )}
    </div>
  );
}

export default InvalidToken;
