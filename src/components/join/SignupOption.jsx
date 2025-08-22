import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

function SignupOption({ onClick, disabled = false, errorMessage = null }) {
  return (
    <div className="flex flex-col items-center justify-center h-50 bg-background dark:bg-background-dark p-4 dark:text-white">
      <p>
        Please sign into the email address that you would like to attach to your
        Rook membership. All notification from Rook will go to this email
        address
      </p>

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">
            {errorMessage}
          </p>
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-4">
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
          <span>{disabled ? "Registration Disabled" : "Google"}</span>
        </button>
      </div>
    </div>
  );
}

export default SignupOption;
