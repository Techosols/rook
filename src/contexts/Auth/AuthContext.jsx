import { createContext } from "react";

// Default context value with all auth-related properties
const defaultAuthContext = {
  // Authentication state
  isLoggedIn: false,
  isAuthenticated: false,
  isLoading: true,
  isProfileComplete: false,
  needsProfileCompletion: false,
  user: null,
  userProfile: null,
  accessToken: null,
  error: null,

  // Authentication methods
  login: () => Promise.reject(new Error("AuthProvider not found")),
  loginWithPopup: () => Promise.reject(new Error("AuthProvider not found")),
  register: () => Promise.reject(new Error("AuthProvider not found")),
  registerWithPopup: () => Promise.reject(new Error("AuthProvider not found")),
  logout: () => Promise.reject(new Error("AuthProvider not found")),

  // Profile methods
  createUserProfile: () => Promise.reject(new Error("AuthProvider not found")),
  updateUserProfile: () => Promise.reject(new Error("AuthProvider not found")),

  // Utility methods
  refreshAuth: () => Promise.reject(new Error("AuthProvider not found")),
  getUserData: () => null,
  checkProfileCompletion: () =>
    Promise.reject(new Error("AuthProvider not found")),
  checkUserExists: () => Promise.reject(new Error("AuthProvider not found")),
  checkUserStatus: () => Promise.reject(new Error("AuthProvider not found")),
  checkEmailAvailability: () =>
    Promise.reject(new Error("AuthProvider not found")),
  validatePersistentAuth: () =>
    Promise.reject(new Error("AuthProvider not found")),

  // Legacy compatibility
  setIsLoggedIn: () => {},
  handleLogout: () => Promise.reject(new Error("AuthProvider not found")),
  checkAuthentication: () =>
    Promise.reject(new Error("AuthProvider not found")),
};

const AuthContext = createContext(defaultAuthContext);

export default AuthContext;
