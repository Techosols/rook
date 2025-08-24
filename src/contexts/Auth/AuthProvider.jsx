import AuthContext from "./AuthContext";
import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import api from "../../services/api";
import useTab from "../../hooks/useTab";

// LocalStorage keys - defined outside component to prevent re-renders
const STORAGE_KEYS = {
  USER_PROFILE: "rook_user_profile",
  IS_LOGGED_IN: "rook_is_logged_in",
  IS_PROFILE_COMPLETE: "rook_is_profile_complete",
  ACCESS_TOKEN: "rook_access_token",
};

const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    loginWithPopup,
    logout,
    user,
    getAccessTokenSilently,
    error,
  } = useAuth0();

  // Tab navigation
  const { setActiveTab } = useTab();

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Save user state to localStorage
  const saveUserState = useCallback(
    (profile, loggedIn, profileComplete, token) => {
      try {
        if (profile) {
          localStorage.setItem(
            STORAGE_KEYS.USER_PROFILE,
            JSON.stringify(profile)
          );
        }
        localStorage.setItem(
          STORAGE_KEYS.IS_LOGGED_IN,
          JSON.stringify(loggedIn)
        );
        localStorage.setItem(
          STORAGE_KEYS.IS_PROFILE_COMPLETE,
          JSON.stringify(profileComplete)
        );
        if (token) {
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        }
      } catch (error) {
        console.warn("Failed to save user state to localStorage:", error);
      }
    },
    []
  );

  // Load user state from localStorage
  const loadUserState = useCallback(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      const savedLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      const savedProfileComplete = localStorage.getItem(
        STORAGE_KEYS.IS_PROFILE_COMPLETE
      );
      const savedToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      return {
        userProfile: savedProfile ? JSON.parse(savedProfile) : null,
        isLoggedIn: savedLoggedIn ? JSON.parse(savedLoggedIn) : false,
        isProfileComplete: savedProfileComplete
          ? JSON.parse(savedProfileComplete)
          : false,
        accessToken: savedToken || null,
      };
    } catch (error) {
      console.warn("Failed to load user state from localStorage:", error);
      return {
        userProfile: null,
        isLoggedIn: false,
        isProfileComplete: false,
        accessToken: null,
      };
    }
  }, []);

  // Clear user state from localStorage
  const clearUserState = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(STORAGE_KEYS.IS_PROFILE_COMPLETE);
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.warn("Failed to clear user state from localStorage:", error);
    }
  }, []);

  // Initialize state from localStorage on component mount
  useEffect(() => {
    const savedState = loadUserState();

    // Only restore state if Auth0 is not loading and user is not authenticated via Auth0
    // This prevents conflicts between localStorage and Auth0 state
    if (!isLoading && !isAuthenticated && savedState.isLoggedIn) {
      console.log("Restoring user state from localStorage...");
      setUserProfile(savedState.userProfile);
      setIsLoggedIn(savedState.isLoggedIn);
      setIsProfileComplete(savedState.isProfileComplete);
      setAccessToken(savedState.accessToken);

      // Set API authorization header if token exists
      if (savedState.accessToken) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${savedState.accessToken}`;
      }
    }
  }, [isLoading, isAuthenticated, loadUserState]);

  // Check if user has completed profile setup
  const checkProfileCompletion = useCallback(
    async (token, isSigninFlow = false) => {
      try {
        console.log("🔍 Checking profile completion with token...");
        console.log("🔍 isSigninFlow:", isSigninFlow);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        console.log("📡 Making API call to user/profile...");
        const response = await api.get("user/profile", config);

        console.log("📡 Profile check response:");
        console.log("📡 Status:", response.status);
        console.log("📡 Data:", response.data);

        if (response.status === 200 && response.data) {
          const profile = response.data;
          console.log(
            "✅ Profile found, setting isProfileComplete and isLoggedIn to true"
          );
          console.log("✅ Profile data:", profile);
          setUserProfile(profile);
          setIsProfileComplete(true);
          setIsLoggedIn(true); // Set isLoggedIn to true when profile is complete

          // Save complete state to localStorage
          saveUserState(profile, true, true, token);

          // Show success message for returning users
          if (isSigninFlow) {
            toast.success("Welcome back! You're successfully logged in.");
          } else {
            toast.success("Profile found! You're successfully logged in.");
          }

          return true;
        }
      } catch (error) {
        console.log("❌ Profile check error:");
        console.log("❌ Status:", error.response?.status);
        console.log("❌ Data:", error.response?.data);
        console.log("❌ Message:", error.message);

        if (error.response?.status === 404) {
          // User profile not found - needs to complete registration
          console.log(
            "⚠️ Profile not found (404), user needs to complete profile"
          );
          setIsProfileComplete(false);

          // For signin flow, set isLoggedIn to true even without profile
          // For signup flow, keep isLoggedIn false until profile is complete
          if (isSigninFlow) {
            console.log(
              "🔑 Signin flow: Setting isLoggedIn to true despite incomplete profile"
            );
            setIsLoggedIn(true);
            // Save state - user is authenticated and logged in, but profile incomplete
            saveUserState(null, true, false, token);

            toast.info(
              "Welcome! Please complete your profile to unlock all features.",
              {
                autoClose: 4000,
                position: "top-center",
              }
            );
          } else {
            console.log(
              "📝 Signup flow: Keeping isLoggedIn false until profile complete"
            );
            setIsLoggedIn(false);
            // Save state - user is authenticated but not fully logged in due to incomplete profile
            saveUserState(null, false, false, token);
          }

          // Automatically navigate to Join tab for profile completion
          console.log("🔄 Navigating to join tab for profile completion...");
          console.log("🔄 Current isLoggedIn state:", isLoggedIn);
          console.log("🔄 Current isProfileComplete state:", isProfileComplete);
          setActiveTab("join");

          // Scroll to top to ensure user sees the profile form
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 500);

          // Add a slight delay and additional notification to make navigation more noticeable
          setTimeout(() => {
            toast.info("📋 Complete your profile below to get started!", {
              autoClose: 4000,
              position: "bottom-right",
            });
          }, 1000);

          // Additional immediate notification to guide user attention
          setTimeout(() => {
            toast.success(
              "✨ Redirected to Profile Setup! Please fill out the form below.",
              {
                autoClose: 5000,
                position: "top-center",
                style: {
                  backgroundColor: "#059669",
                  color: "white",
                  fontWeight: "bold",
                },
              }
            );
          }, 2000);

          return false;
        }
        console.error("Error checking profile completion:", error);
        setAuthError("Failed to verify profile completion");
      }
      return false;
    },
    [saveUserState, setActiveTab, isLoggedIn, isProfileComplete]
  );

  // Get access token and set up API authorization
  const setupApiAuth = useCallback(async () => {
    if (!isAuthenticated || !user) return null;

    try {
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      });
      setAccessToken(token);

      // Set default authorization header for all API requests
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return token;
    } catch (error) {
      console.error("Error getting access token:", error);
      setAuthError("Failed to get access token");

      // Only clear auth state if it's a login_required error
      if (error.error === "login_required") {
        setIsLoggedIn(false);
        setUserProfile(null);
        setIsProfileComplete(false);
        setAccessToken(null);
        if (api.defaults.headers.common["Authorization"]) {
          delete api.defaults.headers.common["Authorization"];
        }
      }

      return null;
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Check if user exists by email and return status
  const checkUserExists = useCallback(async (email) => {
    try {
      console.log("🔍 API Call: Checking user existence for email:", email);
      const response = await api.get(`user/${encodeURIComponent(email)}`);

      console.log("📡 API Response - Status:", response.status);
      console.log("📡 API Response - Data:", response.data);
      console.log("📡 API Response - Headers:", response.headers);

      return response.status === 200 ? response.data : false;
    } catch (error) {
      console.log("❌ API Error - Status:", error.response?.status);
      console.log("❌ API Error - Data:", error.response?.data);
      console.log("❌ API Error - Message:", error.message);

      if (error.response?.status === 404) {
        // User doesn't exist, which is what we want for registration
        console.log("✅ User doesn't exist (404) - registration can proceed");
        return false;
      }
      console.error("Error checking user existence:", error);
      throw error;
    }
  }, []);

  // Check user status and return appropriate action
  const checkUserStatus = useCallback(
    async (email) => {
      try {
        console.log("🔎 Starting user status check for email:", email);
        const userData = await checkUserExists(email);

        console.log("📊 User data returned:", userData);

        if (!userData) {
          console.log("✅ User doesn't exist - can register");
          return { exists: false, canRegister: true, status: null };
        }

        // User exists, check their status
        const status = userData.status?.toLowerCase();
        console.log("📈 User status from API:", userData.status);
        console.log("📈 Normalized status:", status);

        switch (status) {
          case "Active":
            console.log("🟢 User is active - should login instead");
            return {
              exists: true,
              canRegister: false,
              canLogin: true,
              status: "active",
              message:
                "This email is already registered with a completed profile. Please use 'Sign In' to access your account.",
            };
          case "Suspended":
            console.log("🔴 User is suspended");
            return {
              exists: true,
              canRegister: false,
              canLogin: false,
              status: "suspended",
              message:
                "This account has been suspended and cannot be accessed.",
            };
          default:
            console.log("🟡 User has unknown status:", status);
            return {
              exists: true,
              canRegister: false,
              canLogin: false,
              status: status || "unknown",
              message:
                "Account exists but status is unclear. Please contact support.",
            };
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        throw new Error("Unable to verify account status. Please try again.");
      }
    },
    [checkUserExists]
  );

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      setAuthLoading(true);
      setAuthError(null);

      if (isLoading) {
        return; // Wait for Auth0 to finish loading
      }

      if (error) {
        console.error("Auth0 error:", error);
        setAuthError(error.message);
        setAuthLoading(false);
        return;
      }

      // Don't re-authenticate if we're in the middle of logging out
      if (isLoggingOut) {
        setAuthLoading(false);
        return;
      }

      if (isAuthenticated && user) {
        console.log(
          "🔵 User is authenticated, checking profile completion before setting isLoggedIn..."
        );

        console.log("🔵 Getting access token...");
        const token = await setupApiAuth();
        if (token) {
          console.log(
            "🔵 Got token, checking user status and profile completion..."
          );

          // Check if this is a signin or signup flow
          const authFlowType = localStorage.getItem("rook_auth_flow_type");
          const isSigninFlow = authFlowType === "signin";
          console.log("🔵 Auth flow type:", authFlowType);
          console.log("🔵 Is signin flow:", isSigninFlow);

          // For signin flows, validate user exists and is active before proceeding
          if (isSigninFlow && user?.email) {
            console.log(
              "🔍 Main Auth: Validating signin user status for:",
              user.email
            );

            try {
              const userStatus = await checkUserStatus(user.email);
              console.log("📊 Main Auth: User status result:", userStatus);

              if (!userStatus.exists) {
                console.log(
                  "❌ Main Auth: User doesn't exist - blocking signin"
                );
                toast.error(
                  "Account not found. Please sign up first to create an account."
                );

                // Clear local auth state completely
                setIsLoggedIn(false);
                setUserProfile(null);
                setIsProfileComplete(false);
                setAccessToken(null);
                clearUserState();
                localStorage.removeItem("rook_auth_flow_type");

                // Clear API authorization header
                if (api.defaults.headers.common["Authorization"]) {
                  delete api.defaults.headers.common["Authorization"];
                }

                // Set auth loading to false and exit early - no logout needed
                setAuthLoading(false);
                return;
              }

              if (userStatus.status == "suspended") {
                console.log(
                  "🚫 Main Auth: User account is suspended - blocking signin"
                );
                toast.error(
                  "Your account has been suspended. Please contact support."
                );

                // Clear local auth state completely
                setIsLoggedIn(false);
                setUserProfile(null);
                setIsProfileComplete(false);
                setAccessToken(null);
                clearUserState();
                localStorage.removeItem("rook_auth_flow_type");

                // Clear API authorization header
                if (api.defaults.headers.common["Authorization"]) {
                  delete api.defaults.headers.common["Authorization"];
                }

                // Set auth loading to false and exit early - no logout needed
                setAuthLoading(false);
                return;
              }

              if (userStatus.status == "active") {
                console.log(
                  "✅ Main Auth: User is active - setting isLoggedIn to true immediately"
                );
                setIsLoggedIn(true);
              } else if (userStatus.status != "active") {
                console.log("⚠️ Main Auth: User status unclear but proceeding");
                toast.warning(
                  "Account status unclear. Please contact support if you experience issues."
                );
              }
            } catch (statusError) {
              console.error(
                "❌ Main Auth: Error validating user status:",
                statusError
              );
              toast.warning(
                "Unable to verify account status. Please contact support if you experience issues."
              );
            }
          }

          // Clear the flow type after reading it
          localStorage.removeItem("rook_auth_flow_type");

          const profileComplete = await checkProfileCompletion(
            token,
            isSigninFlow
          );
          console.log("🔵 Profile completion result:", profileComplete);

          if (profileComplete) {
            console.log("🔵 Profile is complete, user is fully logged in");
            // Success message is already shown in checkProfileCompletion
          } else {
            console.log(
              "🔵 Profile is incomplete, user needs to complete profile"
            );
            console.log("🔄 Should have navigated to join tab automatically");
            // Alert is already shown in checkProfileCompletion
          }
        } else {
          console.log("🔴 Failed to get token from setupApiAuth");
          setIsLoggedIn(false);
        }

        // Ensure authLoading is set to false after all auth operations
        console.log("🔵 Setting authLoading to false after auth operations");
        setAuthLoading(false);
      } else {
        console.log("User not authenticated via Auth0...");

        // Check if we have persistent state in localStorage
        const savedState = loadUserState();

        if (savedState.isLoggedIn && savedState.accessToken) {
          console.log("Found persistent user state, validating token...");

          // Try to validate the saved token by making a test API call
          try {
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${savedState.accessToken}`;

            // Test token validity with a simple API call
            const response = await api.get("user/profile");

            if (response.status === 200) {
              console.log("Persistent token is valid, restoring user state...");
              // Token is valid, restore state
              setUserProfile(response.data);
              setIsProfileComplete(true);
              setIsLoggedIn(true); // Only set isLoggedIn if profile exists and is complete
              setAccessToken(savedState.accessToken);
            } else {
              throw new Error("Token validation failed");
            }
          } catch (error) {
            if (error.response?.status === 404) {
              console.log(
                "Persistent token valid but profile incomplete, user needs to complete profile"
              );
              // Token is valid but profile doesn't exist - user needs to complete profile
              setUserProfile(null);
              setIsProfileComplete(false);
              setIsLoggedIn(false); // Don't set isLoggedIn until profile is complete
              setAccessToken(savedState.accessToken);

              // Automatically navigate to Join tab for profile completion
              console.log(
                "🔄 [Persistent Login] Navigating to join tab for profile completion..."
              );
              setActiveTab("join");

              // Scroll to top to ensure user sees the profile form
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 500);

              // Show notification for persistent login with incomplete profile
              toast.info(
                "Please complete your profile to continue using the app.",
                {
                  autoClose: 4000,
                  position: "top-center",
                }
              );
            } else {
              console.log(
                "Persistent token is invalid, clearing state...",
                error.message
              );
              // Token is invalid, clear everything
              clearUserState();
              setIsLoggedIn(false);
              setUserProfile(null);
              setIsProfileComplete(false);
              setAccessToken(null);
              if (api.defaults.headers.common["Authorization"]) {
                delete api.defaults.headers.common["Authorization"];
              }
            }
          }
        } else {
          // No persistent state or incomplete state, clear everything
          console.log("No valid persistent state, clearing...");
          setIsLoggedIn(false);
          setUserProfile(null);
          setIsProfileComplete(false);
          setAccessToken(null);
          setIsLoggingOut(false); // Reset logout state
          if (api.defaults.headers.common["Authorization"]) {
            delete api.defaults.headers.common["Authorization"];
          }
        }

        // Set authLoading to false for non-authenticated users
        console.log(
          "🔵 Setting authLoading to false for non-authenticated state"
        );
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, [
    isAuthenticated,
    isLoading,
    user,
    error,
    isLoggingOut,
    setupApiAuth,
    checkProfileCompletion,
    loadUserState,
    clearUserState,
    isLoggedIn,
    isProfileComplete,
    setActiveTab,
    checkUserStatus,
    logout,
  ]);

  // Debug: Log authentication state changes
  useEffect(() => {
    console.log("🟡 Auth state change:", {
      isAuthenticated,
      isLoggedIn,
      isProfileComplete,
      needsProfileCompletion: isAuthenticated && !isProfileComplete,
      hasUser: !!user,
      hasUserProfile: !!userProfile,
      hasAccessToken: !!accessToken,
      authLoading,
      isLoading,
    });
  }, [
    isAuthenticated,
    isLoggedIn,
    isProfileComplete,
    user,
    userProfile,
    accessToken,
    authLoading,
    isLoading,
  ]);

  // Debug: Log context value changes specifically for isLoggedIn
  useEffect(() => {
    console.log("🟢 Context isLoggedIn changed to:", isLoggedIn);
  }, [isLoggedIn]);

  // Login with redirect (for desktop/primary flow)
  const login = async (options = {}) => {
    try {
      setAuthError(null);
      // Mark this as a signin flow
      localStorage.setItem("rook_auth_flow_type", "signin");

      await loginWithRedirect({
        authorizationParams: {
          prompt: "login",
          ...options.authorizationParams,
        },
        ...options,
      });
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("Failed to login");
      toast.error("Login failed. Please try again.");
    }
  };

  // Login with popup (for better UX in some cases)
  const loginWithPopupFlow = async (options = {}) => {
    try {
      setAuthError(null);
      // Mark this as a signin flow
      localStorage.setItem("rook_auth_flow_type", "signin");

      // First, try to get the user's email to check their status
      // We need to authenticate first to get the email, then validate
      const result = await loginWithPopup({
        authorizationParams: {
          prompt: "login",
          ...options.authorizationParams,
        },
        ...options,
      });

      // After successful authentication, check if user exists in our system
      if ((result || isAuthenticated) && user?.email) {
        console.log("🔍 Signin: Checking user status for email:", user.email);

        try {
          const userStatus = await checkUserStatus(user.email);
          console.log("📊 Signin: User status result:", userStatus);

          if (!userStatus.exists) {
            // User doesn't exist in our system - they need to signup first
            console.log("❌ Signin: User doesn't exist in system");
            toast.error(
              "Account not found. Please sign up first to create an account."
            );

            // Clear local auth state first to prevent cascading errors
            setIsLoggedIn(false);
            setUserProfile(null);
            setIsProfileComplete(false);
            setAccessToken(null);
            clearUserState();
            localStorage.removeItem("rook_auth_flow_type");

            // Clear API authorization header
            if (api.defaults.headers.common["Authorization"]) {
              delete api.defaults.headers.common["Authorization"];
            }

            // Logout from Auth0 in a non-blocking way
            setTimeout(() => {
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
                federated: true,
              });
            }, 100);

            return;
          }

          if (userStatus.status === "suspended") {
            console.log("🚫 Signin: User account is suspended");
            toast.error(
              "Your account has been suspended. Please contact support."
            );

            // Clear local auth state completely
            setIsLoggedIn(false);
            setUserProfile(null);
            setIsProfileComplete(false);
            setAccessToken(null);
            clearUserState();
            localStorage.removeItem("rook_auth_flow_type");

            // Clear API authorization header
            if (api.defaults.headers.common["Authorization"]) {
              delete api.defaults.headers.common["Authorization"];
            }

            // Don't call logout - just clear state and let user navigate
            return;
          }

          if (userStatus.status == "active") {
            console.log("✅ Signin: User is active - proceeding with login");
            console.log(
              "✅ Signin: Setting isLoggedIn to true immediately for active user"
            );

            // For active users in signin flow, set logged in immediately
            setIsLoggedIn(true);
            setActiveTab("matches");

            toast.success("Successfully logged in!");
          } else {
            console.log(
              "⚠️ Signin: User status unclear - proceeding with caution"
            );
            toast.success("Successfully logged in!");
          }
        } catch (statusError) {
          console.error("❌ Signin: Error checking user status:", statusError);
          // If we can't check status, allow login but show warning
          toast.warning(
            "Login successful, but unable to verify account status."
          );
        }
      } else if (result || isAuthenticated) {
        // Authentication successful but no email available yet
        // Don't show duplicate message - status check above handles this
        console.log("✅ Signin: Authentication successful");
      }
    } catch (error) {
      // Check if it's a popup closed error (user cancelled)
      if (
        error.error === "popup_closed" ||
        error.message?.includes("popup_closed") ||
        error.message?.includes("cancelled") ||
        error.message?.includes("closed")
      ) {
        console.log("Login popup was closed by user");
        // Don't show error toast for user cancellation
        return;
      }

      console.error("Popup login error:", error);
      setAuthError("Failed to login");
      toast.error("Login failed. Please try again.");
    }
  };

  // Check if email is available for registration
  const checkEmailAvailability = async (email) => {
    try {
      const userStatus = await checkUserStatus(email);
      return userStatus.canRegister;
    } catch (error) {
      console.error("Error checking email availability:", error);
      throw new Error("Unable to verify email availability. Please try again.");
    }
  };

  // Register/Signup with email check
  const register = async (options = {}) => {
    try {
      setAuthError(null);
      // Mark this as a signup flow
      localStorage.setItem("rook_auth_flow_type", "signup");

      await loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup",
          prompt: "login",
          ...options.authorizationParams,
        },
        ...options,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError("Failed to register");
      toast.error("Registration failed. Please try again.");
    }
  };

  // Register with popup and email check
  const registerWithPopup = async (options = {}) => {
    try {
      setAuthError(null);
      // Mark this as a signup flow
      localStorage.setItem("rook_auth_flow_type", "signup");

      const result = await loginWithPopup({
        authorizationParams: {
          screen_hint: "signup",
          prompt: "login",
          ...options.authorizationParams,
        },
        ...options,
      });

      // Only show success message if authentication was actually successful
      // We check if the popup result indicates successful authentication
      if (result || isAuthenticated) {
        toast.success("Successfully registered! Please complete your profile.");
      }
    } catch (error) {
      // Check if it's a popup closed error (user cancelled)
      if (
        error.error === "popup_closed" ||
        error.message?.includes("popup_closed") ||
        error.message?.includes("cancelled") ||
        error.message?.includes("closed")
      ) {
        console.log("Registration popup was closed by user");
        // Don't show error toast for user cancellation
        return;
      }

      console.error("Popup registration error:", error);
      setAuthError("Failed to register");
      toast.error("Registration failed. Please try again.");
    }
  };

  // Create user profile
  const createUserProfile = async (profileData) => {
    console.log("👤 Starting profile creation process");
    console.log("👤 Profile data:", profileData);
    console.log("👤 Current user:", user);
    console.log("👤 isAuthenticated:", isAuthenticated);
    console.log("👤 accessToken available:", !!accessToken);

    if (!isAuthenticated || !accessToken) {
      throw new Error("User must be authenticated to create profile");
    }

    try {
      // First check if user already exists and their status
      if (profileData.email || user?.email) {
        const emailToCheck = profileData.email || user.email;
        console.log("📧 Checking email before profile creation:", emailToCheck);

        const userStatus = await checkUserStatus(emailToCheck);
        console.log("📊 Profile creation - user status:", userStatus);

        if (userStatus.exists) {
          console.log("❌ User already exists - cannot create profile");
          if (userStatus.status === "Suspended") {
            toast.error("Account is suspended and cannot be accessed.");
            throw new Error("Account suspended");
          } else if (userStatus.status === "Active") {
            toast.error(
              "An account with this email already exists. Please login instead."
            );
            throw new Error("User already exists");
          } else {
            toast.error(
              "Account exists but status is unclear. Please contact support."
            );
            throw new Error("Account status unclear");
          }
        }
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      console.log("💿 Making API call to create user profile");
      console.log("💿 API endpoint: /api/user");
      console.log("💿 Sending profile data:", profileData);
      console.log("💿 Request config:", config);

      const response = await api.post("user", profileData, config);
      console.log("✅ Profile creation API response status:", response.status);
      console.log("✅ Profile creation API response data:", response);
      console.log(
        "✅ Profile creation API response headers:",
        response.headers
      );

      if (response.status === 201) {
        const profile = response.data;
        console.log(
          "🔄 Profile created successfully, calling handleProfileCompletion"
        );
        console.log("🔄 Profile data to handle:", profile);

        // Use the handleProfileCompletion function for consistent messaging
        handleProfileCompletion(profile);

        console.log("📝 Profile creation completed successfully");
        return profile;
      } else {
        console.log("❌ Unexpected response status:", response.status);
        throw new Error("Failed to create profile");
      }
    } catch (error) {
      console.error("💥 Profile creation error:", error);
      console.error("💥 Error response:", error.response?.data);
      console.error("💥 Error status:", error.response?.status);
      console.error("💥 Error headers:", error.response?.headers);

      if (
        error.message === "User already exists" ||
        error.message === "Account suspended" ||
        error.message === "Account status unclear"
      ) {
        // Re-throw specific errors without additional toast
        throw error;
      } else if (error.response?.status === 409) {
        toast.error("User already exists.");
        throw new Error("User already exists");
      } else if (error.response?.status === 400) {
        toast.error("Invalid data provided.");
        throw new Error("Invalid data provided");
      } else {
        toast.error("Failed to create profile. Please try again.");
        throw new Error("Profile creation failed");
      }
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    if (!isAuthenticated || !accessToken) {
      throw new Error("User must be authenticated to update profile");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await api.put("user/profile", profileData, config);

      if (response.status === 200) {
        setUserProfile(response.data);
        toast.success("Profile updated successfully!");
        return response.data;
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
      throw error;
    }
  };

  // Logout
  const handleLogout = async (options = {}) => {
    try {
      setAuthError(null);
      setIsLoggingOut(true); // Prevent re-authentication during logout

      console.log("Starting logout process...");

      // Clear any stored tokens/data first
      localStorage.removeItem("CallbackTab");
      localStorage.removeItem("CallbackStep");

      // Clear user state from localStorage
      clearUserState();

      // Clear any Auth0 cached data
      localStorage.removeItem(
        `@@auth0spajs@@::${import.meta.env.VITE_AUTH0_CLIENT_ID}::${
          import.meta.env.VITE_AUTH0_AUDIENCE
        }::openid profile email`
      );

      // Clear API authorization header
      if (api.defaults.headers.common["Authorization"]) {
        delete api.defaults.headers.common["Authorization"];
      }

      // Clear local state
      setIsLoggedIn(false);
      setUserProfile(null);
      setIsProfileComplete(false);
      setAccessToken(null);

      // Logout from Auth0 (this will redirect)
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
        federated: true, // Clear all federated identity provider sessions
        ...options,
      });
    } catch (error) {
      console.error("Logout error:", error);
      setAuthError("Failed to logout");
      setIsLoggingOut(false); // Reset on error
      toast.error("Logout failed. Please try again.");
    }
  };

  // Force refresh authentication state
  const refreshAuth = async () => {
    if (isAuthenticated && user) {
      const token = await setupApiAuth();
      if (token) {
        await checkProfileCompletion(token);
      }
    }
  };

  // Validate persistent authentication state
  const validatePersistentAuth = async () => {
    const savedState = loadUserState();

    if (!savedState.isLoggedIn || !savedState.accessToken) {
      return false;
    }

    try {
      // Test token validity
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${savedState.accessToken}`;
      const response = await api.get("user/profile");

      if (response.status === 200) {
        // Token is valid, restore full state
        setUserProfile(savedState.userProfile);
        setIsLoggedIn(savedState.isLoggedIn);
        setIsProfileComplete(savedState.isProfileComplete);
        setAccessToken(savedState.accessToken);
        return true;
      }
    } catch (error) {
      console.log("Persistent token validation failed:", error.message);
      // Clear invalid state
      clearUserState();
      setIsLoggedIn(false);
      setUserProfile(null);
      setIsProfileComplete(false);
      setAccessToken(null);
      if (api.defaults.headers.common["Authorization"]) {
        delete api.defaults.headers.common["Authorization"];
      }
    }

    return false;
  };

  // Check if user needs to complete profile
  // User needs profile completion if they are authenticated via Auth0 but profile is incomplete
  const needsProfileCompletion = isAuthenticated && !isProfileComplete;

  // Handle profile completion - called when user successfully completes their profile
  const handleProfileCompletion = useCallback(
    (profileData) => {
      console.log("🟢 Profile completed, setting user as fully logged in");
      setUserProfile(profileData);
      setIsProfileComplete(true);
      setIsLoggedIn(true); // Now user is fully logged in

      // Save the complete state to localStorage
      if (accessToken) {
        saveUserState(profileData, true, true, accessToken);
      }

      // Show success message for profile completion
      toast.success("🎉 Profile completed successfully! Welcome to the app!", {
        autoClose: 5000,
        position: "top-center",
      });

      // Navigate to the main app (matches tab for logged in users)
      setActiveTab("matches");
    },
    [accessToken, saveUserState, setActiveTab]
  );

  // Get user data (Auth0 user + profile data)
  const getUserData = () => {
    // For persistent login, we might not have Auth0 user data but still have profile
    if (!isLoggedIn) return null;

    return {
      auth0User: user, // This might be null for persistent logins
      profile: userProfile,
      isProfileComplete,
      needsProfileCompletion,
    };
  };

  // Context value
  const contextValue = {
    // Authentication state
    isLoggedIn,
    isAuthenticated,
    isLoading: isLoading || authLoading,
    isProfileComplete,
    needsProfileCompletion,
    user,
    userProfile,
    accessToken,
    error: authError || error,

    // Authentication methods
    login,
    loginWithPopup: loginWithPopupFlow,
    register,
    registerWithPopup,
    logout: handleLogout,

    // Profile methods
    createUserProfile,
    updateUserProfile,
    handleProfileCompletion,

    // Utility methods
    refreshAuth,
    getUserData,
    checkProfileCompletion: () => checkProfileCompletion(accessToken),
    checkUserExists,
    checkUserStatus,
    checkEmailAvailability,
    validatePersistentAuth,

    // Legacy compatibility
    setIsLoggedIn,
    handleLogout,
    checkAuthentication: refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
