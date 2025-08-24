import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../../hooks/useAuth";

function SignupOption({ onClick, disabled = false, errorMessage = null }) {
  const { loginWithPopup } = useAuth();
  
  // Check if the error message indicates an existing active account
  const isActiveUserError = errorMessage && (
    errorMessage.includes("already registered") || 
    errorMessage.includes("completed profile")
  );
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      await loginWithPopup({
        authorizationParams: {
          prompt: "login",
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-50 bg-background dark:bg-background-dark p-4 dark:text-white">
      <p>
        Please sign into the email address that you would like to attach to your
        Rook membership. All notification from Rook will go to this email
        address
      </p>

      {errorMessage && (
        <div className={`mt-4 p-3 border rounded-lg ${
          isActiveUserError 
            ? "bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-600"
            : "bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-600"
        }`}>
          <p className={`text-sm ${
            isActiveUserError 
              ? "text-blue-700 dark:text-blue-300"
              : "text-red-700 dark:text-red-300"
          }`}>
            {errorMessage}
          </p>
          {isActiveUserError && (
            <p className="text-blue-600 dark:text-blue-400 text-xs mt-2 font-medium">
              💡 Use the "Sign In" button below to access your existing account.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-4 gap-3">
        {/* Signup Button */}
        <button
          className={`py-3 px-8 rounded-full text-white w-full sm:w-auto space-x-2 flex items-center ${
            disabled
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-primary dark:bg-primary-dark cursor-pointer hover:bg-primary-hover dark:hover:bg-primary-dark-hover"
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          <GoogleIcon />
          <span>
            {disabled 
              ? (isActiveUserError ? "Registration Disabled" : "Registration Disabled")
              : "Google"
            }
          </span>
        </button>

        {/* Sign In Button - Show when registration is disabled for active users */}
        {disabled && isActiveUserError && (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Already have an account?
            </p>
            <button
              className="py-3 px-8 rounded-full text-white w-full sm:w-auto space-x-2 flex items-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 cursor-pointer transition-colors"
              onClick={handleSignIn}
            >
              <GoogleIcon />
              <span>Sign In</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupOption;
