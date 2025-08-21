import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

import Agreement from "../../components/join/Agreement";
import SignupOption from "../../components/join/SignupOption";
import Profile from "../../components/join/Profile.jsx";
import Payment from "../../components/join/Payment.jsx";

import { useAuth0 } from "@auth0/auth0-react";
import useTab from "../../hooks/useTab";

function Join() {
  const [step, setStep] = useState(1);
  const [allowSignup, setAllowSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { loginWithPopup, isAuthenticated, getUser} = useAuth0();
  const { activeTab } = useTab();

  const handleClick = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("CallbackTab", activeTab);
    localStorage.setItem("CallbackStep", step);
    await loginWithPopup({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  };

  useEffect(() => {
    // Restore step from localStorage if present
    const savedStep = localStorage.getItem("CallbackStep");
    if (savedStep) {
      setStep(Number(savedStep));
      localStorage.removeItem("CallbackStep");
    }

    // Try to get settings, but don't block the UI if it fails
    const fetchSettings = async () => {
      try {
        const res = await api.get("settings");
        if (res.data.allowNewUserSignups === true) {
          setAllowSignup(true);
        } else {
          setAllowSignup(false);
        }
      } catch (error) {
        console.warn(
          "Settings API not available, defaulting to allow signup:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Separate effect for handling Auth0 authentication
  useEffect(() => {
    if (isAuthenticated && step < 3) {
      setStep(3);
    }
  }, [isAuthenticated, step]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 bg-background dark:bg-background-dark">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {allowSignup ? (
        <div>
          {step === 1 ? <Agreement onClick={handleClick} /> : null}
          {step === 2 ? <SignupOption onClick={handleLogin} /> : null}
          {step === 3 ? <Profile /> : null}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 bg-background dark:bg-background-dark text-text dark:text-text-dark">
          <p className="text-gray-700">
            New user signups are disabled temporarily
          </p>
        </div>
      )}
    </>
  );
}

export default Join;
