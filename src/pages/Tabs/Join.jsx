import { useEffect, useState } from "react";
import api from "../../services/api";

import Agreement from "../../components/join/Agreement";
import SignupOption from "../../components/join/SignupOption";
import Profile from "../../components/join/Profile.jsx";
import Payment from "../../components/join/Payment.jsx";

import useAuth from "../../hooks/useAuth";
import useTab from "../../hooks/useTab";

function Join() {
  const [step, setStep] = useState(1);
  const [allowSignup, setAllowSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registrationDisabled, setRegistrationDisabled] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const {
    registerWithPopup,
    isAuthenticated,
    needsProfileCompletion,
    user,
    checkUserStatus,
  } = useAuth();
  const { activeTab } = useTab();

  const handleClick = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("CallbackTab", activeTab);
    localStorage.setItem("CallbackStep", step);

    try {
      await registerWithPopup({
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
      // Error handling is done in AuthProvider
    }
  };

  // Check user status after authentication
  useEffect(() => {
    const checkUserAfterAuth = async () => {
      console.log("🔍 Join.jsx - Starting checkUserAfterAuth");
      console.log("🔍 isAuthenticated:", isAuthenticated);
      console.log("🔍 user:", user);
      console.log("🔍 user.email:", user?.email);

      if (isAuthenticated && user?.email) {
        console.log("📧 Checking user status for email:", user.email);

        try {
          const userStatus = await checkUserStatus(user.email);
          console.log("📊 User status response:", userStatus);

          if (userStatus.exists) {
            console.log(
              "⚠️ User already exists with status:",
              userStatus.status
            );

            if (userStatus.status === "suspended") {
              console.log("🚫 User is suspended");
              setRegistrationError(userStatus.message);
              setRegistrationDisabled(true);
              // Force logout since user is suspended
              // You might want to add a logout function here
              return;
            } else if (userStatus.status === "active") {
              console.log("✅ User is active - should login instead");
              setRegistrationError(userStatus.message);
              setRegistrationDisabled(true);
              // User should login instead of register
              return;
            }
          } else {
            console.log(
              "✨ User does not exist - can proceed with registration"
            );
          }

          // Clear any previous errors if user can proceed
          console.log("🧹 Clearing registration errors");
          setRegistrationError(null);
          setRegistrationDisabled(false);
        } catch (error) {
          console.error("❌ Error checking user status:", error);
          console.error("❌ Error details:", error.response?.data);
          setRegistrationError(
            "Unable to verify account status. Please try again."
          );
        }
      } else {
        console.log(
          "⏸️ Not authenticated or no user email - skipping user status check"
        );
      }
    };

    checkUserAfterAuth();
  }, [isAuthenticated, user, checkUserStatus]);

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

  // Handle authentication and profile completion flow
  useEffect(() => {
    console.log("🔄 Join component - Auth state changed:");
    console.log("🔄 needsProfileCompletion:", needsProfileCompletion);
    console.log("🔄 step:", step);
    console.log("🔄 allowSignup:", allowSignup);
    console.log("🔄 registrationDisabled:", registrationDisabled);
    console.log("🔄 registrationError:", registrationError);
    console.log("🔄 isAuthenticated:", isAuthenticated);
    console.log("🔄 user:", user);

    // No need to force step changes since needsProfileCompletion handles profile display
    // The step flow is only for the signup process (Agreement -> SignupOption)
  }, [
    needsProfileCompletion,
    step,
    allowSignup,
    registrationDisabled,
    registrationError,
    isAuthenticated,
    user,
  ]);

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
      {/* Always show Profile component if user needs to complete profile */}
      {needsProfileCompletion ? (
        <div>
          <div className="text-center mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🎉 Almost There!
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Your authentication was successful! Now let's complete your
              profile to get you started with the full experience.
            </p>
          </div>
          <Profile />
        </div>
      ) : allowSignup ? (
        <div>
          {step === 1 ? <Agreement onClick={handleClick} /> : null}
          {step === 2 ? (
            <SignupOption
              onClick={handleLogin}
              disabled={registrationDisabled}
              errorMessage={registrationError}
            />
          ) : null}
          {/* Step 3 is no longer needed since needsProfileCompletion handles profile display */}
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
