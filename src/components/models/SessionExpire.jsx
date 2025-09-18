
import { useState, useEffect } from "react";
import { TimerOff, LogIn, RotateCcw } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import useTab from "../../hooks/useTab";
import userService from "../../services/user";

function SessionExpire() {
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
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-4 text-yellow-500 dark:text-yellow-400">
        <TimerOff size={56} />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Session Expired</h2>
      <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
        Your session has expired due to inactivity or security reasons.<br />
        For your protection, you have been logged out.<br />
        <span className="font-semibold">Please log in again to continue.</span>
      </p>
      <ul className="text-sm text-gray-500 dark:text-gray-400 mb-6 list-disc pl-6">
        <li>All unsaved changes may be lost.</li>
        <li>For best security, always log out when finished.</li>
        <li>If you see this often, check your internet connection or browser settings.</li>
      </ul>
      <div className="flex flex-col md:flex-row gap-2">
        <button
          className="px-6 py-2 rounded-lg bg-secondary dark:bg-secondary-dark text-white font-semibold shadow hover:bg-secondary-dark hover:text-primary hover:border hover:border-secondary transition-colors flex items-center gap-2"
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={20} />
          Reload Page
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-primary dark:bg-primary-dark text-white font-semibold shadow hover:bg-primary-dark transition-colors flex items-center gap-2"
          onClick={handleLogin}
          disabled={loading || allowLogin === false}
        >
          <LogIn size={20} />
          Login Again
        </button>
      </div>
    </div>
  );
}

export default SessionExpire;
